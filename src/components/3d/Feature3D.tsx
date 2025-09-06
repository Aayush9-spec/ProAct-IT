import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface Feature3DProps {
  position: [number, number, number]
  icon: 'automation' | 'analytics' | 'security' | 'integration'
  isActive: boolean
}

export function Feature3D({ position, icon, isActive }: Feature3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const iconRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      
      if (isActive) {
        groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      }
    }

    if (iconRef.current) {
      iconRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  const getIconGeometry = () => {
    switch (icon) {
      case 'automation':
        return (
          <group ref={iconRef}>
            <Box args={[0.8, 0.2, 0.2]} position={[0, 0.3, 0]}>
              <meshStandardMaterial color="hsl(var(--primary))" />
            </Box>
            <Box args={[0.2, 0.8, 0.2]} position={[0, -0.3, 0]}>
              <meshStandardMaterial color="hsl(var(--primary))" />
            </Box>
            <Sphere args={[0.3]} position={[0, 0, 0]}>
              <meshStandardMaterial color="hsl(var(--accent))" />
            </Sphere>
          </group>
        )
      case 'analytics':
        return (
          <group ref={iconRef}>
            {[...Array(5)].map((_, i) => (
              <Box 
                key={i}
                args={[0.2, 0.2 + i * 0.2, 0.2]} 
                position={[-1 + i * 0.5, 0, 0]}
              >
                <meshStandardMaterial color="hsl(var(--primary))" />
              </Box>
            ))}
          </group>
        )
      case 'security':
        return (
          <group ref={iconRef}>
            <Sphere args={[0.6]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="hsl(var(--primary))" 
                wireframe
              />
            </Sphere>
            <Box args={[0.4, 0.4, 0.4]} position={[0, 0, 0]}>
              <meshStandardMaterial color="hsl(var(--accent))" />
            </Box>
          </group>
        )
      case 'integration':
        return (
          <group ref={iconRef}>
            <Box args={[0.3, 0.3, 0.3]} position={[-0.5, 0, 0]}>
              <meshStandardMaterial color="hsl(var(--primary))" />
            </Box>
            <Box args={[0.3, 0.3, 0.3]} position={[0.5, 0, 0]}>
              <meshStandardMaterial color="hsl(var(--accent))" />
            </Box>
            <Box args={[0.8, 0.1, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial color="hsl(var(--muted-foreground))" />
            </Box>
          </group>
        )
    }
  }

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[1.2]}>
        <meshStandardMaterial 
          color="hsl(var(--background))"
          opacity={0.3}
          transparent
        />
      </Sphere>
      {getIconGeometry()}
    </group>
  )
}