import { useState } from "react";
import { useFilms } from "../../context/FilmsContext";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./SearchPage.module.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const { films, loading, error } = useFilms();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Buscar películas</h1>
      <div className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nombre de la película..."
          className={styles.input}
        />
      </div>
      <div className={styles.grid}>
        {films
          .filter((f) => f.title.toLowerCase().includes(query.toLowerCase()))
          .map((film) => (
            <MovieCard key={film.id} film={film} />
          ))}
      </div>
    </main>
  );
}

export default SearchPage;
