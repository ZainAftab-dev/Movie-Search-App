"use client"

import Image from "next/image"
import { Star, Bookmark, BookmarkCheck } from "lucide-react"
import { type Movie, getImageUrl, movieGenres, tvGenres } from "@/lib/tmdb"

interface FeaturedProps {
  movie: Movie
  mediaType: "movie" | "tv"
  isInWatchlist: boolean
  onToggle: () => void
}

export function Featured({ movie, mediaType, isInWatchlist, onToggle }: FeaturedProps) {
  const title = movie.title || movie.name || "Untitled"
  const backdrop = getImageUrl(movie.backdrop_path, "original")
  const releaseDate = movie.release_date || movie.first_air_date
  const genres = mediaType === "movie" ? movieGenres : tvGenres

  return (
    <section
      aria-label="Number one this week"
      className="relative isolate overflow-hidden rounded-3xl bg-curtain ring-1 ring-white/5"
    >
      {backdrop && (
        <Image src={backdrop} alt="" fill priority className="-z-10 object-cover opacity-55" sizes="100vw" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/10" />
      <div className="flex min-h-[340px] max-w-2xl flex-col justify-end p-6 sm:p-10">
        <p className="text-sm font-bold text-bulb">#1 trending {mediaType === "movie" ? "film" : "show"} this week</p>
        <h2 className="mt-2 font-marquee text-5xl font-black uppercase leading-[0.9] text-cream sm:text-7xl">{title}</h2>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dust">
          {movie.vote_average ? (
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-bulb text-bulb" aria-hidden="true" />
              <span className="font-semibold text-cream">{movie.vote_average.toFixed(1)}</span>
            </span>
          ) : null}
          {releaseDate && <span>{new Date(releaseDate).getFullYear()}</span>}
          {movie.genre_ids?.slice(0, 3).map((id) => genres[id] && <span key={id}>{genres[id]}</span>)}
        </p>
        <p className="mt-4 line-clamp-3 max-w-xl leading-relaxed text-cream/85">{movie.overview}</p>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={isInWatchlist}
          className={`mt-6 flex h-12 w-fit items-center gap-2 rounded-full px-6 text-sm font-bold transition-colors ${
            isInWatchlist ? "bg-cream text-night" : "bg-bulb text-night hover:bg-bulb/90"
          }`}
        >
          {isInWatchlist ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          {isInWatchlist ? "On your watchlist" : "Add to watchlist"}
        </button>
      </div>
    </section>
  )
}
