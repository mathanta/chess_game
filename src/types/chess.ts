export type Position = [number, number, number]

export type BoardSquare = {
  position: Position
  isHighlighted: boolean
}

export type PiecePosition = {
  id: string
  position: Position
  color: 'white' | 'black'
}

export type BoardState = {
  squares: BoardSquare[][]
}