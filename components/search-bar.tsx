"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchBarProps {
  onSearch: (query: string, type: "movie" | "tv") => void
  mediaType: "movie" | "tv"
  setMediaType: (type: "movie" | "tv") => void
}

export function SearchBar({ onSearch, mediaType, setMediaType }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        onSearch(query.trim(), mediaType)
      }
    },
    [query, mediaType, onSearch],
  )

  const handleClear = useCallback(() => {
    setQuery("")
  }, [])

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search movies or TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button type="submit" disabled={!query.trim()}>
          Search
        </Button>
      </form>
      <Tabs value={mediaType} onValueChange={(v) => setMediaType(v as "movie" | "tv")} className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="movie">Movies</TabsTrigger>
          <TabsTrigger value="tv">TV Shows</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
