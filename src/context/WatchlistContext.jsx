import { createContext, useContext, useState, useCallback } from 'react'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ghibli-favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const addToFavorites = useCallback((film) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === film.id)) return prev
      const updated = [...prev, film]
      localStorage.setItem('ghibli-favorites', JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id)
      localStorage.setItem('ghibli-favorites', JSON.stringify(updated))
      return updated
    })
  }, [])

  const isInFavorites = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  )

  const value = { favorites, addToFavorites, removeFromFavorites, isInFavorites }

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) throw new Error('useWatchlist debe usarse dentro de WatchlistProvider')
  return context
}