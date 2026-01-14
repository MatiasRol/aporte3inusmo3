import { Animated, StyleSheet } from 'react-native';
import { NumberDisplay } from '../atoms/NumberDisplay';

interface NumberCircleProps {
  number: number | null;
  scaleAnim: Animated.Value;
  opacityAnim: Animated.Value;
}

export const NumberCircle = ({ number, scaleAnim, opacityAnim }: NumberCircleProps) => {
  return (
    <Animated.View 
      style={[
        styles.numberContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <NumberDisplay number={number} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#44475a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#bd93f9',
    shadowColor: '#bd93f9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
});