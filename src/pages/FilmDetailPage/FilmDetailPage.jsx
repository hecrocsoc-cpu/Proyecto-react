import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../../context/WatchlistContext'
import styles from './FilmDetailPage.module.css'

function FilmDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToFavorites, removeFromFavorites, isInFavorites } = useWatchlist()
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Película no encontrada')
        return res.json()
      })
      .then((data) => setFilm(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className={styles.message}>Cargando...</p>
  if (error) return <p className={styles.error}>{error}</p>

  const saved = isInFavorites(film.id)

  return (
    <main className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.back}>← Volver</button>
      <div className={styles.card}>
        <img src={film.image} alt={film.title} className={styles.image} />
        <div className={styles.info}>
          <h1 className={styles.name}>{film.title}</h1>
          <p><span>Título original:</span> {film.original_title}</p>
          <p><span>Director:</span> {film.director}</p>
          <p><span>Productor:</span> {film.producer}</p>
          <p><span>Año:</span> {film.release_date}</p>
          <p><span>Duración:</span> {film.running_time} min</p>
          <p><span>Puntuación:</span> {film.rt_score} / 100</p>
          <p className={styles.description}>{film.description}</p>
          <button
            className={saved ? styles.btnRemove : styles.btnAdd}
            onClick={() => saved ? removeFromFavorites(film.id) : addToFavorites(film)}
          >
            {saved ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default FilmDetailPage