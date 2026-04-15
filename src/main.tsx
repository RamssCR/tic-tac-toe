import './index.css'
import { App } from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@providers/ThemeProvider.tsx'

console.log(__APP_VERSION__)
if (__IS_STAGING__) {
  console.log('Ejecutando app en pre-producción')
}

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
)
