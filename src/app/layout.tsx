import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SautiDuka",
  description:
    "AI-powered voice bookkeeping for small businesses, available through the web and WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
