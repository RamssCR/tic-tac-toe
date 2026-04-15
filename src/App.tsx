import { Board } from '@components/Board'
import { useThemeContext } from '@hooks/useThemeContext'

/**
 * Componente raíz de la aplicación Tic-Tac-Toe.
 *
 * Renderiza el encabezado con el botón de tema y el tablero de juego.
 *
 * @returns Elemento JSX con el layout completo de la aplicación.
 *
 * @example
 * <App />
 */
export const App = () => {
  const { theme, toggleTheme } = useThemeContext()
  const isDark = theme === 'dark'

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg transition-colors duration-300">
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-text-primary tracking-tight">
            Tic-Tac-Toe
          </span>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-surface-raised transition-all duration-200"
        >
          <span>{isDark ? 'Claro' : 'Oscuro'}</span>
        </button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-10 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          <span className="text-x">X</span>
          <span className="text-text-secondary mx-2">vs</span>
          <span className="text-o">O</span>
        </h1>
        <Board />
      </main>
    </div>
  )
}
