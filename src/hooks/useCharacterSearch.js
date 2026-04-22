import { useState, useCallback } from 'react'

const BASE_URL = 'https://ghibliapi.vercel.app/films'

export function useGhibliSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (query = '') => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(BASE_URL)
      if (!res.ok) throw new Error('Error al cargar las películas')
      const data = await res.json()
      const filtered = query
        ? data.filter((film) =>
            film.title.toLowerCase().includes(query.toLowerCase())
          )
        : data
      if (filtered.length === 0) throw new Error('No se encontraron películas')
      setResults(filtered)
    } catch (err) {
      setError(err.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, search }
}