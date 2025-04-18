import { Position, PiecePosition } from '../state/types'
import { getValidMoves } from '@/utils/chessLogic'

type MoveHandlerProps = {
    pieces: PiecePosition[]
    setPieces: (value: React.SetStateAction<PiecePosition[]>) => void
    selectedPiece: string | null
    setSelectedPiece: (id: string | null) => void
    currentTurn: 'white' | 'black'
    setCurrentTurn: (turn: 'white' | 'black') => void
    updateHighlights: (moves: Position[]) => void
    startJumpAnimation: (pieceId: string, startPos: Position, endPos: Position) => void
}

export function createMoveHandlers({
    pieces,
    setPieces,
    selectedPiece,
    setSelectedPiece,
    currentTurn,
    setCurrentTurn,
    updateHighlights,
    startJumpAnimation
}: MoveHandlerProps) {

    const handlePieceSelect = (pieceId: string) => {
        const piece = pieces.find(p => p.id === pieceId)
        if (piece && piece.color === currentTurn) {
            if (selectedPiece === pieceId) {
                setSelectedPiece(null)
                updateHighlights([])
            } else {
                setSelectedPiece(pieceId)
                const validMoves = getValidMoves(piece, pieces)
                updateHighlights(validMoves)
            }
        }
    }

    const handleMove = (newPosition: Position) => {
        if (!selectedPiece) return

        const movingPiece = pieces.find(p => p.id === selectedPiece)
        if (!movingPiece) return

        startJumpAnimation(selectedPiece, movingPiece.position, newPosition)

        const capturedPiece = pieces.find(piece =>
            piece.position[0] === newPosition[0] &&
            piece.position[2] === newPosition[2] &&
            piece.id !== selectedPiece
        )

        if (capturedPiece) {
            setPieces((prev: PiecePosition[]) =>
                prev.filter((piece: PiecePosition) => piece.id !== capturedPiece.id)
            )
        }

        setPieces((prev: PiecePosition[]) =>
            prev.map((piece: PiecePosition) =>
                piece.id === selectedPiece
                    ? { ...piece, position: newPosition }
                    : piece
            )
        )

        setSelectedPiece(null)
        updateHighlights([])
        setCurrentTurn(currentTurn === 'white' ? 'black' : 'white')
    }

    const isValidMove = (position: Position) => {
        if (!selectedPiece) return false
        const piece = pieces.find(p => p.id === selectedPiece)
        if (!piece) return false

        const validMoves = getValidMoves(piece, pieces)
        return validMoves.some(move =>
            move[0] === position[0] &&
            move[1] === position[1] &&
            move[2] === position[2]
        )
    }

    return {
        handlePieceSelect,
        handleMove,
        isValidMove
    }
}