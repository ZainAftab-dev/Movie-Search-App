"use client"

import { MovieCard } from "./movie-card"
import type { Movie } from "@/lib/tmdb"
import { Skeleton } from "@/components/ui/skeleton"

interface MovieListProps {
  movies: Movie[]
  isLoading: boolean
  isInWatchlist: (id: number) => boolean
  onAddToWatchlist: (movie: Movie) => void
  onRemoveFromWatchlist: (id: number) => void
  mediaType: "movie" | "tv"
}

export function MovieList({
  movies,
  isLoading,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  mediaType,
}: MovieListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No results found</p>
        <p className="text-sm text-muted-foreground">Try a different search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={isInWatchlist(movie.id)}
          onAddToWatchlist={() => onAddToWatchlist({ ...movie, media_type: mediaType })}
          onRemoveFromWatchlist={() => onRemoveFromWatchlist(movie.id)}
          mediaType={mediaType}
        />
      ))}
    </div>
  )
}
