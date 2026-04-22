import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'
import { ThemeProvider } from './context/ThemeContext'
import { FilmsProvider } from './context/FilmsContext'
import App from './App.jsx'
import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <FilmsProvider>
            <App />
          </FilmsProvider>
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)