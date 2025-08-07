'use client';

import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Instances } from '@react-three/drei';

const count = 200;
const particles = Array.from({ length: count }, () => ({
  factor: THREE.MathUtils.randInt(20, 100),
  speed: THREE.MathUtils.randFloat(0.01, 0.75),
  xFactor: THREE.MathUtils.randFloat(-5, 5),
  yFactor: THREE.MathUtils.randFloat(-5, 5),
  zFactor: THREE.MathUtils.randFloat(-5, 5),
}));

function Bubbles({ accentColor = '#FF6E3A' }: { accentColor?: string }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const { viewport, mouse } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, (-mouse.x * Math.PI) / 6, 2.75, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, (mouse.y * Math.PI) / 6, 2.75, delta);
    
    for (let i = 0; i < count; ++i) {
      const { factor, speed, xFactor, yFactor, zFactor } = particles[i];
      const s = Math.cos(t * speed) * 2;
      
      const dummy = new THREE.Object3D();
      dummy.position.set(
        (mouse.x * viewport.width) / 2 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1 * speed) * factor) / 10,
        (mouse.y * viewport.height) / 2 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2 * speed) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3 * speed) * factor) / 10
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Instances ref={ref} limit={count} range={count}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={accentColor} roughness={0.2} />
    </Instances>
  );
}

export default function Scene() {
  const [primaryColor, setPrimaryColor] = useState('#0A2540');
  const [accentColor, setAccentColor] = useState('#FF6E3A');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      setPrimaryColor(getComputedStyle(root).getPropertyValue('--color-primary') || '#0A2540');
      setAccentColor(getComputedStyle(root).getPropertyValue('--color-accent') || '#FF6E3A');
    }
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 25]} intensity={2} color={primaryColor} />
      <Bubbles accentColor={accentColor} />
    </Canvas>
  );
}