import { StyleSheet, Text } from 'react-native';

interface StatusTextProps {
  isShaking: boolean;
}

export const StatusText = ({ isShaking }: StatusTextProps) => {
  return (
    <Text style={styles.instruction}>
      {isShaking ? '¡Agitando! 📳' : '¡Agita tu teléfono! 📱'}
    </Text>
  );
};

const styles = StyleSheet.create({
  instruction: {
    fontSize: 20,
    color: '#8be9fd',
    fontWeight: '600',
    marginBottom: 12,
  },
});