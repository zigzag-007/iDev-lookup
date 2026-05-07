import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "iDev Lookup - Find Apple device identifiers fast",
    template: "%s · iDev Lookup",
  },
  description:
    "Resolve Apple device identifiers like iPhone16,2 and jump to firmware tools, EveryMac, and FMI checker quickly.",
  keywords: [
    "iDevice",
    "Apple",
    "identifier",
    "iPhone",
    "iPad",
    "firmware",
    "IPSW",
    "EveryMac",
    "FMI",
  ],
  authors: [{ name: "Zig Zag" }],
  generator: "v0.app",
  openGraph: {
    title: "iDev Lookup",
    description:
      "Resolve identifiers like iPhone9,2 and jump to firmware tools.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} bg-background`}
    >
      <body suppressHydrationWarning className="font-sans antialiased min-h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
