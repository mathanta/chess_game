// Board.tsx
'use client'
import { useFrame } from '@react-three/fiber'
import { Position } from '@/types/chess'
import { BoardSquares } from './elements/BoardSquares'
import { PieceRenderer } from './elements/PieceRenderer'
import { BackgroundPlane } from './elements/BackgroundPlane'
import { useGameState } from './state/useGameState'
import { getValidMoves } from '@/utils/chessLogic'

function Board() {
    const {
        boardState,
        pieces,
        setPieces,
        selectedPiece,
        setSelectedPiece,
        currentTurn,
        setCurrentTurn,
        animatingPiece,
        setAnimatingPiece,
        updateHighlights
    } = useGameState()

    useFrame((state, delta) => {
        if (animatingPiece) {
            if (animatingPiece.progress >= 1) {
                setPieces(prev => prev.map(piece =>
                    piece.id === animatingPiece.id
                        ? { ...piece, position: animatingPiece.endPos }
                        : piece
                ))
                setAnimatingPiece(null)
                setSelectedPiece(null)
                updateHighlights([])
                setCurrentTurn(currentTurn === 'white' ? 'black' : 'white')
                return
            }

            setAnimatingPiece(prev => {
                if (!prev) return null
                const newProgress = prev.progress + 0.05
                const [startX, startY, startZ] = prev.startPos
                const [endX, endY, endZ] = prev.endPos

                const jumpHeight = 2
                const heightProgress = 4 * newProgress * (1 - newProgress)
                const currentPos: Position = [
                    startX + (endX - startX) * newProgress,
                    startY + jumpHeight * heightProgress,
                    startZ + (endZ - startZ) * newProgress
                ]

                setPieces(pieces => pieces.map(piece =>
                    piece.id === prev.id
                        ? { ...piece, position: currentPos }
                        : piece
                ))

                return { ...prev, progress: newProgress }
            })
        }
    })

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
        if (!selectedPiece || animatingPiece) return

        const movingPiece = pieces.find(p => p.id === selectedPiece)
        if (!movingPiece) return

        setAnimatingPiece({
            id: selectedPiece,
            startPos: movingPiece.position,
            endPos: newPosition,
            progress: 0
        })

        const capturedPiece = pieces.find(piece =>
            piece.position[0] === newPosition[0] &&
            piece.position[2] === newPosition[2] &&
            piece.id !== selectedPiece
        )

        if (capturedPiece) {
            setPieces(prev => prev.filter(piece => piece.id !== capturedPiece.id))
        }
    }

    const validMoves = selectedPiece
        ? getValidMoves(pieces.find(p => p.id === selectedPiece)!, pieces)
        : []

    return (
        <group>
            <BackgroundPlane 
                onClick={() => {
                    if (!animatingPiece) {
                        setSelectedPiece(null)
                        updateHighlights([])
                    }
                }}
            />
            <BoardSquares boardState={boardState} handleMove={handleMove} />
            <PieceRenderer
                pieces={pieces}
                selectedPiece={selectedPiece}
                validMoves={validMoves}
                handlePieceSelect={handlePieceSelect}
                handleMove={handleMove}
            />
        </group>
    )
}

export default Board
