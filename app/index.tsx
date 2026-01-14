import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Header } from '../components/atoms/Header';
import { Footer } from '../components/molecules/Footer';
import { NumberCircle } from '../components/molecules/NumberCircle';
import { useRandomNumber } from '../lib/hooks/useRandomNumber';
import { useShakeDetector } from '../lib/hooks/useShakeDetector';

export default function HomeScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  
  const { currentNumber, generate } = useRandomNumber({ min: 1, max: 8 });

  const animateShake = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleShake = () => {
    generate();
    animateShake();
  };

  const { isShaking } = useShakeDetector({
    threshold: 1.8,
    cooldown: 800,
    onShake: handleShake
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Shake Random"
        subtitle="Agita tu celular para obtener un número"
        emoji="🎲"
      />

      <NumberCircle 
        number={currentNumber}
        scaleAnim={scaleAnim}
        opacityAnim={opacityAnim}
      />

      <Footer 
        isShaking={isShaking}
        lastNumber={currentNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
});