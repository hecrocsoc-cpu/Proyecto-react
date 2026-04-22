import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WatchlistProvider, useWatchlist } from '../../context/WatchlistContext';
import { mockFilm, mockFilm2 } from '../helpers.jsx';

function TestConsumer() {
  const { favorites, addToFavorites, removeFromFavorites, isInFavorites } = useWatchlist();
  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      {favorites.map((f) => (
        <span key={f.id} data-testid={`film-${f.id}`}>{f.title}</span>
      ))}
      <span data-testid="is-in">{isInFavorites(mockFilm.id) ? 'yes' : 'no'}</span>
      <button onClick={() => addToFavorites(mockFilm)}>Añadir 1</button>
      <button onClick={() => addToFavorites(mockFilm2)}>Añadir 2</button>
      <button onClick={() => removeFromFavorites(mockFilm.id)}>Eliminar 1</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <WatchlistProvider>
      <TestConsumer />
    </WatchlistProvider>
  );
}

describe('WatchlistContext', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('empieza con favoritos vacíos', () => {
    renderWithProvider();
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('addToFavorites añade una película', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Añadir 1'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId(`film-${mockFilm.id}`)).toHaveTextContent('Mi vecino Totoro');
  });

  it('addToFavorites no duplica películas', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Añadir 1'));
    fireEvent.click(screen.getByText('Añadir 1'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('removeFromFavorites elimina una película', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Añadir 1'));
    fireEvent.click(screen.getByText('Añadir 2'));
    fireEvent.click(screen.getByText('Eliminar 1'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.queryByTestId(`film-${mockFilm.id}`)).not.toBeInTheDocument();
  });

  it('isInFavorites devuelve true cuando la película está en favoritos', () => {
    renderWithProvider();
    expect(screen.getByTestId('is-in')).toHaveTextContent('no');
    fireEvent.click(screen.getByText('Añadir 1'));
    expect(screen.getByTestId('is-in')).toHaveTextContent('yes');
  });

  it('persiste favoritos en localStorage', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Añadir 1'));
    const stored = JSON.parse(localStorage.getItem('ghibli-favorites'));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(mockFilm.id);
  });

  it('restaura favoritos desde localStorage al montar', () => {
    localStorage.setItem('ghibli-favorites', JSON.stringify([mockFilm]));
    renderWithProvider();
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('useWatchlist lanza error fuera del Provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function SinProvider() { useWatchlist(); return null; }
    expect(() => render(<SinProvider />)).toThrow('useWatchlist debe usarse dentro de WatchlistProvider');
    spy.mockRestore();
  });
});