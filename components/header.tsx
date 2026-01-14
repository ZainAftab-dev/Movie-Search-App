"use client"

import { Film, Bookmark, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  activeTab: "search" | "watchlist"
  setActiveTab: (tab: "search" | "watchlist") => void
  watchlistCount: number
}

export function Header({ activeTab, setActiveTab, watchlistCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">MovieFinder</h1>
        </div>
        <nav className="flex items-center gap-2">
          <Button
            variant={activeTab === "search" ? "default" : "ghost"}
            onClick={() => setActiveTab("search")}
            className="gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Discover</span>
          </Button>
          <Button
            variant={activeTab === "watchlist" ? "default" : "ghost"}
            onClick={() => setActiveTab("watchlist")}
            className="gap-2"
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {watchlistCount}
              </span>
            )}
          </Button>
        </nav>
      </div>
    </header>
  )
}
