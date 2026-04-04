'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

type Suggestion = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
}

export default function HeaderSearch() {
  const router = useRouter()
  const { countryCode } = useParams<{ countryCode: string }>()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setSuggestions(data.products || [])
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setOpen(false)
    router.push(`/${countryCode}/results/${encodeURIComponent(trimmed)}`)
  }

  const onSelectSuggestion = (handle: string) => {
    setOpen(false)
    setQuery('')
    router.push(`/${countryCode}/products/${handle}`)
  }

  return (
    <div ref={containerRef} className="hidden small:flex items-center w-full max-w-xs relative">
      <form onSubmit={onSubmit} className="w-full">
        <div className="relative w-full">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Search products..."
            className="w-full h-8 rounded-full border border-ui-border-base px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            aria-label="Search products"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-full bg-black text-white"
          >
            Go
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 left-0 w-full bg-white border border-ui-border-base rounded-lg shadow-lg z-50 overflow-hidden">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelectSuggestion(s.handle)}
                className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
              >
                {s.thumbnail ? (
                  <Image
                    src={s.thumbnail}
                    alt={s.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-100 rounded flex-shrink-0" />
                )}
                <span className="truncate">{s.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {loading && query.trim().length >= 2 && !open && (
        <div className="absolute top-full mt-1 left-0 w-full bg-white border border-ui-border-base rounded-lg shadow-lg z-50 px-3 py-2 text-sm text-gray-400">
          Searching...
        </div>
      )}
    </div>
  )
}
