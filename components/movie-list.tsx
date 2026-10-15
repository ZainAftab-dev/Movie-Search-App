"use client"

import { SearchX } from "lucide-react"
import { MovieCard } from "./movie-card"
import type { Movie } from "@/lib/tmdb"

interface MovieListProps {
  movies: Movie[]
  isLoading: boolean
  ranked?: boolean
  emptyMessage?: string
  isInWatchlist: (id: number) => boolean
  onAddToWatchlist: (movie: Movie) => void
  onRemoveFromWatchlist: (id: number) => void
  mediaType: "movie" | "tv"
}

const GRID = "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"

export function MovieList({
  movies,
  isLoading,
  ranked,
  emptyMessage,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  mediaType,
}: MovieListProps) {
  if (isLoading) {
    return (
      <div className={GRID} aria-busy="true" aria-label="Loading titles">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[2/3] animate-pulse rounded-xl bg-curtain" />
            <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-curtain" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-curtain" />
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <SearchX className="h-10 w-10 text-dust" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-cream">Nothing showing under that name</p>
        <p className="mt-1 text-sm text-dust">{emptyMessage ?? "Check the spelling, or try the other tab."}</p>
      </div>
    )
  }

  return (
    <div className={GRID}>
      {movies.map((movie, i) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          rank={ranked ? i + 1 : undefined}
          isInWatchlist={isInWatchlist(movie.id)}
          onAddToWatchlist={() => onAddToWatchlist({ ...movie, media_type: mediaType })}
          onRemoveFromWatchlist={() => onRemoveFromWatchlist(movie.id)}
          mediaType={mediaType}
        />
      ))}
    </div>
  )
}
