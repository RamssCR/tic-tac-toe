import { use } from 'react'
import { ThemeContext, type ThemeContextValue } from '@contexts/ThemeContext'

/**
 * Hook que accede al contexto de tema.
 *
 * @returns {ThemeContextValue} El valor del contexto: `theme` y `toggleTheme`.
 * @throws {Error} Si se usa fuera de un `ThemeProvider`.
 *
 * @example
 * const { theme, toggleTheme } = useThemeContext()
 */
export const useThemeContext = (): ThemeContextValue => {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext debe usarse dentro de un ThemeProvider')
  }
  return context
}
