"use client"

import { Bookmark, Star, X } from "lucide-react"
import Image from "next/image"
import { type Movie, getImageUrl, movieGenres, tvGenres } from "@/lib/tmdb"

interface WatchlistProps {
  watchlist: Movie[]
  onRemove: (id: number) => void
  onBrowse: () => void
}

export function Watchlist({ watchlist, onRemove, onBrowse }: WatchlistProps) {
  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <Bookmark className="h-12 w-12 text-dust" aria-hidden="true" />
        <h2 className="mt-5 font-marquee text-4xl font-extrabold uppercase text-cream">No tickets yet</h2>
        <p className="mt-2 max-w-sm text-dust">Tap the bookmark on any poster to save it here for movie night.</p>
        <button
          type="button"
          onClick={onBrowse}
          className="mt-6 h-11 rounded-full bg-bulb px-6 text-sm font-bold text-night"
        >
          Browse trending titles
        </button>
      </div>
    )
  }

  return (
    <section aria-labelledby="watchlist-title">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 id="watchlist-title" className="font-marquee text-5xl font-extrabold uppercase text-cream">
          Your watchlist
        </h2>
        <span className="text-sm font-semibold text-dust">
          {watchlist.length} {watchlist.length === 1 ? "title" : "titles"}
        </span>
      </div>
      <ul className="grid gap-4 lg:grid-cols-2">
        {watchlist.map((movie) => {
          const title = movie.title || movie.name || "Untitled"
          const releaseDate = movie.release_date || movie.first_air_date
          const posterUrl = getImageUrl(movie.poster_path, "w200")
          const isTV = movie.media_type === "tv"
          const genres = isTV ? tvGenres : movieGenres
          const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null

          return (
            <li key={movie.id} className="ticket flex gap-4 rounded-2xl bg-curtain p-3 pr-5">
              <div className="relative h-32 w-[5.5rem] shrink-0 overflow-hidden rounded-lg bg-curtain-2">
                {posterUrl && <Image src={posterUrl} alt="" fill className="object-cover" sizes="88px" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-dashed border-white/15 pl-4">
                <p className="text-xs font-bold uppercase tracking-wider text-bulb">{isTV ? "TV show" : "Film"}</p>
                <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-cream">{title}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-dust">
                  {releaseDate && <span>{new Date(releaseDate).getFullYear()}</span>}
                  {rating && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-bulb text-bulb" aria-hidden="true" />
                      {rating}
                    </span>
                  )}
                  {movie.genre_ids?.slice(0, 2).map((id) => genres[id] && <span key={id}>{genres[id]}</span>)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(movie.id)}
                aria-label={`Remove ${title}`}
                className="grid h-10 w-10 shrink-0 place-items-center self-center rounded-full text-dust hover:bg-ruby/15 hover:text-ruby"
              >
                <X className="h-5 w-5" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
