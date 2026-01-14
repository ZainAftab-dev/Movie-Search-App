"use client"

import Image from "next/image"
import { Star, Plus, Check, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Movie, getImageUrl, movieGenres, tvGenres } from "@/lib/tmdb"

interface MovieCardProps {
  movie: Movie
  isInWatchlist: boolean
  onAddToWatchlist: () => void
  onRemoveFromWatchlist: () => void
  mediaType: "movie" | "tv"
}

export function MovieCard({
  movie,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  mediaType,
}: MovieCardProps) {
  const title = movie.title || movie.name || "Unknown Title"
  const releaseDate = movie.release_date || movie.first_air_date
  const posterUrl = getImageUrl(movie.poster_path, "w500")
  const genres = mediaType === "movie" ? movieGenres : tvGenres

  const rating = movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {posterUrl ? (
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-4">
            <p className="line-clamp-4 text-sm text-foreground">{movie.overview || "No overview available."}</p>
          </div>
        </div>
        {/* Rating Badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-sm font-semibold backdrop-blur">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-semibold text-foreground">{title}</h3>
        {releaseDate && (
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(releaseDate).getFullYear()}
          </div>
        )}
        {/* Genres */}
        {movie.genre_ids && movie.genre_ids.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genre_ids.slice(0, 2).map((id) => (
              <Badge key={id} variant="secondary" className="text-xs">
                {genres[id] || "Unknown"}
              </Badge>
            ))}
          </div>
        )}
        {/* Watchlist Button */}
        <Button
          variant={isInWatchlist ? "secondary" : "default"}
          size="sm"
          className="mt-3 w-full"
          onClick={isInWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
        >
          {isInWatchlist ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              In Watchlist
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add to Watchlist
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
