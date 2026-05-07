/**
 * Client-side helpers for resolving Apple device identifiers via the
 * /api/lookup route.
 */

export interface DeviceRecord {
  identifier: string
  device: string
  family: string
  model: string | null
  emc: string | null
  signedIOS: string | null
  everyMacUrl: string
  firmwareUrl: string
  fmiUrl: string
}

export const EXAMPLE_IDENTIFIERS = [
  "iPhone9,2",
  "iPad16,10",
  "Watch6,9",
  "AppleTV5,3",
] as const

export const FMI_CHECKER_URL = "https://iunlocker.com/check_icloud.php"

export async function lookupDevice(
  input: string,
  signal?: AbortSignal,
): Promise<DeviceRecord> {
  const trimmed = input.trim()
  if (!trimmed) {
    throw new Error("Enter an identifier such as iPhone9,2.")
  }

  let res: Response
  try {
    res = await fetch(`/api/lookup?id=${encodeURIComponent(trimmed)}`, {
      method: "GET",
      cache: "no-store",
      signal,
      headers: { Accept: "application/json" },
    })
  } catch (err) {
    if ((err as Error)?.name === "AbortError") throw err
    throw new Error("Network error. Check your connection and try again.")
  }

  let data: unknown
  try {
    data = await res.json()
  } catch {
    throw new Error(`Lookup failed (${res.status}).`)
  }

  if (!res.ok) {
    const message =
      (data as { error?: string })?.error ?? `Lookup failed (${res.status}).`
    throw new Error(message)
  }

  return data as DeviceRecord
}

/**
 * Build a short display label for a remote URL (used in the result panel).
 */
export function shortHostPath(url: string, maxLen = 28): string {
  try {
    const u = new URL(url)
    const path = u.pathname.replace(/\/$/, "")
    const label = `${u.host}${path}`
    return label.length > maxLen ? `${label.slice(0, maxLen - 1)}…` : label
  } catch {
    return url
  }
}
