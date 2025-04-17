import { useState } from 'react'
import { Position } from '@/types/chess'

function Rook({ 
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

  return (
    <mesh 
      position={[x, y, z]}
      onClick={(e) => {
        e.stopPropagation()
        if (isCaptureable && onCapture) {
          onCapture()
        } else {
          onSelect()
        }
         }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Base of rook */}
      <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive="yellow"
        emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
      />
      
      {/* Body of rook */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.6, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>
      
      {/* Top of rook */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 0.2, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>
    </mesh>
  )
}

export default Rook