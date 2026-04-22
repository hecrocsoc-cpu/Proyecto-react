import { createContext, useContext, useEffect, useState } from "react";

const FilmsContext = createContext();

export function FilmsProvider({ children }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los films");
        return res.json();
      })
      .then((data) => setFilms(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FilmsContext.Provider value={{ films, loading, error }}>
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilms() {
  const context = useContext(FilmsContext);
  if (!context) throw new Error('useFilms debe usarse dentro de FilmsProvider');
  return context;
}