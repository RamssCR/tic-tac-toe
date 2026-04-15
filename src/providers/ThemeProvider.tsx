import { ThemeContext, type Theme } from '@contexts/ThemeContext'
import { useEffect, useState, type ReactNode } from 'react'

type ThemeProviderProps = {
  children: ReactNode
}

/**
 * Proveedor de tema para la aplicación.
 *
 * Lee el tema guardado en `localStorage` al inicializar y actualiza la
 * clase del elemento `<html>` (`'light'` | `'dark'`) cada vez que el
 * tema cambia, permitiendo que Tailwind CSS aplique el modo oscuro.
 *
 * @param props - {@link ThemeProviderProps}
 * @returns Proveedor del {@link ThemeContext} que envuelve a `children`.
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) ?? 'dark',
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
