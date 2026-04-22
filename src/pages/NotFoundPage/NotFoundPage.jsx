import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Esta dimensión no existe</p>
      <Link to="/" className={styles.link}>Volver al inicio</Link>
    </main>
  )
}

export default NotFoundPage