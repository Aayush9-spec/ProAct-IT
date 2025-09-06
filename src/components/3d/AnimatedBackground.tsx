import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import * as THREE from 'three'

export function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime
      }
    }
  })

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Create animated gradient
      float wave1 = sin(uv.x * 10.0 + uTime * 0.5) * 0.1;
      float wave2 = cos(uv.y * 8.0 + uTime * 0.3) * 0.1;
      
      vec3 color1 = vec3(0.2, 0.4, 1.0); // Primary blue
      vec3 color2 = vec3(0.8, 0.2, 1.0); // Accent purple
      vec3 color3 = vec3(0.1, 0.9, 0.8); // Teal
      
      float mixer = sin(uv.x + uv.y + uTime * 0.2) * 0.5 + 0.5;
      vec3 finalColor = mix(color1, color2, mixer + wave1 + wave2);
      finalColor = mix(finalColor, color3, sin(uTime * 0.1) * 0.2 + 0.1);
      
      gl_FragColor = vec4(finalColor, 0.1);
    }
  `

  const uniforms = {
    uTime: { value: 0 }
  }

  return (
    <Plane ref={meshRef} args={[50, 50]} position={[0, 0, -15]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </Plane>
  )
}