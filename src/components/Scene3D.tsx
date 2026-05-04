import { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

type Props = { slideIndex: number };

function Ribbons({ slideIndex }: Props) {
  const group = useMemo(() => new THREE.Group(), []);
  const palette = ['#3b6fb8', '#2b84bf', '#4e73a9', '#2f5d95', '#3f7aaa'];
  const color = palette[slideIndex % palette.length];

  useFrame(({ clock }) => {
    group.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.08;
    group.rotation.y = clock.elapsedTime * 0.03;
  });

  return (
    <primitive object={group}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={0.6} rotationIntensity={0.15} floatIntensity={0.45}>
          <mesh position={[Math.cos(i) * 3.2, (i - 3.5) * 0.55, Math.sin(i * 1.2) * 1.2]}>
            <torusGeometry args={[1.2 + i * 0.15, 0.025, 16, 64]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08} transparent opacity={0.35} />
          </mesh>
        </Float>
      ))}
    </primitive>
  );
}

export default function Scene3D({ slideIndex }: Props) {
  return (
    <div className="scene-root" aria-hidden>
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }}>
        <color attach="background" args={['#f3f7fe']} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 4, 4]} intensity={0.6} color="#6a8ec0" />
        <pointLight position={[-4, -3, -4]} intensity={0.24} color="#75a6d8" />
        <Ribbons slideIndex={slideIndex} />
      </Canvas>
    </div>
  );
}
