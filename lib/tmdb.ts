const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export const TMDB_API_KEY = "bbbff83ca435863dba4d87e4e26edc5e"

export interface Movie {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  genre_ids: number[]
  media_type?: string
}

export interface SearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export const movieGenres: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

export const tvGenres: Record<number, string> = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
}

export function getImageUrl(path: string | null, size: "w200" | "w300" | "w500" | "original" = "w500") {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export async function searchMovies(query: string, page = 1): Promise<SearchResponse> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  )
  return response.json()
}

export async function searchTVShows(query: string, page = 1): Promise<SearchResponse> {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  )
  return response.json()
}

export async function getTrendingMovies(): Promise<SearchResponse> {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
  return response.json()
}

export async function getTrendingTVShows(): Promise<SearchResponse> {
  const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`)
  return response.json()
}
