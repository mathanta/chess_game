import { BoardState, Position, PiecePosition } from '../state/types'

export const boardToPosition = (x: number, z: number): Position => {
  return [x - 3.5, 0, z - 3.5]
}

export const initializeBoard = (): BoardState => {
  const squares: BoardState['squares'] = []
  for (let i = 0; i < 8; i++) {
    squares[i] = []
    for (let j = 0; j < 8; j++) {
      squares[i][j] = {
        position: boardToPosition(i, j),
        isHighlighted: false
      }
    }
  }
  return { squares }
}

export const initializePieces = (): PiecePosition[] => {
  return [
    // White pawns
    ...[...Array(8)].map((_, i) => ({
      id: `white-pawn-${i}`,
      position: [i - 3.5, 0.1, 2.5] as Position,
      color: 'white' as const,
      type: 'pawn' as const
    })),
    // Black pawns
    ...[...Array(8)].map((_, i) => ({
      id: `black-pawn-${i}`,
      position: [i - 3.5, 0.1, -2.5] as Position,
      color: 'black' as const,
      type: 'pawn' as const
    })),
    // White pieces
    {
      id: 'white-rook-0',
      position: [-3.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'rook' as const
    },
    {
      id: 'white-knight-0',
      position: [-2.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'knight' as const
    },
    {
      id: 'white-bishop-0',
      position: [-1.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'bishop' as const
    },
    {
      id: 'white-queen',
      position: [-0.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'queen' as const
    },
    {
      id: 'white-king',
      position: [0.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'king' as const
    },
    {
      id: 'white-bishop-1',
      position: [1.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'bishop' as const
    },
    {
      id: 'white-knight-1',
      position: [2.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'knight' as const
    },
    {
      id: 'white-rook-1',
      position: [3.5, 0.1, 3.5] as Position,
      color: 'white' as const,
      type: 'rook' as const
    },
    // Black pieces
    {
      id: 'black-rook-0',
      position: [-3.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'rook' as const
    },
    {
      id: 'black-knight-0',
      position: [-2.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'knight' as const
    },
    {
      id: 'black-bishop-0',
      position: [-1.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'bishop' as const
    },
    {
      id: 'black-queen',
      position: [-0.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'queen' as const
    },
    {
      id: 'black-king',
      position: [0.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'king' as const
    },
    {
      id: 'black-bishop-1',
      position: [1.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'bishop' as const
    },
    {
      id: 'black-knight-1',
      position: [2.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'knight' as const
    },
    {
      id: 'black-rook-1',
      position: [3.5, 0.1, -3.5] as Position,
      color: 'black' as const,
      type: 'rook' as const
    }
  ]
}
