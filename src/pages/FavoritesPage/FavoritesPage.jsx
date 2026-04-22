import { useWatchlist } from '../../context/WatchlistContext'
import { Link } from 'react-router-dom'
import styles from './FavoritesPage.module.css'

function FavoritesPage() {
  const { favorites, removeFromFavorites } = useWatchlist()

  if (favorites.length === 0) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Favoritos</h1>
        <p className={styles.empty}>No tienes películas guardadas.</p>
        <Link to="/search" className={styles.link}>Buscar películas</Link>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Favoritos</h1>
      <div className={styles.grid}>
        {favorites.map((film) => (
          <div key={film.id} className={styles.card}>
            <Link to={`/film/${film.id}`}>
              <img src={film.image} alt={film.title} className={styles.image} />
              <div className={styles.info}>
                <h3 className={styles.name}>{film.title}</h3>
                <span className={styles.year}>{film.release_date} · {film.running_time} min</span>
              </div>
            </Link>
            <button
              className={styles.btnRemove}
              onClick={() => removeFromFavorites(film.id)}
            >
              Quitar de favoritos
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default FavoritesPage