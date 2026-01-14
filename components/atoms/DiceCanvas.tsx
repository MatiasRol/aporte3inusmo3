import { Canvas } from '@react-three/fiber';
import { StyleSheet, View } from 'react-native';
import { Dice3D } from './Dice3D';

interface DiceCanvasProps {
  isSpinning: boolean;
  currentNumber: number | null;
}

export const DiceCanvas = ({ isSpinning, currentNumber }: DiceCanvasProps) => {
  return (
    <View style={styles.canvasContainer}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Dice3D isSpinning={isSpinning} targetNumber={currentNumber} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  canvasContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});