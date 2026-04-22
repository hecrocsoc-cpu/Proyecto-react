import { useState, useMemo } from 'react'
import { useFilms } from '../../context/FilmsContext'
import MovieCard from '../../components/MovieCard/MovieCard'
import styles from './HomePage.module.css'

function HomePage() {
  const { films: results, loading, error } = useFilms()
  const [filter, setFilter] = useState('')
  const [year, setYear] = useState('')
  const [duration, setDuration] = useState('')
  const [score, setScore] = useState('')

  const years = useMemo(() => {
    return [...new Set(results.map((f) => f.release_date))].sort()
  }, [results])

  const filteredFilms = useMemo(() => {
    return results.filter((film) => {
      const matchTitle = film.title.toLowerCase().includes(filter.toLowerCase())
      const matchYear = year ? film.release_date === year : true
      const matchDuration = duration ? parseInt(film.running_time) <= parseInt(duration) : true
      const matchScore = score ? parseInt(film.rt_score) >= parseInt(score) : true
      return matchTitle && matchYear && matchDuration && matchScore
    })
  }, [results, filter, year, duration, score])

  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Studio Ghibli</h1>
        <p className={styles.subtitle}>Explora todas las películas del estudio</p>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
          style={{ flex: 2 }}
        />
        <select value={year} onChange={(e) => setYear(e.target.value)} className={styles.select}>
          <option value="">Todos los años</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={duration} onChange={(e) => setDuration(e.target.value)} className={styles.select}>
          <option value="">Duración</option>
          <option value="80">Menos de 80 min</option>
          <option value="100">Menos de 100 min</option>
          <option value="120">Menos de 120 min</option>
          <option value="999">Todas</option>
        </select>
        <select value={score} onChange={(e) => setScore(e.target.value)} className={styles.select}>
          <option value="">Puntuación</option>
          <option value="90">90+</option>
          <option value="80">80+</option>
          <option value="70">70+</option>
          <option value="0">Todas</option>
        </select>
      </div>

      {loading && <p className={styles.message}>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {filteredFilms.map((film) => (
          <MovieCard key={film.id} film={film} />
        ))}
      </div>
    </main>
  )
}

export default HomePage