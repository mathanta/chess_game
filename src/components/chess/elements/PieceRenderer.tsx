import { PiecePosition, Position } from '../state/types'
import Pawn from '../pieces/Pawn'
import Rook from '../pieces/Rook'
import Knight from '../pieces/Knight'
import Bishop from '../pieces/Bishop'
import Queen from '../pieces/Queen'
import King from '../pieces/King'

type PieceRendererProps = {
  pieces: PiecePosition[]
  selectedPiece: string | null
  onPieceSelect: (id: string) => void
  getAnimatedPosition: (piece: PiecePosition) => Position
  getRotation: (pieceId: string, isSelected: boolean) => [number, number, number]
  isValidCapture: (position: Position) => boolean
  onCapture: (position: Position) => void
}

export function PieceRenderer({
  pieces,
  selectedPiece,
  onPieceSelect,
  getAnimatedPosition,
  getRotation,
  isValidCapture,
  onCapture
}: PieceRendererProps) {
  return (
    <>
      {pieces.map((piece) => {
        const position = getAnimatedPosition(piece)
        const rotation = getRotation(piece.id, selectedPiece === piece.id)
        const isCaptureable = isValidCapture(piece.position)

        const props = {
          position,
          rotation,
          color: piece.color,
          isSelected: selectedPiece === piece.id,
          onSelect: () => onPieceSelect(piece.id),
          isCaptureable,
          onCapture: () => onCapture(piece.position)
        }

        switch (piece.type) {
          case 'pawn':
            return <Pawn key={piece.id} {...props} />
          case 'rook':
            return <Rook key={piece.id} {...props} />
          case 'knight':
            return <Knight key={piece.id} {...props} />
          case 'bishop':
            return <Bishop key={piece.id} {...props} />
          case 'queen':
            return <Queen key={piece.id} {...props} />
          case 'king':
            return <King key={piece.id} {...props} />
        }
      })}
    </>
  )
}