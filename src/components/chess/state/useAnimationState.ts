import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Position } from './types'

type AnimatingPiece = {
    id: string
    startPos: Position
    endPos: Position
    progress: number
}

export function useAnimationState() {
    const [animatingPiece, setAnimatingPiece] = useState<AnimatingPiece | null>(null)
    const hoverRotation = useRef(0)

    useFrame((state, delta) => {
        // Hover rotation
        if (hoverRotation.current !== null) {
            hoverRotation.current = (hoverRotation.current + delta) % (Math.PI * 2)
        }

        // Jump animation
        if (animatingPiece) {
            if (animatingPiece.progress >= 1) {
                setAnimatingPiece(null)
                return
            }

            setAnimatingPiece(prev => {
                if (!prev) return null
                const newProgress = prev.progress + 0.05
                const [startX, startY, startZ] = prev.startPos
                const [endX, endY, endZ] = prev.endPos

                // Calculate current position with jump
                const jumpHeight = 2
                const heightProgress = 4 * newProgress * (1 - newProgress)

                return {
                    ...prev,
                    progress: newProgress
                }
            })
        }
    })

    const startJumpAnimation = (pieceId: string, startPos: Position, endPos: Position) => {
        setAnimatingPiece({
            id: pieceId,
            startPos,
            endPos,
            progress: 0
        })
    }

    const getCurrentPosition = (piece: { id: string, position: Position }): Position => {
        if (animatingPiece?.id === piece.id) {
            const progress = animatingPiece.progress
            const [startX, startY, startZ] = animatingPiece.startPos
            const [endX, endY, endZ] = animatingPiece.endPos
            const jumpHeight = 2
            const heightProgress = 4 * progress * (1 - progress)

            return [
                startX + (endX - startX) * progress,
                startY + jumpHeight * heightProgress,
                startZ + (endZ - startZ) * progress
            ]
        }

        return piece.position
    }

    const getRotation = (pieceId: string, isSelected: boolean): [number, number, number] => {
        if (isSelected && animatingPiece?.id !== pieceId) {  // Fixed comparison
            return [0, hoverRotation.current, 0]
        }
        return [0, 0, 0]
    }

    return {
        isAnimating: !!animatingPiece,
        animatingPieceId: animatingPiece?.id || null,
        startJumpAnimation,
        getCurrentPosition,
        getRotation
    }
}
