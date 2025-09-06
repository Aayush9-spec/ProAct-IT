import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleSystemProps {
  count?: number
  speed?: number
  color?: string
}

export function ParticleSystem({ count = 100, speed = 0.5, color = 'hsl(var(--primary))' }: ParticleSystemProps) {
  const ref = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Positions
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 4
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 4
      positions[i * 3 + 2] = Math.random() * -50 - 10
      
      // Velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = Math.random() * 0.01 + 0.005
    }
    
    return { positions, velocities }
  }, [count, viewport])

  useFrame((state) => {
    if (!ref.current) return
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Update positions based on velocities
      positions[i3] += particles.velocities[i3] * speed
      positions[i3 + 1] += particles.velocities[i3 + 1] * speed
      positions[i3 + 2] += particles.velocities[i3 + 2] * speed
      
      // Add some wave motion
      positions[i3] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.01
      positions[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.8 + i * 0.15) * 0.01
      
      // Reset particles that go too far
      if (positions[i3 + 2] > 10) {
        positions[i3] = (Math.random() - 0.5) * viewport.width * 4
        positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 4
        positions[i3 + 2] = -50
      }
      
      // Wrap around screen edges
      if (positions[i3] > viewport.width * 2) positions[i3] = -viewport.width * 2
      if (positions[i3] < -viewport.width * 2) positions[i3] = viewport.width * 2
      if (positions[i3 + 1] > viewport.height * 2) positions[i3 + 1] = -viewport.height * 2
      if (positions[i3 + 1] < -viewport.height * 2) positions[i3 + 1] = viewport.height * 2
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={particles.positions} frustumCulled={false}>
      <PointMaterial
        color={color}
        size={3}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        alphaTest={0.001}
      />
    </Points>
  )
}