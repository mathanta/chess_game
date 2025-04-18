import Square from '../Square'
import { BoardState, Position } from '@/types/chess'

interface BoardSquaresProps {
    boardState: BoardState
    handleMove: (position: Position) => void
}

export const BoardSquares = ({ boardState, handleMove }: BoardSquaresProps) => {
    return (
        <>
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
        </>
    )
}
