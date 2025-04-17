import { Position, PiecePosition } from '@/types/chess'

// Convert board coordinates to 3D position
export const boardToPosition = (x: number, z: number): Position => {
  return [x - 3.5, 0, z - 3.5]
}

// Convert 3D position to board coordinates
export const positionToBoard = (position: Position): [number, number] => {
  return [Math.round(position[0] + 3.5), Math.round(position[2] + 3.5)]
}

// Helper to check if a position is occupied
const isOccupied = (pos: Position, pieces: PiecePosition[]): PiecePosition | undefined => {
  return pieces.find(p => 
    p.position[0] === pos[0] && 
    p.position[2] === pos[2]
  )
}

// Helper to check if position is within board bounds
const isInBounds = (pos: Position): boolean => {
  return pos[0] >= -3.5 && pos[0] <= 3.5 && pos[2] >= -3.5 && pos[2] <= 3.5
}

export const getValidMoves = (piece: PiecePosition, allPieces: PiecePosition[]): Position[] => {
  switch (piece.type) {
    case 'pawn':
      return getValidPawnMoves(piece, allPieces)
    case 'rook':
      return getValidRookMoves(piece, allPieces)
    case 'knight':
      return getValidKnightMoves(piece, allPieces)
    case 'bishop':
      return getValidBishopMoves(piece, allPieces)
    case 'queen':
      return [...getValidRookMoves(piece, allPieces), ...getValidBishopMoves(piece, allPieces)]
    case 'king':
      return getValidKingMoves(piece, allPieces)
    default:
      return []
  }
}

export const getValidPawnMoves = (piece: PiecePosition, allPieces: PiecePosition[]): Position[] => {
  const [x, y, z] = piece.position
  const moves: Position[] = []
  const direction = piece.color === 'white' ? -1 : 1
  
  // Forward move
  const forwardPos: Position = [x, y, z + direction]
  if (!allPieces.some(p => 
    p.position[0] === forwardPos[0] && 
    p.position[2] === forwardPos[2]
  )) {
    moves.push(forwardPos)
    
    // First move - two squares
    if ((piece.color === 'white' && z === 2.5) || (piece.color === 'black' && z === -2.5)) {
      const twoForward: Position = [x, y, z + (direction * 2)]
      if (!allPieces.some(p => 
        p.position[0] === twoForward[0] && 
        p.position[2] === twoForward[2]
      )) {
        moves.push(twoForward)
      }
    }
  }
  
  // Diagonal captures
  const diagonalMoves: Position[] = [
    [x - 1, y, z + direction],
    [x + 1, y, z + direction]
  ]
  
  diagonalMoves.forEach(pos => {
    const pieceAtPosition = allPieces.find(p => 
      p.position[0] === pos[0] && 
      p.position[2] === pos[2] && 
      p.color !== piece.color
    )
    if (pieceAtPosition) {
      moves.push(pos)
    }
  })

  return moves.filter(([x, _, z]) => x >= -3.5 && x <= 3.5 && z >= -3.5 && z <= 3.5)
}

export const getValidRookMoves = (piece: PiecePosition, allPieces: PiecePosition[]): Position[] => {
  const moves: Position[] = []
  const [x, y, z] = piece.position
  const directions = [
    [1, 0],  // right
    [-1, 0], // left
    [0, 1],  // forward
    [0, -1]  // backward
  ]

  directions.forEach(([dx, dz]) => {
    let multiplier = 1
    while (true) {
      const newPos: Position = [
        x + dx * multiplier, 
        y, 
        z + dz * multiplier
      ]

      if (!isInBounds(newPos)) break

      const occupyingPiece = isOccupied(newPos, allPieces)
      
      if (occupyingPiece) {
        if (occupyingPiece.color !== piece.color) {
          moves.push(newPos)
        }
        break
      }

      moves.push(newPos)
      multiplier++
    }
  })

  return moves
}

export const getValidKnightMoves = (piece: PiecePosition, allPieces: PiecePosition[]): Position[] => {
  const moves: Position[] = []
  const [x, y, z] = piece.position

  const possibleMoves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ]

  possibleMoves.forEach(([dx, dz]) => {
    const newPos: Position = [x + dx, y, z + dz]

    if (isInBounds(newPos)) {
      const occupyingPiece = isOccupied(newPos, allPieces)
      
      if (!occupyingPiece || occupyingPiece.color !== piece.color) {
        moves.push(newPos)
      }
    }
  })

  return moves
}

export const getValidBishopMoves = (piece: PiecePosition, allPieces: PiecePosition[]): Position[] => {
  const moves: Position[] = []
  const [x, y, z] = piece.position
  const directions = [
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ]

  directions.forEach(([dx, dz]) => {
    let multiplier = 1
    while (true) {
      const newPos: Position = [
        x + dx * multiplier, 
        y, 
        z + dz * multiplier
      ]

      if (!isInBounds(newPos)) break

      const occupyingPiece = isOccupied(newPos, allPieces)
      
      if (occupyingPiece) {
        if (occupyingPiece.color !== piece.color) {
          moves.push(newPos)
        }
        break
      }

      moves.push(newPos)
      multiplier++
    }
  })

  return moves
}

export const getValidKingMoves = (piece: PiecePosition, allPieces: PiecePosition[]): Position[] => {
  const moves: Position[] = []
  const [x, y, z] = piece.position
  const directions = [
    [1, 0], [1, 1], [0, 1], [-1, 1],
    [-1, 0], [-1, -1], [0, -1], [1, -1]
  ]

  directions.forEach(([dx, dz]) => {
    const newPos: Position = [x + dx, y, z + dz]

    if (isInBounds(newPos)) {
      const occupyingPiece = isOccupied(newPos, allPieces)
      
      if (!occupyingPiece || occupyingPiece.color !== piece.color) {
        moves.push(newPos)
      }
    }
  })

  return moves
}