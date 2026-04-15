export type Player = 'X' | 'O'

export type CellValue = Player | null

export type BoardState = CellValue[]
export type SquareIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type WinnerResult = {
  winner: Player
  line: SquareIndex[]
}

export type Score = {
  X: number
  O: number
  ties: number
}

export type GameState = {
  board: BoardState
  currentPlayer: Player
  winnerResult: WinnerResult | null
  isDraw: boolean
  history: BoardState[]
}
