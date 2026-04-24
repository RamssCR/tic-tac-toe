import { useCallback, useState } from 'react'
import {
  calculateDraw,
  calculateWinner,
  createEmptyBoard,
} from '@utils/CalculateWinner'

export type Player = 'X' | 'O'

export type CellValue = Player | null

export type WinnerResult = {
  winner: Player
  line: number[]
}

export type Score = {
  X: number
  O: number
  ties: number
}

export type GameState = {
  board: CellValue[]
  currentPlayer: Player
  winnerResult: WinnerResult | null
  isDraw: boolean
  history: CellValue[][]
}

const initialBoard: CellValue[] = createEmptyBoard()

const initialScore: Score = { X: 0, O: 0, ties: 0 }

export type UseGameReturn = GameState & {
  handleMove: (index: number) => void
  resetGame: () => void
  resetAll: () => void
  undoMove: () => void
  score: Score
}

/**
 * Hook principal del juego Tic-Tac-Toe.
 *
 * Gestiona el estado del tablero, el turno del jugador, el historial de
 * movimientos y el marcador acumulado entre partidas.
 *
 * @returns {UseGameReturn} Todas las propiedades y acciones del juego.
 *
 * @example
 * const { board, currentPlayer, winnerResult, handleMove, resetGame } = useGame()
 */
export const useGame = (): UseGameReturn => {
  const [board, setBoard] = useState<CellValue[]>(initialBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [history, setHistory] = useState<CellValue[][]>([])
  const [score, setScore] = useState<Score>(initialScore)

  const winnerResult = calculateWinner(board)
  const isDraw = calculateDraw(board, winnerResult)

  /** Actualiza el marcador cuando termina la partida. */
  const updateScore = useCallback(
    (result: ReturnType<typeof calculateWinner>, draw: boolean) => {
      if (result) {
        setScore((prev) => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1,
        }))
      } else if (draw) {
        setScore((prev) => ({ ...prev, ties: prev.ties + 1 }))
      }
    },
    [],
  )

  /**
   * Registra el movimiento del jugador en la celda `index`.
   * No tiene efecto si la celda ya está ocupada o la partida terminó.
   *
   * @param index - Índice de la celda seleccionada (0–8).
   */
  const handleMove = useCallback(
    (index: number) => {
      if (winnerResult || isDraw || board[index]) return

      const newBoard = board.slice() as CellValue[]
      newBoard[index] = currentPlayer

      const newWinner = calculateWinner(newBoard)
      const newDraw = calculateDraw(newBoard, newWinner)

      setHistory((prev) => [...prev, board])
      setBoard(newBoard)
      setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))

      updateScore(newWinner, newDraw)
    },
    [board, currentPlayer, winnerResult, isDraw, updateScore],
  )

  /**
   * Deshace el último movimiento, restaurando el estado anterior del tablero.
   * No tiene efecto si el historial está vacío.
   */
  const undoMove = useCallback(() => {
    if (history.length === 0) return
    const previousBoard = history[history.length - 1]
    setHistory((prev) => prev.slice(0, -1))
    setBoard(previousBoard)
    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
    const prevWinner = calculateWinner(previousBoard)
    const currentWinner = winnerResult
    if (currentWinner && !prevWinner) {
      setScore((prev) => ({
        ...prev,
        [currentWinner.winner]: Math.max(0, prev[currentWinner.winner] - 1),
      }))
    } else if (isDraw && !prevWinner) {
      setScore((prev) => ({ ...prev, ties: Math.max(0, prev.ties - 1) }))
    }
  }, [history, winnerResult, isDraw])

  /**
   * Reinicia el tablero para una nueva partida.
   * El marcador se conserva.
   */
  const resetGame = useCallback(() => {
    setBoard(initialBoard)
    setCurrentPlayer('X')
    setHistory([])
  }, [])

  /**
   * Reinicia todo: tablero, turno e historial y marcador.
   */
  const resetAll = useCallback(() => {
    setBoard(initialBoard)
    setCurrentPlayer('X')
    setHistory([])
    setScore(initialScore)
  }, [])

  return {
    board,
    currentPlayer,
    winnerResult,
    isDraw,
    history,
    score,
    handleMove,
    undoMove,
    resetGame,
    resetAll,
  }
}
