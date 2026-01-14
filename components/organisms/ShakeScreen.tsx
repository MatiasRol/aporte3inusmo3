import { StyleSheet, View, Animated } from 'react-native';
import { useRef, useState } from 'react';
import { Header } from '../atoms/Header';
import { Footer } from '../molecules/Footer';
import { DiceCanvas } from '../atoms/DiceCanvas';
import { useShakeDetector } from '../../lib/hooks/useShakeDetector';
import { useRandomNumber } from '../../lib/hooks/useRandomNumber';

export const ShakeScreen = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);
  
  const { currentNumber, generate } = useRandomNumber({ min: 1, max: 6 });

  const animateShake = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
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
    const newNumber = generate();
    animateShake();
    
    // Mostrar el número después de 2 segundos (cuando termine la animación del dado)
    setTimeout(() => {
      setDisplayNumber(newNumber);
    }, 2000);
  };

  const { isShaking } = useShakeDetector({
    threshold: 1.8,
    cooldown: 2500, // Aumentado para dar tiempo a la animación completa
    onShake: handleShake
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Shake Random"
        subtitle="Agita tu celular para tirar el dado"
        emoji="🎲"
      />

      <Animated.View 
        style={[
          styles.diceWrapper,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.glowEffect}>
          <DiceCanvas 
            isSpinning={isShaking}
            currentNumber={currentNumber}
          />
        </View>
      </Animated.View>

      <Footer 
        isShaking={isShaking}
        lastNumber={displayNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  diceWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowEffect: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#44475a',
    shadowColor: '#bd93f9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 15,
  },
});