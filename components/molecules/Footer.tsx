import { StyleSheet, Text, View } from 'react-native';
import { StatusText } from '../atoms/StatusText';

interface FooterProps {
  isShaking: boolean;
  lastNumber: number | null;
}

export const Footer = ({ isShaking, lastNumber }: FooterProps) => {
  return (
    <View style={styles.footer}>
      <StatusText isShaking={isShaking} />
      {lastNumber !== null && (
        <Text style={styles.result}>
          Último número: {lastNumber}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
  },
  result: {
    fontSize: 16,
    color: '#f8f8f2',
    opacity: 0.7,
  },
});