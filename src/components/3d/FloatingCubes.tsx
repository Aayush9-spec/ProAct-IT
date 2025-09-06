import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, Box } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingShape {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  type: 'cube' | 'sphere'
}

export function FloatingCubes() {
  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  
  const shapes = useMemo(() => {
    const shapes: FloatingShape[] = []
    for (let i = 0; i < 15; i++) {
      shapes.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          -Math.random() * 10 - 5
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        type: Math.random() > 0.5 ? 'cube' : 'sphere'
      })
    }
    return shapes
  }, [viewport])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      groupRef.current.children.forEach((child, i) => {
        const shape = shapes[i]
        child.rotation.x += shape.speed
        child.rotation.y += shape.speed * 0.8
        child.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime * shape.speed * 10) * 2
      })
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <group key={i} position={shape.position} scale={shape.scale}>
          {shape.type === 'cube' ? (
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial 
                color="hsl(var(--primary))"
                opacity={0.6}
                transparent
                wireframe
              />
            </Box>
          ) : (
            <Sphere args={[0.8]}>
              <meshStandardMaterial 
                color="hsl(var(--accent))"
                opacity={0.4}
                transparent
              />
            </Sphere>
          )}
        </group>
      ))}
    </group>
  )
}