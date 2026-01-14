import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle: string;
  emoji?: string;
}

export const Header = ({ title, subtitle, emoji = '🎲' }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#bd93f9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f8f8f2',
    textAlign: 'center',
    opacity: 0.8,
  },
});