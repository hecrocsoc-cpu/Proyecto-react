import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FilmsProvider, useFilms } from '../../context/FilmsContext';
import { mockFilm, mockFilm2 } from '../helpers.jsx';

const mockFilms = [mockFilm, mockFilm2];

function TestConsumer() {
  const { films, loading, error } = useFilms();
  if (loading) return <span data-testid="loading">Cargando...</span>;
  if (error) return <span data-testid="error">{error}</span>;
  return (
    <div>
      <span data-testid="count">{films.length}</span>
      {films.map((f) => (
        <span key={f.id} data-testid={`film-${f.id}`}>{f.title}</span>
      ))}
    </div>
  );
}

function renderWithProvider() {
  return render(
    <FilmsProvider>
      <TestConsumer />
    </FilmsProvider>
  );
}

describe('FilmsContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('muestra loading al inicio', () => {
    global.fetch = vi.fn(() => new Promise(() => {}));
    renderWithProvider();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('carga y muestra las películas correctamente', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFilms),
      })
    );
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('2');
    });
    expect(screen.getByTestId(`film-${mockFilm.id}`)).toHaveTextContent('Mi vecino Totoro');
  });

  it('muestra error si la API falla', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('useFilms lanza error fuera del Provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function SinProvider() { useFilms(); return null; }
    expect(() => render(<SinProvider />)).toThrow();
    spy.mockRestore();
  });
});