import { cn } from '@utils/classMerger'
import type { CellValue, SquareIndex } from '@schemas/game'

/** Props del componente `Square`. */
type SquareProps = {
  value: CellValue
  index: SquareIndex
  isWinner: boolean
  isGameOver: boolean
  onClick: (index: SquareIndex) => void
}

/**
 * Casilla individual del tablero Tic-Tac-Toe.
 *
 * Muestra el valor de la celda (`X`, `O` o vacío) y aplica
 * estilos dinámicos según el estado del juego.
 *
 * @param props - {@link SquareProps}
 * @returns Elemento `<button>` con estilos y accesibilidad aplicados.
 *
 * @example
 * <Square
 *   value="X"
 *   index={0}
 *   isWinner={true}
 *   isGameOver={true}
 *   onClick={handleMove}
 * />
 */
export const Square = ({
  value,
  index,
  isWinner,
  isGameOver,
  onClick,
}: SquareProps) => {
  const isEmpty = value === null

  return (
    <button
      type="button"
      aria-label={
        isEmpty ? `Celda ${index + 1}, vacía` : `Celda ${index + 1}, ${value}`
      }
      disabled={!isEmpty || isGameOver}
      onClick={() => onClick(index)}
      className={cn(
        'relative flex items-center justify-center',
        'h-20 w-20 rounded-square',
        'text-3xl font-bold',
        'border border-square-border bg-square-bg',
        'shadow-[0_2px_8px_0_rgba(0,0,0,.08)]',
        'transition-all duration-200',
        isEmpty &&
          !isGameOver &&
          'hover:bg-square-hover hover:scale-105 cursor-pointer',
        (!isEmpty || isGameOver) && 'cursor-default',
        value === 'X' && 'square-x animate-pop-in',
        value === 'O' && 'square-o animate-pop-in',
        isWinner && 'square-winner animate-winner',
      )}
    >
      {value}
    </button>
  )
}
