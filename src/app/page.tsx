'use client'
import { Canvas } from '@react-three/fiber'
import Board from '@/components/chess/Board'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full h-[800px] border-4 border-black-500">
        <Canvas 
          camera={{ 
            position: [-8, 4, -3],
            fov: 60,
            near: 0.1,
            far: 1000
          }}
        >
          <ambientLight intensity={0.8} />
          <Board />
        </Canvas>
      </div>
    </main>
  )
}