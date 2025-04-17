import { useState } from 'react'
import { Position } from '@/types/chess'

function Queen({
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
            {/* Base of queen */}
            <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
            <meshStandardMaterial
                color={color}
                emissive="yellow"
                emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
            />

            {/* Body of queen */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.22, 0.28, 1.0, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive="yellow"
                    emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
                />
            </mesh>

            {/* Crown of queen */}
            <mesh position={[0, 1.35, 0]}>
                <sphereGeometry args={[0.16, 16, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive="yellow"
                    emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
                />
            </mesh>

            {/* Top of queen */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.3, 0.25, 0.2, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive="yellow"
                    emissiveIntensity={isHovered || isSelected || isCaptureable ? 0.5 : 0}
                />
            </mesh>
        </mesh>
    )
}

export default Queen
