interface BackgroundPlaneProps {
    onClick: () => void
}

export const BackgroundPlane = ({ onClick }: BackgroundPlaneProps) => {
    return (
        <mesh
            position={[0, -0.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={onClick}
        >
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    )
}
