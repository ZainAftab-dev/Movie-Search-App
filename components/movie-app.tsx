"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { MovieList } from "@/components/movie-list"
import { Watchlist } from "@/components/watchlist"
import { Pagination } from "@/components/pagination"
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
  const [sectionTitle, setSectionTitle] = useState("Trending Movies This Week")

  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  useEffect(() => {
    async function loadTrending() {
      setIsLoading(true)
      try {
        const data = await getTrendingMovies()
        setMovies(data.results.slice(0, 10))
        setTotalPages(1)
      } catch (err) {
        console.error("Failed to load trending:", err)
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }
    loadTrending()
  }, [])

  async function handleMediaTypeChange(type: "movie" | "tv") {
    setMediaType(type)
    setCurrentPage(1)

    if (searchQuery) {
      handleSearch(searchQuery, type, 1)
    } else {
      try {
        setIsLoading(true)
        const data = type === "movie" ? await getTrendingMovies() : await getTrendingTVShows()
        setMovies(data.results.slice(0, 10))
        setTotalPages(1)
        setSectionTitle(`Trending ${type === "movie" ? "Movies" : "TV Shows"} This Week`)
      } catch (err) {
        console.error("Failed to load trending:", err)
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }
  }

  async function handleSearch(query: string, type: "movie" | "tv", page = 1) {
    try {
      setIsLoading(true)
      setSearchQuery(query)
      const data = type === "movie" ? await searchMovies(query, page) : await searchTVShows(query, page)
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 500))
      setCurrentPage(page)
      setSectionTitle(`Search Results for "${query}"`)
    } catch (err) {
      console.error("Search failed:", err)
      setMovies([])
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

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} watchlistCount={watchlist.length} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === "search" ? (
          <div className="space-y-8">
            <SearchBar
              onSearch={(query, type) => handleSearch(query, type, 1)}
              mediaType={mediaType}
              setMediaType={handleMediaTypeChange}
            />
            <div>
              <h2 className="mb-6 text-2xl font-bold">{sectionTitle}</h2>
              <MovieList
                movies={movies}
                isLoading={isLoading}
                isInWatchlist={isInWatchlist}
                onAddToWatchlist={addToWatchlist}
                onRemoveFromWatchlist={removeFromWatchlist}
                mediaType={mediaType}
              />
              {searchQuery && totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </div>
          </div>
        ) : (
          <Watchlist watchlist={watchlist} onRemove={removeFromWatchlist} />
        )}
      </main>
    </div>
  )
}
