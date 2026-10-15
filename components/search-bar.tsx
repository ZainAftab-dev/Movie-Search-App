"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string, type: "movie" | "tv") => void
  onClear: () => void
  mediaType: "movie" | "tv"
  setMediaType: (type: "movie" | "tv") => void
}

export function SearchBar({ onSearch, onClear, mediaType, setMediaType }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) onSearch(query.trim(), mediaType)
    },
    [query, mediaType, onSearch],
  )

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <form onSubmit={handleSubmit} role="search" className="relative flex flex-1 items-center">
        <Search className="pointer-events-none absolute left-5 h-5 w-5 text-dust" aria-hidden="true" />
        <label htmlFor="search" className="sr-only">
          Search {mediaType === "movie" ? "movies" : "TV shows"}
        </label>
        <input
          id="search"
          type="search"
          placeholder={mediaType === "movie" ? "Search films" : "Search TV shows"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 w-full rounded-full border border-white/10 bg-curtain pl-14 pr-36 text-base text-cream placeholder:text-dust/80 focus:border-bulb/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              onClear()
            }}
            className="absolute right-28 grid h-9 w-9 place-items-center rounded-full text-dust hover:bg-curtain-2 hover:text-cream"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 h-10 rounded-full bg-bulb px-5 text-sm font-bold text-night transition-opacity disabled:opacity-40"
        >
          Search
        </button>
      </form>

      <div role="radiogroup" aria-label="Search in" className="flex shrink-0 rounded-full bg-curtain p-1">
        {(["movie", "tv"] as const).map((t) => {
          const active = mediaType === t
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMediaType(t)}
              className={`h-12 flex-1 rounded-full px-6 text-sm font-semibold transition-colors md:flex-none ${
                active ? "bg-cream text-night" : "text-dust hover:text-cream"
              }`}
            >
              {t === "movie" ? "Movies" : "TV shows"}
            </button>
          )
        })}
      </div>
    </div>
  )
}
