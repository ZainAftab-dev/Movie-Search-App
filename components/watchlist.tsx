"use client"

import { Bookmark, Trash2, Calendar, Star } from "lucide-react"
import Image from "next/image"
import { type Movie, getImageUrl, movieGenres, tvGenres } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WatchlistProps {
  watchlist: Movie[]
  onRemove: (id: number) => void
}

export function Watchlist({ watchlist, onRemove }: WatchlistProps) {
  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Bookmark className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 text-xl font-semibold">Your watchlist is empty</h2>
        <p className="text-muted-foreground">Start adding movies and TV shows to your watchlist!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Watchlist</h2>
        <Badge variant="secondary" className="text-sm">
          {watchlist.length} {watchlist.length === 1 ? "item" : "items"}
        </Badge>
      </div>
      <div className="grid gap-4">
        {watchlist.map((movie) => {
          const title = movie.title || movie.name || "Unknown"
          const releaseDate = movie.release_date || movie.first_air_date
          const posterUrl = getImageUrl(movie.poster_path, "w200")
          const isTV = movie.media_type === "tv"
          const genres = isTV ? tvGenres : movieGenres
          const rating = movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"

          return (
            <Card key={movie.id} className="overflow-hidden">
              <CardContent className="flex gap-4 p-4">
                <div className="relative h-32 w-20 shrink-0 overflow-hidden rounded-md">
                  {posterUrl ? (
                    <Image
                      src={posterUrl || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold">{title}</h3>
                      <Badge variant="outline" className="shrink-0">
                        {isTV ? "TV" : "Movie"}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {releaseDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(releaseDate).getFullYear()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {rating}
                      </span>
                    </div>
                    {movie.genre_ids && movie.genre_ids.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {movie.genre_ids.slice(0, 3).map((id) => (
                          <Badge key={id} variant="secondary" className="text-xs">
                            {genres[id] || "Unknown"}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="destructive" size="sm" className="mt-2 w-fit" onClick={() => onRemove(movie.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
