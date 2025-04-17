export type Position = [number, number, number]

export type BoardSquare = {
  position: Position
  isHighlighted: boolean
}

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'

export type PiecePosition = {
  id: string
  position: Position
  color: 'white' | 'black'
  type: PieceType
}

export type BoardState = {
  squares: BoardSquare[][]
}