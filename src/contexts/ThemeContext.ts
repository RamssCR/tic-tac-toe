import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

/**
 * Contexto React que expone el tema activo y la función para alternarlo.
 *
 * Debe consumirse a través de {@link useThemeContext} para garantizar
 * que el componente esté envuelto en un `ThemeProvider`.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null)
