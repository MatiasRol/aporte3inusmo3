import { StyleSheet, Text } from 'react-native';

interface NumberDisplayProps {
  number: number | null;
}

export const NumberDisplay = ({ number }: NumberDisplayProps) => {
  return (
    <Text style={styles.number}>
      {number === null ? '?' : number}
    </Text>
  );
};

const styles = StyleSheet.create({
  number: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#50fa7b',
  },
});