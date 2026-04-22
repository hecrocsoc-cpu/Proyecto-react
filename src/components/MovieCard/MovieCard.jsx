import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

function MovieCard({ film }) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ''} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setFlipped(false)
      }}
      onClick={() => setFlipped(true)}
    >
      <div className={styles.inner}>

        <div className={styles.front}>
          <img src={film.image} alt={film.title} className={styles.image} />

          <div className={styles.info}>
            <h3 className={styles.name}>{film.title}</h3>
            <span className={styles.year}>
              {film.release_date} · {film.running_time} min
            </span>
          </div>
        </div>

        <div className={styles.back}>
          <h3 className={styles.title}>{film.title}</h3>

          <p className={styles.meta}><strong>Director:</strong> {film.director}</p>
          <p className={styles.meta}><strong>Producer:</strong> {film.producer}</p>

          <p className={styles.desc}>
            {film.description?.slice(0, 120)}...
          </p>

          <Link
            to={`/film/${film.id}`}
            className={styles.btn}
            onClick={(e) => e.stopPropagation()}
          >
            Ver más
          </Link>
        </div>

      </div>
    </div>
  )
}

export default MovieCard