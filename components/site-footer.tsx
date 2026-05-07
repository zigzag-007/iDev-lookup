import Link from "next/link"
import { Github, Link as LinkIcon, Smartphone, Twitter } from "lucide-react"

const NAVIGATION = [
  { href: "#home", label: "Home" },
  { href: "#everymac", label: "EveryMac" },
  { href: "#firmware", label: "Firmware" },
  { href: "#fmi", label: "FMI Checker" },
  { href: "#about", label: "About" },
] as const

const RESOURCES = [
  { href: "https://ipsw.me", label: "IPSW.me" },
  { href: "https://everymac.com", label: "EveryMac.com" },
  { href: "https://www.icloud.com/find", label: "FMI Checker" },
  { href: "https://support.apple.com", label: "Apple Support" },
] as const

const SOCIAL = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <Github className="size-5" aria-hidden="true" />,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <Twitter className="size-5" aria-hidden="true" />,
  },
  {
    href: "#",
    label: "Website",
    icon: <LinkIcon className="size-5" aria-hidden="true" />,
  },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="#home"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span
                className="flex size-8 items-center justify-center rounded-md border border-border bg-card"
                aria-hidden="true"
              >
                <Smartphone className="size-4" />
              </span>
              <span className="text-base">iDevice Model Identifier</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed text-pretty">
              Tools to identify iOS devices and access firmware resources
              quickly and easily.
            </p>
          </div>

          <FooterColumn title="Navigation" links={NAVIGATION} />
          <FooterColumn title="Resources" links={RESOURCES} external />

          <div>
            <h2 className="text-sm font-semibold text-foreground">About</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-pretty">
              iDevice Model Identifier is a free tool for iOS enthusiasts and
              developers to quickly lookup device information and access useful
              resources.
            </p>
            <div className="mt-5">
              <p className="text-xs text-muted-foreground">
                Coded by{" "}
                <span className="font-medium text-foreground">Zig Zag</span>
              </p>
              <ul className="mt-3 flex items-center gap-3">
                {SOCIAL.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} iDevice Model Identifier. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  links: readonly { href: string; label: string }[]
  external?: boolean
}

function FooterColumn({ title, links, external }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul role="list" className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-sm text-primary transition-colors hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
