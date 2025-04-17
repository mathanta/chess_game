import { useState } from 'react'
import { Position } from '@/types/chess'

function Knight({ 
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
      {/* Base */}
      <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive="yellow"
        emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
      />
      
      {/* Neck */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>
      
      {/* Head (angled) */}
      <mesh position={[0, 0.8, 0.1]} rotation={[Math.PI * 0.15, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.9, 0.2]}>
        <boxGeometry args={[0.2, 0.2, 0.3]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>

      {/* Ears or top detail */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive="yellow"
          emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
        />
      </mesh>
    </mesh>
  )
}

export default Knight
