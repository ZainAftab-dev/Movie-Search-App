"use client"

import { useState, useEffect, useCallback } from "react"
import type { Movie } from "@/lib/tmdb"

const WATCHLIST_KEY = "tmdb-watchlist"

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY)
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored))
      } catch {
        setWatchlist([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist))
    }
  }, [watchlist, isLoaded])

  const addToWatchlist = useCallback((movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }, [])

  const removeFromWatchlist = useCallback((id: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const isInWatchlist = useCallback((id: number) => watchlist.some((m) => m.id === id), [watchlist])

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    isLoaded,
  }
}
