"use client"

import type { ReactNode } from "react"
import { Clapperboard, Bookmark, Sparkles } from "lucide-react"

interface HeaderProps {
  activeTab: "search" | "watchlist"
  setActiveTab: (tab: "search" | "watchlist") => void
  watchlistCount: number
}

export function Header({ activeTab, setActiveTab, watchlistCount }: HeaderProps) {
  const tab = (id: "search" | "watchlist", label: string, icon: ReactNode, count?: number) => {
    const active = activeTab === id
    return (
      <button
        type="button"
        onClick={() => setActiveTab(id)}
        aria-current={active ? "page" : undefined}
        className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
          active ? "bg-bulb text-night" : "text-dust hover:bg-curtain-2 hover:text-cream"
        }`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
        {count !== undefined && count > 0 && (
          <span
            className={`rounded-full px-1.5 text-xs tabular-nums ${active ? "bg-night/15" : "bg-curtain-2 text-cream"}`}
            aria-label={`${count} saved`}
          >
            {count}
          </span>
        )}
      </button>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => setActiveTab("search")} className="flex items-center gap-2.5">
          <Clapperboard className="h-7 w-7 text-bulb" aria-hidden="true" />
          <span className="marquee-glow font-marquee text-3xl font-extrabold uppercase tracking-wide text-bulb">
            MovieFinder
          </span>
        </button>
        <nav aria-label="Main" className="flex items-center gap-1 rounded-full bg-curtain p-1">
          {tab("search", "Discover", <Sparkles className="h-4 w-4" aria-hidden="true" />)}
          {tab("watchlist", "Watchlist", <Bookmark className="h-4 w-4" aria-hidden="true" />, watchlistCount)}
        </nav>
      </div>
    </header>
  )
}
