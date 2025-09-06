import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, ReactNode } from 'react'

interface Scene3DProps {
  children: ReactNode
  className?: string
  enableControls?: boolean
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
}

export function Scene3D({ 
  children, 
  className = "absolute inset-0 -z-10", 
  enableControls = false,
  camera = { position: [0, 0, 10], fov: 75 }
}: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera 
          makeDefault 
          position={camera.position} 
          fov={camera.fov}
        />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {enableControls && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
        
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}