import { Link } from 'react-router-dom'
import { useWatchlist } from '../../context/WatchlistContext'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { favorites } = useWatchlist()
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Studio Ghibli</Link>
      <ul className={styles.links}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/search">Buscar</Link></li>
        <li>
          <Link to="/favorites">
            Favoritos
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
        </li>
      </ul>
      <label className={styles.switch}>
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className={styles.slider}>
          <span className={styles.icon}>☀️</span>
          <span className={`${styles.icon} ${styles.iconDark}`}>🌙</span>
        </span>
      </label>
    </nav>
  )
}

export default Navbar