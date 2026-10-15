import { Suspense } from "react"
import { MovieApp } from "@/components/movie-app"

function LoadingFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-night">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-bulb border-t-transparent mx-auto mb-4" />
        <p className="text-dust">Loading...</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MovieApp />
    </Suspense>
  )
}
