import { Position, PiecePosition } from '@/types/chess'

// Convert board coordinates to 3D position
export const boardToPosition = (x: number, z: number): Position => {
  return [x - 3.5, 0, z - 3.5]
}

// Convert 3D position to board coordinates
export const positionToBoard = (position: Position): [number, number] => {
  return [Math.round(position[0] + 3.5), Math.round(position[2] + 3.5)]
}

// src/utils/chessLssLogic.ts

export const getValidPawnMoves = (
    piece: PiecePosition, 
    allPieces: PiecePosition[]
  ): Position[] => {
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
        p.color !== piece.color  // Must be opponent's piece
      )
      if (pieceAtPosition) {
        moves.push(pos)
      }
    })
  
    return moves.filter(([x, _, z]) => x >= -3.5 && x <= 3.5 && z >= -3.5 && z <= 3.5)
  }  