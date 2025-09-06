import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface DataPoint {
  position: [number, number, number]
  value: number
  color: string
  label: string
}

export function DashboardVisualization() {
  const groupRef = useRef<THREE.Group>(null)
  const chartsRef = useRef<THREE.Group>(null)
  
  const dataPoints = useMemo(() => {
    const points: DataPoint[] = [
      { position: [-3, 2, 0], value: 85, color: 'hsl(var(--primary))', label: 'Efficiency' },
      { position: [-1, 1.5, 0], value: 92, color: 'hsl(var(--accent))', label: 'Uptime' },
      { position: [1, 2.2, 0], value: 78, color: 'hsl(var(--warning))', label: 'Response' },
      { position: [3, 1.8, 0], value: 95, color: 'hsl(var(--success))', label: 'Quality' }
    ]
    return points
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }

    if (chartsRef.current) {
      chartsRef.current.children.forEach((child, i) => {
        const dataPoint = dataPoints[i]
        if (dataPoint) {
          child.position.y = dataPoint.position[1] + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.2
          child.rotation.y = state.clock.elapsedTime * 0.5 + i
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main dashboard frame */}
      <Box args={[8, 5, 0.2]} position={[0, 0, -1]}>
        <meshStandardMaterial 
          color="hsl(var(--card))" 
          opacity={0.9} 
          transparent 
        />
      </Box>

      {/* Data visualization bars */}
      <group ref={chartsRef}>
        {dataPoints.map((point, i) => (
          <group key={i} position={point.position}>
            {/* Bar chart column */}
            <Cylinder 
              args={[0.3, 0.3, point.value / 50]} 
              position={[0, 0, 0]}
            >
              <meshStandardMaterial 
                color={point.color} 
                opacity={0.8} 
                transparent 
              />
            </Cylinder>
            
            {/* Floating indicator */}
            <Sphere args={[0.2]} position={[0, point.value / 50 + 0.5, 0]}>
              <meshStandardMaterial 
                color={point.color} 
                emissive={point.color}
                emissiveIntensity={0.3}
              />
            </Sphere>
            
            {/* Base platform */}
            <Box args={[0.8, 0.1, 0.8]} position={[0, -0.3, 0]}>
              <meshStandardMaterial 
                color="hsl(var(--muted))" 
                opacity={0.6} 
                transparent 
              />
            </Box>
          </group>
        ))}
      </group>

      {/* Connecting lines */}
      {dataPoints.map((_, i) => {
        if (i < dataPoints.length - 1) {
          const start = dataPoints[i].position
          const end = dataPoints[i + 1].position
          return (
            <Box 
              key={`line-${i}`}
              args={[Math.abs(end[0] - start[0]), 0.05, 0.05]} 
              position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, 0]}
            >
              <meshStandardMaterial 
                color="hsl(var(--primary))" 
                opacity={0.6} 
                transparent 
              />
            </Box>
          )
        }
        return null
      })}

      {/* Rotating accent elements */}
      <Sphere args={[0.1]} position={[4, 3, 1]}>
        <meshStandardMaterial 
          color="hsl(var(--accent))" 
          emissive="hsl(var(--accent))"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      <Sphere args={[0.15]} position={[-4, -2, 1.5]}>
        <meshStandardMaterial 
          color="hsl(var(--warning))" 
          emissive="hsl(var(--warning))"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </group>
  )
}