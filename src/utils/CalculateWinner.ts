import type { CellValue, WinnerResult } from '@hooks/useGame'

/** Todas las combinaciones ganadoras posibles en un tablero 3×3. */
const winningLines: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/**
 * Evalúa el tablero y devuelve el ganador con su línea de victoria.
 *
 * @param board - El estado actual del tablero (9 celdas).
 * @returns {@link WinnerResult} si hay ganador, `null` si el juego continúa.
 *
 * @example
 * const result = calculateWinner(['X','X','X',null,null,null,null,null,null])
 * // result → { winner: 'X', line: [0, 1, 2] }
 */
export const calculateWinner = (board: CellValue[]): WinnerResult | null => {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a]!, line: [a, b, c] }
    }
  }
  return null
}

/**
 * Comprueba si la partida ha terminado en empate.
 *
 * @param board - El estado actual del tablero.
 * @param winnerResult - Resultado previo del cálculo de ganador.
 * @returns `true` si todas las celdas están ocupadas y no hay ganador.
 */
export const calculateDraw = (
  board: CellValue[],
  winnerResult: WinnerResult | null,
): boolean => {
  return !winnerResult && board.every((cell) => cell !== null)
}

/**
 * Crea un tablero vacío de 9 celdas.
 *
 * @returns Un {@link BoardState} con todas las celdas en `null`.
 */
export const createEmptyBoard = (): CellValue[] => [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]
