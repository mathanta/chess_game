import { useState } from 'react'
import { BoardState, PiecePosition, Position } from './types'
import { initializeBoard, initializePieces } from '../logic/boardSetup'

export function useGameState() {
  const [boardState, setBoardState] = useState<BoardState>(initializeBoard())
  const [pieces, setPieces] = useState<PiecePosition[]>(initializePieces())
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white')

  const updateHighlights = (validMoves: Position[]) => {
    const newBoard = initializeBoard()
    validMoves.forEach(move => {
      const boardX = Math.floor(move[0] + 3.5)
      const boardZ = Math.floor(move[2] + 3.5)
      if (boardX >= 0 && boardX < 8 && boardZ >= 0 && boardZ < 8) {
        newBoard.squares[boardX][boardZ].isHighlighted = true
      }
    })
    setBoardState(newBoard)
  }

  return {
    boardState,
    setBoardState,
    pieces,
    setPieces,
    selectedPiece,
    setSelectedPiece,
    currentTurn,
    setCurrentTurn,
    updateHighlights,
  }
}