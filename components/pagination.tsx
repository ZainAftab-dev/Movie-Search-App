"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  if (endPage - startPage + 1 < maxVisiblePages) startPage = Math.max(1, endPage - maxVisiblePages + 1)
  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) pages.push(i)

  const base = "grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold tabular-nums transition-colors"
  const idle = "text-dust hover:bg-curtain-2 hover:text-cream"

  return (
    <nav aria-label="Pages" className="flex items-center justify-center gap-1 py-10">
      <button
        type="button"
        className={`${base} ${idle} disabled:opacity-30`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {startPage > 1 && (
        <>
          <button type="button" className={`${base} ${idle}`} onClick={() => onPageChange(1)}>
            1
          </button>
          {startPage > 2 && <span className="px-1 text-dust">…</span>}
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          className={`${base} ${page === currentPage ? "bg-bulb text-night" : idle}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 text-dust">…</span>}
          <button type="button" className={`${base} ${idle}`} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}
      <button
        type="button"
        className={`${base} ${idle} disabled:opacity-30`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
