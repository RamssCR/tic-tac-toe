import './index.css'
import { App } from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

console.log(__APP_VERSION__)
if (__IS_STAGING__) {
  console.log('Ejecutando app en pre-producción')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
