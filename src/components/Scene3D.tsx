import { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

type Props = { slideIndex: number };

function Orbs({ slideIndex }: Props) {
  const group = useMemo(() => new THREE.Group(), []);
  const color = useMemo(() => {
    const palette = ['#4cc9f0', '#00f5d4', '#f4a261', '#f72585', '#8ecae6'];
    return palette[slideIndex % palette.length];
  }, [slideIndex]);

  useFrame(({ clock }) => {
    group.rotation.y = clock.elapsedTime * 0.08;
    group.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <primitive object={group}>
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const radius = 3 + (slideIndex % 4) * 0.5;
        return (
          <Float key={i} speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 1.4, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.18 + (i % 4) * 0.04, 20, 20]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} metalness={0.2} roughness={0.4} />
            </mesh>
          </Float>
        );
      })}
    </primitive>
  );
}

export default function Scene3D({ slideIndex }: Props) {
  return (
    <div className="scene-root" aria-hidden>
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <color attach="background" args={['#050810']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 6, 5]} intensity={1.2} color="#74c0fc" />
        <pointLight position={[-4, -2, -5]} intensity={0.8} color="#00b4d8" />
        <Stars radius={70} depth={35} count={1300} factor={3} saturation={0} fade speed={0.35} />
        <Orbs slideIndex={slideIndex} />
      </Canvas>
    </div>
  );
}
