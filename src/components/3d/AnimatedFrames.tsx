import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AnimatedFrames() {
  const frames = useRef<THREE.Group>(null);
  const frame1 = useRef<THREE.Group>(null);
  const frame2 = useRef<THREE.Group>(null);
  const frame3 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (frames.current) {
      frames.current.rotation.y = time * 0.1;
    }

    if (frame1.current) {
      frame1.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      frame1.current.rotation.z = Math.cos(time * 0.3) * 0.1;
      frame1.current.position.y = Math.sin(time * 0.4) * 0.5;
    }

    if (frame2.current) {
      frame2.current.rotation.y = Math.cos(time * 0.6) * 0.3;
      frame2.current.rotation.z = Math.sin(time * 0.4) * 0.15;
      frame2.current.position.x = Math.cos(time * 0.3) * 0.8;
    }

    if (frame3.current) {
      frame3.current.rotation.x = Math.cos(time * 0.7) * 0.25;
      frame3.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      frame3.current.position.z = Math.sin(time * 0.2) * 0.3;
    }
  });

  const FrameGeometry = ({ size, thickness }: { size: number; thickness: number }) => (
    <>
      {/* Top */}
      <mesh position={[0, size/2, 0]}>
        <boxGeometry args={[size, thickness, thickness]} />
        <meshPhongMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.6}
          emissive="#1E1B4B"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -size/2, 0]}>
        <boxGeometry args={[size, thickness, thickness]} />
        <meshPhongMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.6}
          emissive="#1E1B4B"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Left */}
      <mesh position={[-size/2, 0, 0]}>
        <boxGeometry args={[thickness, size, thickness]} />
        <meshPhongMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.6}
          emissive="#1E1B4B"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Right */}
      <mesh position={[size/2, 0, 0]}>
        <boxGeometry args={[thickness, size, thickness]} />
        <meshPhongMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.6}
          emissive="#1E1B4B"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );

  return (
    <group ref={frames}>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#4F46E5" />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#7C3AED" />

      {/* Frame 1 - Large background frame */}
      <group ref={frame1} position={[-3, 2, -8]}>
        <FrameGeometry size={4} thickness={0.1} />
      </group>

      {/* Frame 2 - Medium floating frame */}
      <group ref={frame2} position={[4, -1, -6]}>
        <FrameGeometry size={2.5} thickness={0.08} />
      </group>

      {/* Frame 3 - Small accent frame */}
      <group ref={frame3} position={[0, -3, -10]}>
        <FrameGeometry size={1.8} thickness={0.06} />
      </group>

      {/* Additional decorative elements */}
      <mesh position={[-6, 0, -12]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshPhongMaterial 
          color="#7C3AED" 
          transparent 
          opacity={0.4}
          emissive="#3B1D78"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[6, 2, -15]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.5]} />
        <meshPhongMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.5}
          emissive="#1E1B4B"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20 - 10
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshPhongMaterial 
            color="#4F46E5" 
            transparent 
            opacity={0.8}
            emissive="#4F46E5"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}