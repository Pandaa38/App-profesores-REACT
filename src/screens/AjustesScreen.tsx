import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AjustesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>Ajustes (próximamente)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});