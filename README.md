# Movie Search App

A modern movie and TV show search application built with Next.js, React, and the TMDB API.

**Author:** Zain Aftab

## Features

- **Search Movies & TV Shows** - Toggle between searching movies or TV shows with real-time results
- **Trending Content** - View top 10 trending movies or TV shows on the homepage
- **Detailed Cards** - Each card displays poster, title, release year, rating, genres, and overview on hover
- **Watchlist** - Add and remove items from your personal watchlist (persisted in localStorage)
- **Pagination** - Navigate through large search results with ease
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **API:** The Movie Database (TMDB)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A TMDB API key (get one free at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-search-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your TMDB API key in `lib/tmdb.ts`:
   ```typescript
   const API_KEY = "your_api_key_here"
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page with Suspense wrapper
│   ├── layout.tsx        # Root layout
│   ├── loading.tsx       # Loading state
│   └── globals.css       # Global styles
├── components/
│   ├── movie-app.tsx     # Main application component
│   ├── movie-card.tsx    # Individual movie/TV show card
│   ├── movie-list.tsx    # Grid of movie cards
│   ├── search-bar.tsx    # Search input with media type toggle
│   ├── header.tsx        # App header
│   ├── watchlist.tsx     # Watchlist sidebar
│   └── pagination.tsx    # Pagination controls
├── hooks/
│   └── use-watchlist.ts  # Custom hook for watchlist management
├── lib/
│   └── tmdb.ts           # TMDB API functions and types
```

## API Reference

The app uses the following TMDB API endpoints:

- `/search/movie` - Search for movies
- `/search/tv` - Search for TV shows
- `/trending/movie/week` - Get trending movies
- `/trending/tv/week` - Get trending TV shows

## License

This project is open source and available under the MIT License.
