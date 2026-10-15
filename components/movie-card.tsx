"use client"

import Image from "next/image"
import { Star, Bookmark, BookmarkCheck, Film } from "lucide-react"
import { type Movie, getImageUrl, movieGenres, tvGenres } from "@/lib/tmdb"

interface MovieCardProps {
  movie: Movie
  rank?: number
  isInWatchlist: boolean
  onAddToWatchlist: () => void
  onRemoveFromWatchlist: () => void
  mediaType: "movie" | "tv"
}

export function MovieCard({
  movie,
  rank,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  mediaType,
}: MovieCardProps) {
  const title = movie.title || movie.name || "Untitled"
  const releaseDate = movie.release_date || movie.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null
  const posterUrl = getImageUrl(movie.poster_path, "w500")
  const genres = mediaType === "movie" ? movieGenres : tvGenres
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null

  return (
    <article className="group relative">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-curtain ring-1 ring-white/5">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`${title} poster`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-curtain-2 to-curtain p-4 text-center">
            <Film className="h-8 w-8 text-dust/60" aria-hidden="true" />
            <span className="font-marquee text-2xl font-bold uppercase leading-none text-cream/80">{title}</span>
          </div>
        )}

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-night via-night/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
          <p className="line-clamp-5 text-sm leading-relaxed text-cream/90">{movie.overview || "No overview yet."}</p>
        </div>

        <button
          type="button"
          onClick={isInWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
          aria-pressed={isInWatchlist}
          aria-label={isInWatchlist ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
          className={`absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition-colors ${
            isInWatchlist ? "bg-bulb text-night" : "bg-night/70 text-cream hover:bg-night"
          }`}
        >
          {isInWatchlist ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </button>

        {rank !== undefined && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-2 grid h-10 min-w-10 place-items-center rounded-full bg-night/75 px-2 font-marquee text-2xl font-extrabold leading-none text-bulb backdrop-blur"
          >
            {rank}
          </span>
        )}
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-1 text-[15px] font-semibold text-cream">
          {rank !== undefined && <span className="sr-only">Number {rank}: </span>}
          {title}
        </h3>
        <p className="mt-0.5 flex items-center gap-2 text-sm text-dust">
          {year && <span>{year}</span>}
          {rating && (
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-bulb text-bulb" aria-hidden="true" />
              <span className="font-semibold text-cream">{rating}</span>
              <span className="sr-only">out of 10</span>
            </span>
          )}
          {movie.genre_ids?.[0] && genres[movie.genre_ids[0]] && (
            <span className="truncate">{genres[movie.genre_ids[0]]}</span>
          )}
        </p>
      </div>
    </article>
  )
}
