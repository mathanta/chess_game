import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { Position } from '@/types/chess'

export function useJumpAnimation(onComplete: () => void) {
  const [jumpState, setJumpState] = useState({
    isJumping: false,
    startPos: [0, 0, 0] as Position,
    endPos: [0, 0, 0] as Position,
    progress: 0
  })

  useFrame(() => {
    if (jumpState.isJumping) {
      if (jumpState.progress >= 1) {
        setJumpState(prev => ({ ...prev, isJumping: false }))
        onComplete()
        return
      }

      setJumpState(prev => ({
        ...prev,
        progress: prev.progress + 0.05
      }))
    }
  })

  const startJump = (start: Position, end: Position) => {
    setJumpState({
      isJumping: true,
      startPos: start,
      endPos: end,
      progress: 0
    })
  }

  const getCurrentPosition = (): Position => {
    if (!jumpState.isJumping) return jumpState.startPos

    const p = jumpState.progress
    const [x1, y1, z1] = jumpState.startPos
    const [x2, /*y2,*/ z2] = jumpState.endPos
    
    const jumpHeight = 2
    const heightOffset = jumpHeight * 4 * p * (1 - p)

    return [
      x1 + (x2 - x1) * p,
      y1 + heightOffset,
      z1 + (z2 - z1) * p
    ]
  }

  return {
    startJump,
    getCurrentPosition,
    isJumping: jumpState.isJumping
  }
}