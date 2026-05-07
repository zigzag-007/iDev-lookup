import { NextResponse } from "next/server"

/**
 * Server-side iDevice lookup. Mirrors the logic from the original
 * iDeviceModelLookup.ps1 PowerShell script:
 *   1. Scrape everymac.com for Device, Model (A-number), EMC, and Family.
 *   2. Use ipsw.me's JSON API to find the device name + currently signed iOS.
 *   3. Expose canonical URLs for the EveryMac page, firmware page, and
 *      iUnlocker FMI checker.
 *
 * Done server-side because everymac.com / ipsw.me do not expose CORS headers
 * for browser-origin requests.
 */

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

const EVERYMAC_ENDPOINT = "https://everymac.com/ultimate-mac-lookup/?identify="
const IPSW_PAGE = "https://ipsw.me/"
const IPSW_API = "https://api.ipsw.me/v4/device/"
const FMI_CHECKER_URL = "https://iunlocker.com/check_icloud.php"

const FETCH_TIMEOUT_MS = 12_000

function encodeIdentifierForPath(identifier: string): string {
  // Keep commas unescaped because ipsw.me canonical device paths use `iPhone9,2/`.
  return encodeURIComponent(identifier).replace(/%2C/gi, ",")
}

function buildEveryMacUrl(identifier: string): string {
  return `${EVERYMAC_ENDPOINT}${encodeIdentifierForPath(identifier)}`
}

