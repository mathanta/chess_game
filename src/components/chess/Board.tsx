import { useState } from 'react'
import { BoardState, Position, PiecePosition } from '@/types/chess'
import Square from './Square'
import Pawn from './pieces/Pawn'
import Rook from './pieces/Rook'
import Knight from './pieces/Knight'
import Bishop from './pieces/Bishop'
import King from './pieces/King'
import Queen from './pieces/Queen'
import { boardToPosition, getValidMoves } from '@/utils/chessLogic'

function Board() {
    // Initialize 8x8 board with squares
    const initializeBoard = (): BoardState => {
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

    const [boardState, setBoardState] = useState<BoardState>(initializeBoard())
    const [pieces, setPieces] = useState<PiecePosition[]>([
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
            id: 'white-king',
            position: [0.5, 0.1, 3.5] as Position,
            color: 'white' as const,
            type: 'king' as const
        },
        {
            id: 'white-queen',
            position: [-0.5, 0.1, 3.5] as Position,
            color: 'white' as const,
            type: 'queen' as const
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
            id: 'black-king',
            position: [-0.5, 0.1, -3.5] as Position,
            color: 'black' as const,
            type: 'king' as const
        },
        {
            id: 'black-queen',
            position: [0.5, 0.1, -3.5] as Position,
            color: 'black' as const,
            type: 'queen' as const
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
    ])

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

        // Check for capture
        const capturedPiece = pieces.find(piece =>
            piece.position[0] === newPosition[0] &&
            piece.position[2] === newPosition[2] &&
            piece.id !== selectedPiece
        )

        // Remove captured piece if there is one
        if (capturedPiece) {
            setPieces(prev => prev.filter(piece => piece.id !== capturedPiece.id))
        }

        // Move selected piece
        setPieces(prev => prev.map(piece =>
            piece.id === selectedPiece
                ? { ...piece, position: newPosition }
                : piece
        ))

        setSelectedPiece(null)
        updateHighlights([])
        setCurrentTurn(currentTurn === 'white' ? 'black' : 'white')
    }

    return (
        <group>
            {/* Background for click detection */}
            <mesh
                position={[0, -0.1, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={() => {
                    setSelectedPiece(null)
                    updateHighlights([])
                }}
            >
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Chess board squares */}
            {boardState.squares.map((row, i) =>
                row.map((square, j) => (
                    <Square
                        key={`${i}-${j}`}
                        position={square.position}
                        color={(i + j) % 2 === 0 ? 'white' : 'grey'}
                        isHighlighted={square.isHighlighted}
                        onClick={() => square.isHighlighted && handleMove(square.position)}
                    />
                ))
            )}

            {/* Pieces */}
            {pieces.map((piece) => {
                const validMoves = selectedPiece ?
                    getValidMoves(pieces.find(p => p.id === selectedPiece)!, pieces) :
                    []

                const isCaptureable = !!(selectedPiece &&
                    selectedPiece !== piece.id &&
                    validMoves.some(move =>
                        move[0] === piece.position[0] &&
                        move[2] === piece.position[2]
                    ))

                const commonProps = {
                    position: piece.position,
                    color: piece.color,
                    isSelected: selectedPiece === piece.id,
                    onSelect: () => handlePieceSelect(piece.id),
                    isCaptureable: isCaptureable,
                    onCapture: () => handleMove(piece.position)
                }

                switch (piece.type) {
                    case 'pawn':
                        return <Pawn key={piece.id} {...commonProps} />
                    case 'rook':
                        return <Rook key={piece.id} {...commonProps} />
                    case 'knight':
                        return <Knight key={piece.id} {...commonProps} />
                    case 'bishop':
                        return <Bishop key={piece.id} {...commonProps} />
                    case 'king':
                        return <King key={piece.id} {...commonProps} />
                    case 'queen':
                        return <Queen key={piece.id} {...commonProps} />
                    default:
                        return null
                }
            })}

        </group>
    )
}

export default Board