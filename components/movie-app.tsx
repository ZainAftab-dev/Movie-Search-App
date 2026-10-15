"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { MovieList } from "@/components/movie-list"
import { Watchlist } from "@/components/watchlist"
import { Pagination } from "@/components/pagination"
import { Featured } from "@/components/featured"
import { WifiOff } from "lucide-react"
import { useWatchlist } from "@/hooks/use-watchlist"
import { searchMovies, searchTVShows, getTrendingMovies, getTrendingTVShows, type Movie } from "@/lib/tmdb"

export function MovieApp() {
  const [activeTab, setActiveTab] = useState<"search" | "watchlist">("search")
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie")
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sectionTitle, setSectionTitle] = useState("Trending films this week")
  const [error, setError] = useState(false)

  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  async function loadTrending(type: "movie" | "tv") {
    setIsLoading(true)
    setError(false)
    setSearchQuery("")
    try {
      const data = type === "movie" ? await getTrendingMovies() : await getTrendingTVShows()
      setMovies(data.results.slice(0, 10))
      setTotalPages(1)
      setSectionTitle(`Trending ${type === "movie" ? "films" : "TV shows"} this week`)
    } catch (err) {
      console.error("Failed to load trending:", err)
      setMovies([])
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTrending("movie")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleMediaTypeChange(type: "movie" | "tv") {
    setMediaType(type)
    setCurrentPage(1)
    if (searchQuery) handleSearch(searchQuery, type, 1)
    else loadTrending(type)
  }

  async function handleSearch(query: string, type: "movie" | "tv", page = 1) {
    try {
      setIsLoading(true)
      setError(false)
      setSearchQuery(query)
      const data = type === "movie" ? await searchMovies(query, page) : await searchTVShows(query, page)
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 500))
      setCurrentPage(page)
      setSectionTitle(`Results for “${query}”`)
    } catch (err) {
      console.error("Search failed:", err)
      setMovies([])
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  function handlePageChange(page: number) {
    if (searchQuery) {
      handleSearch(searchQuery, mediaType, page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const isTrending = !searchQuery
  const featured = isTrending && !isLoading && !error ? movies[0] : undefined

  return (
    <div className="min-h-dvh bg-night">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} watchlistCount={watchlist.length} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeTab === "search" ? (
          <div className="space-y-10">
            <SearchBar
              onSearch={(query, type) => handleSearch(query, type, 1)}
              onClear={() => loadTrending(mediaType)}
              mediaType={mediaType}
              setMediaType={handleMediaTypeChange}
            />

            {featured && (
              <Featured
                movie={featured}
                mediaType={mediaType}
                isInWatchlist={isInWatchlist(featured.id)}
                onToggle={() =>
                  isInWatchlist(featured.id)
                    ? removeFromWatchlist(featured.id)
                    : addToWatchlist({ ...featured, media_type: mediaType })
                }
              />
            )}

            <section aria-labelledby="results-title">
              <h2
                id="results-title"
                className="mb-6 font-marquee text-4xl font-extrabold uppercase tracking-wide text-cream sm:text-5xl"
              >
                {sectionTitle}
              </h2>
              {error ? (
                <div role="alert" className="flex flex-col items-center rounded-2xl bg-curtain py-14 text-center">
                  <WifiOff className="h-10 w-10 text-dust" aria-hidden="true" />
                  <p className="mt-4 text-lg font-semibold text-cream">Couldn&apos;t reach the movie database</p>
                  <p className="mt-1 text-sm text-dust">Check your internet connection, then try again.</p>
                  <button
                    type="button"
                    onClick={() => (searchQuery ? handleSearch(searchQuery, mediaType, currentPage) : loadTrending(mediaType))}
                    className="mt-5 h-11 rounded-full bg-bulb px-6 text-sm font-bold text-night"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <MovieList
                  movies={movies}
                  isLoading={isLoading}
                  ranked={isTrending}
                  isInWatchlist={isInWatchlist}
                  onAddToWatchlist={addToWatchlist}
                  onRemoveFromWatchlist={removeFromWatchlist}
                  mediaType={mediaType}
                />
              )}
              {searchQuery && !error && totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </section>
          </div>
        ) : (
          <Watchlist watchlist={watchlist} onRemove={removeFromWatchlist} onBrowse={() => setActiveTab("search")} />
        )}
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-xs text-dust sm:px-6">
        Data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  )
}
