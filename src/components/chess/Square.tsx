import { useState } from 'react'
import { Position } from '@/types/chess'

type SquareProps = {
  position: Position
  color: string
  isHighlighted: boolean
  onClick?: () => void
}

function Square({ position, color, isHighlighted, onClick }: SquareProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <group onClick={onClick}>
      {/* Base square */}
      <mesh 
        position={position}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <boxGeometry args={[1, 0.1, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Highlight overlay */}
      {isHighlighted && (
        <mesh 
          position={[position[0], position[1] + 0.05, position[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="yellow" 
            transparent 
            opacity={isHovered ? 0.6 : 0.4}
            side={2}
          />
        </mesh>
      )}
    </group>
  )
}

export default Square