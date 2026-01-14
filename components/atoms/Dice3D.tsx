import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Dice3DProps {
  isSpinning: boolean;
  targetNumber: number | null;
}

// Rotaciones para mostrar cada cara del dado
const DICE_ROTATIONS: { [key: number]: [number, number, number] } = {
  1: [0, 0, 0],                    // Frente
  2: [0, -Math.PI / 2, 0],         // Izquierda
  3: [-Math.PI / 2, 0, 0],         // Arriba
  4: [0, Math.PI / 2, 0],          // Derecha
  5: [Math.PI / 2, 0, 0],          // Abajo
  6: [0, Math.PI, 0],              // Atrás
};

export const Dice3D = ({ isSpinning, targetNumber }: Dice3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const spinTimeRef = useRef(0);
  const isSpinningRef = useRef(false);
  const targetRotationRef = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (isSpinning) {
      isSpinningRef.current = true;
      spinTimeRef.current = 0;
    }
  }, [isSpinning]);

  useEffect(() => {
    if (targetNumber !== null && targetNumber >= 1 && targetNumber <= 6) {
      targetRotationRef.current = DICE_ROTATIONS[targetNumber];
    }
  }, [targetNumber]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isSpinningRef.current) {
        spinTimeRef.current += delta;
        
        if (spinTimeRef.current < 2) {
          // Girar rápido durante 2 segundos
          meshRef.current.rotation.x += delta * 10;
          meshRef.current.rotation.y += delta * 8;
          meshRef.current.rotation.z += delta * 6;
        } else {
          // Detener el giro y mostrar la cara correcta
          isSpinningRef.current = false;
          
          // Interpolar suavemente hacia la rotación objetivo
          const [targetX, targetY, targetZ] = targetRotationRef.current;
          meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.1;
          meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.1;
          meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * 0.1;
        }
      }
    }
  });

  // Helper para crear puntos del dado
  const DiceDot = ({ position, rotation = [0, 0, 0] }: any) => (
    <mesh position={position} rotation={rotation}>
      <circleGeometry args={[0.15, 32]} />
      <meshStandardMaterial color="#282a36" />
    </mesh>
  );

  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#bd93f9" 
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      
      {/* CARA 1 (frente - Z positivo) - 1 punto en el centro */}
      <DiceDot position={[0, 0, 1.01]} />

      {/* CARA 2 (izquierda - X negativo) - 2 puntos en diagonal */}
      <DiceDot position={[-1.01, 0.5, -0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[-1.01, -0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* CARA 3 (arriba - Y positivo) - 3 puntos en diagonal */}
      <DiceDot position={[-0.5, 1.01, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0, 1.01, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0.5, 1.01, 0.5]} rotation={[Math.PI / 2, 0, 0]} />

      {/* CARA 4 (derecha - X positivo) - 4 puntos en esquinas */}
      <DiceDot position={[1.01, 0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[1.01, 0.5, -0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[1.01, -0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />
      <DiceDot position={[1.01, -0.5, -0.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* CARA 5 (abajo - Y negativo) - 5 puntos (4 esquinas + centro) */}
      <DiceDot position={[-0.5, -1.01, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0.5, -1.01, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0, -1.01, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[-0.5, -1.01, 0.5]} rotation={[Math.PI / 2, 0, 0]} />
      <DiceDot position={[0.5, -1.01, 0.5]} rotation={[Math.PI / 2, 0, 0]} />

      {/* CARA 6 (atrás - Z negativo) - 6 puntos (2 columnas de 3) */}
      <DiceDot position={[-0.5, 0.5, -1.01]} />
      <DiceDot position={[-0.5, 0, -1.01]} />
      <DiceDot position={[-0.5, -0.5, -1.01]} />
      <DiceDot position={[0.5, 0.5, -1.01]} />
      <DiceDot position={[0.5, 0, -1.01]} />
      <DiceDot position={[0.5, -0.5, -1.01]} />
    </group>
  );
};