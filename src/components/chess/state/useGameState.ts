import { useState } from 'react'
import { Position, PiecePosition } from '@/types/chess'
import { initializeBoard, initialPieces } from '../logic/boardSetup'
/*import { getValidMoves } from '@/utils/chessLogic'*/

export const useGameState = () => {
    const [boardState, setBoardState] = useState(initializeBoard())
    const [pieces, setPieces] = useState<PiecePosition[]>(initialPieces)
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
    const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white')
    const [animatingPiece, setAnimatingPiece] = useState<{
        id: string,
        startPos: Position,
        endPos: Position,
        progress: number
    } | null>(null)

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
        animatingPiece,
        setAnimatingPiece,
        updateHighlights
    }
}
