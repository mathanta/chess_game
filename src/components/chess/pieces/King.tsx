import { useState } from 'react'
import { Position } from '@/types/chess'

function King({ 
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
      {/* Base of king */}
      <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive="yellow"
        emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
      />
      
      {/* Body of king */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.2, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>

      {/* Cross of king */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>
    </mesh>
  )
}

export default King