function buildIpswPageUrl(identifier: string): string {
  if (/^Watch\d+,\d+$/i.test(identifier)) {
    return `${IPSW_PAGE}otas/${encodeIdentifierForPath(identifier)}/`
  }
  return `${IPSW_PAGE}${encodeIdentifierForPath(identifier)}/`
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function familyFromIdentifier(id: string): string | null {
  const match = id.match(/^([A-Za-z]+)\d+,\d+$/)
  if (!match) return null
  const prefix = match[1].toLowerCase()
  switch (prefix) {
    case "iphone":
      return "iPhone"
    case "ipad":
      return "iPad"
    case "ipod":
      return "iPod"
    case "watch":
      return "Apple Watch"
    case "appletv":
      return "Apple TV"
    case "audioaccessory":
      return "HomePod"
    case "mac":
    case "macbook":
    case "macbookair":
    case "macbookpro":
    case "macmini":
    case "macpro":
      return "Mac"
    default:
      return null
  }
}

async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/json,*/*",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    })
  } finally {
    clearTimeout(timer)
  }
}

interface EveryMacResult {
  url: string
  device: string | null
  model: string | null
  emc: string | null
  family: string | null
}

async function fetchEveryMac(identifier: string): Promise<EveryMacResult> {
  const url = buildEveryMacUrl(identifier)
  const res = await fetchWithTimeout(url)
  if (!res.ok) {
    throw new Error(`EveryMac returned HTTP ${res.status}.`)
  }
  const html = await res.text()

  const deviceMatch = html.match(
    /<td class="detail_title">\s*<a[^>]*>\s*([^<]+)/i,
  )
  const text = stripHtml(html)
  // EveryMac often appends footnote markers like "*" (e.g. A3258*, EMC 8947*).
  // Parse model/emc defensively and strip marker characters.
  const modelEmcMatch = text.match(
    /Model\s+(A[\w*-]+)\s*\(EMC\s*([^)]+?)\)/i,
  )
  const modelOnlyMatch = text.match(/Model\s+(A[\w*-]+)/i)
  const emcOnlyMatch = text.match(/EMC\s*([0-9*]+)/i)
  const familyRegex = new RegExp(
    `Family\\s+([A-Za-z0-9\\s+\\-]+?)\\s+ID\\s+${escapeRegex(identifier)}`,
    "i",
  )
  const familyMatch = text.match(familyRegex)

  return {
    url,
    device: deviceMatch ? deviceMatch[1].trim() : null,
    model: (modelEmcMatch?.[1] ?? modelOnlyMatch?.[1] ?? null)?.replace(
      /\*+$/g,
      "",
    ),
    emc: (modelEmcMatch?.[2] ?? emcOnlyMatch?.[1] ?? null)?.replace(
      /\*+$/g,
      "",
    ),
    family: familyMatch ? familyMatch[1].trim() : null,
  }
}

interface IpswResult {
  pageUrl: string
  signedIOS: string | null
  signedFirmwareFile: string | null
  signedFirmwareDownloadUrl: string | null
  deviceName: string | null
}

async function fetchIpsw(identifier: string): Promise<IpswResult> {
  const pageUrl = buildIpswPageUrl(identifier)
  const isWatch = /^Watch\d+,\d+$/i.test(identifier)
  try {
    const firmwareType = isWatch ? "ota" : "ipsw"
    const apiUrl = `${IPSW_API}${encodeURIComponent(identifier)}?type=${firmwareType}`
    const res = await fetchWithTimeout(apiUrl)
    if (!res.ok) {
      return {
        pageUrl,
        signedIOS: null,
        signedFirmwareFile: null,
        signedFirmwareDownloadUrl: null,
        deviceName: null,
      }
    }
    const data = (await res.json()) as {
      name?: string
      firmwares?: Array<{
        version?: string
        signed?: boolean
        url?: string
        buildid?: string
      }>
    }
    const signed = (data.firmwares ?? []).find((f) => f.signed)
    const signedFirmwareFile = signed?.url
      ? decodeURIComponent(signed.url.split("/").pop() ?? "")
      : null
    const signedFirmwareDownloadUrl = signed?.buildid
      ? isWatch
        ? `https://ipsw.me/download/ota/${encodeIdentifierForPath(identifier)}/${signed.buildid}/`
        : `https://ipsw.me/download/${encodeIdentifierForPath(identifier)}/${signed.buildid}/`
      : null
    return {
      pageUrl,
      signedIOS: signed?.version ?? null,
      signedFirmwareFile: signedFirmwareFile || null,
      signedFirmwareDownloadUrl,
      deviceName: data?.name ?? null,
    }
  } catch {
    return {
      pageUrl,
      signedIOS: null,
      signedFirmwareFile: null,
      signedFirmwareDownloadUrl: null,
      deviceName: null,
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawId = searchParams.get("id") ?? ""
  const identifier = rawId.trim()

  if (!identifier) {
    return NextResponse.json(
      { error: "Enter an identifier such as iPhone9,2." },
      { status: 400 },
    )
  }

  // Basic shape validation: PrefixN,M
  if (!/^[A-Za-z]+\d+,\d+$/.test(identifier)) {
    return NextResponse.json(
      {
        error: `"${identifier}" doesn't look like a valid Apple identifier (e.g. iPhone16,2).`,
      },
      { status: 400 },
    )
  }

  const [everyMacOutcome, ipswResult] = await Promise.allSettled([
    fetchEveryMac(identifier),
    fetchIpsw(identifier),
  ])

  const everyMac =
    everyMacOutcome.status === "fulfilled" ? everyMacOutcome.value : null
  const ipsw =
    ipswResult.status === "fulfilled"
      ? ipswResult.value
      : {
          pageUrl: buildIpswPageUrl(identifier),
          signedIOS: null,
          signedFirmwareFile: null,
          signedFirmwareDownloadUrl: null,
          deviceName: null,
        }

  const device = everyMac?.device ?? ipsw.deviceName
  const model = everyMac?.model ?? null

  if (!device && !model) {
    return NextResponse.json(
      {
        error: `No device found for "${identifier}". Check the identifier and try again.`,
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    identifier,
    device: device ?? "Unknown device",
    family: everyMac?.family ?? familyFromIdentifier(identifier) ?? "Unknown",
    model,
    emc: everyMac?.emc ?? null,
    signedIOS: ipsw.signedIOS,
    signedFirmwareFile: ipsw.signedFirmwareFile,
    signedFirmwareDownloadUrl: ipsw.signedFirmwareDownloadUrl,
    everyMacUrl:
      everyMac?.url ?? buildEveryMacUrl(identifier),
    firmwareUrl: ipsw.pageUrl,
    fmiUrl: FMI_CHECKER_URL,
  })
}
