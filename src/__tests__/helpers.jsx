import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WatchlistProvider } from '../context/WatchlistContext';
import { ThemeProvider } from '../context/ThemeContext';
import { FilmsProvider } from '../context/FilmsContext';

export function renderWithProviders(ui, { initialEntries = ['/'], ...rest } = {}) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider>
          <WatchlistProvider>
            <FilmsProvider>
              {children}
            </FilmsProvider>
          </WatchlistProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  }
  return render(ui, { wrapper: Wrapper, ...rest });
}

export const mockFilm = {
  id: 'abc123',
  title: 'Mi vecino Totoro',
  release_date: '1988',
  running_time: '86',
  rt_score: '94',
  image: 'https://example.com/totoro.jpg',
  description: 'Una familia se muda al campo y sus hijas conocen a Totoro.',
  director: 'Hayao Miyazaki',
  producer: 'Isao Takahata',
};

export const mockFilm2 = {
  id: 'def456',
  title: 'El viaje de Chihiro',
  release_date: '2001',
  running_time: '125',
  rt_score: '97',
  image: 'https://example.com/chihiro.jpg',
  description: 'Una niña queda atrapada en el mundo de los espíritus.',
  director: 'Hayao Miyazaki',
  producer: 'Toshio Suzuki',
};