import { Square } from '@components/Square'
import { useGame } from '@hooks/useGame'
import { cn } from '@utils/classMerger'
import type { SquareIndex } from '@schemas/game'

/**
 * Tablero principal del juego Tic-Tac-Toe.
 *
 * Gestiona el estado completo del juego a través de {@link useGame} y renderiza:
 * - El marcador de victorias
 * - El estado de la partida (turno, ganador, empate)
 * - La cuadrícula 3×3 de celdas
 * - Los controles (deshacer, nueva partida, reiniciar todo)
 *
 * @returns Elemento JSX con el tablero completo del juego.
 *
 * @example
 * <Board />
 */
export const Board = () => {
  const {
    board,
    currentPlayer,
    winnerResult,
    isDraw,
    score,
    handleMove,
    undoMove,
    resetGame,
    resetAll,
    history,
  } = useGame()

  const isGameOver = Boolean(winnerResult) || isDraw
  const winningLine = winnerResult?.line ?? []

  const statusMessage = (() => {
    if (winnerResult) return `¡Ganó el jugador ${winnerResult.winner}!`
    if (isDraw) return '¡Empate! 🤝'
    return `Turno del jugador`
  })()

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex items-center gap-4 animate-slide-up">
        <div
          className={cn(
            'flex flex-col items-center px-5 py-3 rounded-xl border transition-all duration-300',
            'border-square-border bg-surface-raised',
            !isGameOver && currentPlayer === 'X' && 'ring-2 ring-x scale-105',
          )}
        >
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Jugador X
          </span>
          <span className="text-2xl font-bold text-x">{score.X}</span>
        </div>

        <div className="flex flex-col items-center px-4 py-3 rounded-xl border border-square-border bg-surface-raised">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Empates
          </span>
          <span className="text-2xl font-bold text-text-primary">
            {score.ties}
          </span>
        </div>

        <div
          className={cn(
            'flex flex-col items-center px-5 py-3 rounded-xl border transition-all duration-300',
            'border-square-border bg-surface-raised',
            !isGameOver && currentPlayer === 'O' && 'ring-2 ring-o scale-105',
          )}
        >
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Jugador O
          </span>
          <span className="text-2xl font-bold text-o">{score.O}</span>
        </div>
      </div>

      <div
        key={statusMessage}
        className="flex items-center gap-3 animate-slide-up"
      >
        {!isGameOver && (
          <span
            className={cn(
              'inline-flex items-center justify-center w-9 h-9 rounded-lg text-lg font-bold',
              currentPlayer === 'X' ? 'badge-x' : 'badge-o',
            )}
          >
            {currentPlayer}
          </span>
        )}
        <p className="text-lg font-semibold text-text-primary">
          {statusMessage}
        </p>
      </div>

      <div
        className="grid grid-cols-3 gap-2 p-4 rounded-3xl bg-surface border border-border shadow-[0_8px_32px_0_rgba(0,0,0,.12)]"
        role="grid"
        aria-label="Tablero de Tic-Tac-Toe"
      >
        {board.map((cell, i) => (
          <Square
            key={i}
            value={cell}
            index={i as SquareIndex}
            isWinner={winningLine.includes(i as SquareIndex)}
            isGameOver={isGameOver}
            onClick={handleMove}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 animate-slide-up">
        <button
          type="button"
          onClick={undoMove}
          disabled={history.length === 0 || Boolean(winnerResult)}
          aria-label="Deshacer último movimiento"
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium border border-border',
            'bg-transparent text-primary',
            'transition-all duration-200',
            'hover:bg-surface hover:text-text-primary',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-secondary',
          )}
        >
          Deshacer
        </button>

        <button
          type="button"
          onClick={resetGame}
          aria-label="Iniciar nueva partida"
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-brand text-primary hover:bg-brand-hover active:scale-95 transition-all duration-200"
        >
          {isGameOver ? '▶ Jugar de nuevo' : '↺ Nueva partida'}
        </button>

        <button
          type="button"
          onClick={resetAll}
          aria-label="Reiniciar marcador y partida"
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium border border-border',
            'bg-transparent text-text-secondary',
            'transition-all duration-200',
            'hover:bg-surface hover:text-x',
          )}
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}
