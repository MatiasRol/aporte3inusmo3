import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, DoubleSide } from 'three';

interface Dice3DProps {
  isSpinning: boolean;
  targetNumber: number | null;
}

/**
 * Rotaciones correctas teniendo en cuenta que:
 * - La cámara mira hacia -Z
 * - Las caras están colocadas manualmente
 */
const DICE_ROTATIONS: Record<number, [number, number, number]> = {
    1: [0, 0, 0],                // Z- (frente real)
    6: [0, Math.PI, 0],          // Z+
  
    2: [0, -Math.PI / 2, 0],     // X+
    5: [0, Math.PI / 2, 0],      // X-
  
    3: [Math.PI / 2, 0, 0],      // Y+
    4: [-Math.PI / 2, 0, 0],     // Y-
  };

export const Dice3D = ({ isSpinning, targetNumber }: Dice3DProps) => {
  const groupRef = useRef<Group>(null);
  const spinTimeRef = useRef(0);
  const isSpinningRef = useRef(false);
  const targetRotationRef = useRef<[number, number, number]>([0, 0, 0]);

  // Iniciar giro
  useEffect(() => {
    if (isSpinning) {
      isSpinningRef.current = true;
      spinTimeRef.current = 0;
    }
  }, [isSpinning]);

  // Actualizar cara objetivo
  useEffect(() => {
    if (targetNumber && targetNumber >= 1 && targetNumber <= 6) {
      targetRotationRef.current = DICE_ROTATIONS[targetNumber];
    }
  }, [targetNumber]);

  // Animación
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isSpinningRef.current) {
      spinTimeRef.current += delta;

      if (spinTimeRef.current < 2) {
        // Giro rápido
        groupRef.current.rotation.x += delta * 10;
        groupRef.current.rotation.y += delta * 8;
        groupRef.current.rotation.z += delta * 6;
      } else {
        // Detener y mostrar cara correcta
        isSpinningRef.current = false;
        const [x, y, z] = targetRotationRef.current;
        groupRef.current.rotation.set(x, y, z);
      }
    }
  });

  // Punto del dado (visible por ambos lados)
  const DiceDot = ({ position, rotation = [0, 0, 0] }: any) => (
    <mesh position={position} rotation={rotation}>
      <circleGeometry args={[0.15, 32]} />
      <meshStandardMaterial color="#282a36" side={DoubleSide} />
    </mesh>
  );

  return (
    <group ref={groupRef}>
      {/* Cubo */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#bd93f9"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* CARA 1 (Z+) */}
      <DiceDot position={[0, 0, 1.01]} />

      {/* CARA 2 (X+) */}
      <DiceDot position={[1.01, -0.5, -0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[1.01, 0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* CARA 3 (Y+) */}
      <DiceDot position={[-0.5, 1.01, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0, 1.01, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0.5, 1.01, 0.5]} rotation={[Math.PI / 2, 0, 0]} />

      {/* CARA 4 (Y-) */}
      <DiceDot position={[-0.5, -1.01, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0.5, -1.01, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[-0.5, -1.01, 0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0.5, -1.01, 0.5]} rotation={[Math.PI / 2, 0, 0]} />

      {/* CARA 5 (X-) */}
      <DiceDot position={[-1.01, -0.5, -0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[-1.01, 0.5, -0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[-1.01, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[-1.01, -0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[-1.01, 0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* CARA 6 (Z-) */}
      <DiceDot position={[-0.5, -0.5, -1.01]} />
      <DiceDot position={[-0.5, 0, -1.01]} />
      <DiceDot position={[-0.5, 0.5, -1.01]} />
      <DiceDot position={[0.5, -0.5, -1.01]} />
      <DiceDot position={[0.5, 0, -1.01]} />
      <DiceDot position={[0.5, 0.5, -1.01]} />
    </group>
  );
};
