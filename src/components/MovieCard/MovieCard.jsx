import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { useWatchlist } from "../../context/WatchlistContext";

function MovieCard({ film }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addToFavorites, removeFromFavorites, isInFavorites } = useWatchlist();
  const saved = isInFavorites(film.id);
  const isMobile = window.innerWidth <= 1024;

  return (
    <>
      {flipped && isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0,0,0,0.4)'
          }}
          onClick={() => setFlipped(false)}
        />
      )}
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ""} ${hovered ? styles.hovered : ""}`}
        style={{ position: 'relative', zIndex: flipped && isMobile ? 51 : 'auto' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setFlipped(false);
        }}
        onClick={() => setFlipped(!flipped)}
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
            <p className={styles.meta}>
              <strong>Director:</strong> {film.director}
            </p>
            <p className={styles.meta}>
              <strong>Producer:</strong> {film.producer}
            </p>
            <p className={styles.desc}>{film.description?.slice(0, 120)}...</p>
            <div className={styles.actions}>
              <Link
                to={`/film/${film.id}`}
                className={styles.btn}
                onClick={(e) => e.stopPropagation()}
              >
                Ver más
              </Link>
              <button
                className={saved ? styles.btnRemove : styles.btnAdd}
                onClick={(e) => {
                  e.stopPropagation();
                  saved ? removeFromFavorites(film.id) : addToFavorites(film);
                }}
              >
                {saved ? '♥ Quitar' : '♡ Favorito'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;