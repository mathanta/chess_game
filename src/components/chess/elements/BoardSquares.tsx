import { BoardState, Position } from '../state/types'
import Square from '../Square'

type BoardSquaresProps = {
    boardState: BoardState
    onSquareClick: (position: Position) => void
}

export function BoardSquares({ boardState, onSquareClick }: BoardSquaresProps) {
    return (
        <>
            {boardState.squares.map((row, i) =>
                row.map((square, j) => (
                    <Square
                        key={`${i}-${j}`}
                        position={square.position}
                        color={(i + j) % 2 === 0 ? 'white' : 'grey'}
                        isHighlighted={square.isHighlighted}
                        onClick={() => square.isHighlighted && onSquareClick(square.position)}
                    />
                ))
            )}
        </>
    )
}