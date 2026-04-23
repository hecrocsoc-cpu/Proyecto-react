import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../../context/WatchlistContext'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { favorites } = useWatchlist()
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Studio Ghibli</Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
        <li><Link to="/search" onClick={() => setMenuOpen(false)}>Buscar</Link></li>
        <li>
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>
            Favoritos
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
        </li>
      </ul>

      <div className={styles.right}>
        <label className={styles.switch}>
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <span className={styles.slider}>
            <span className={styles.icon}>☀️</span>
            <span className={`${styles.icon} ${styles.iconDark}`}>🌙</span>
          </span>
        </label>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar