import { PiecePosition, Position } from '@/types/chess'
import Pawn from '../pieces/Pawn'
import Rook from '../pieces/Rook'
import Knight from '../pieces/Knight'
import Bishop from '../pieces/Bishop'
import Queen from '../pieces/Queen'
import King from '../pieces/King'

interface PieceRendererProps {
  pieces: PiecePosition[]
  selectedPiece: string | null
  validMoves: Position[]
  handlePieceSelect: (pieceId: string) => void
  handleMove: (position: Position) => void
}

export const PieceRenderer = ({
  pieces,
  selectedPiece,
  validMoves,
  handlePieceSelect,
  handleMove
}: PieceRendererProps) => {
  return (
    <>
      {pieces.map((piece) => {
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
          case 'pawn': return <Pawn key={piece.id} {...commonProps} />
          case 'rook': return <Rook key={piece.id} {...commonProps} />
          case 'knight': return <Knight key={piece.id} {...commonProps} />
          case 'bishop': return <Bishop key={piece.id} {...commonProps} />
          case 'queen': return <Queen key={piece.id} {...commonProps} />
          case 'king': return <King key={piece.id} {...commonProps} />
        }
      })}
    </>
  )
}
