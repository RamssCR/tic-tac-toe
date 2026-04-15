import { createContext } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Forma del contexto de tema.
 */
export interface ThemeContextValue {
  /** Tema activo actualmente. */
  theme: Theme
  /** Alterna entre los modos claro y oscuro. */
  toggleTheme: () => void
}

/**
 * Contexto React que expone el tema activo y la función para alternarlo.
 *
 * Debe consumirse a través de {@link useThemeContext} para garantizar
 * que el componente esté envuelto en un `ThemeProvider`.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null)
