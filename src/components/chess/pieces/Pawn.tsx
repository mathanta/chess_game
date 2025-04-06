import { useState } from 'react'
import { Position } from '@/types/chess'

function Pawn({
  position,
  color,
  isSelected,
  onSelect,
  isCaptureable = false,
  onCapture,
}: {
  position: Position
  color: 'white' | 'black'
  isSelected: boolean
  onSelect: () => void
  isCaptureable?: boolean
  onCapture?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [x, y, z] = position

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (isCaptureable && onCapture) {
      onCapture()
    } else {
      onSelect()
    }
  }

  return (
    <mesh
      position={[x, y, z]}
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Base of pawn */}
      <cylinderGeometry args={[0.3, 0.4, 0.2, 16]} />
      <meshStandardMaterial
        color={color}
        emissive="yellow"
        emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
      />

      {/* Body of pawn */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.6, 16]} />
        <meshStandardMaterial
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected ? 0.5 : 0}
        />
      </mesh>

      {/* Head of pawn */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected ? 0.5 : 0}
        />
      </mesh>
    </mesh>
  )
}

export default Pawn