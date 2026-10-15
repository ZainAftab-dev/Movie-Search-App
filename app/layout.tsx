import type React from "react"
import type { Metadata } from "next"
import "@fontsource-variable/big-shoulders-display"
import "@fontsource-variable/instrument-sans"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"


export const metadata: Metadata = {
  title: "MovieFinder - Search Movies & TV Shows",
  description: "Search and discover movies and TV shows using TMDB. Create your personal watchlist.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-night font-sans text-cream antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
