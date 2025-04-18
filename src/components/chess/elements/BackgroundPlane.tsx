import { Position } from '../state/types'

type BackgroundPlaneProps = {
    onClickAway: () => void
}

export function BackgroundPlane({ onClickAway }: BackgroundPlaneProps) {
    return (
        <mesh
            position={[0, -0.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={onClickAway}
        >
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    )
}
