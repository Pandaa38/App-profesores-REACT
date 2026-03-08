import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import PagoCard from '../components/PagoCard';
import { useHistorial } from '../hooks/useHistorial';

export default function HistorialScreen() {
  const { pagos, resumen, cargarHistorial } = useHistorial();

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial])
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial</Text>
      </View>

      {/* Resumen total */}
      <View style={styles.resumenContainer}>
        <Text style={styles.resumenMonto}>{resumen.totalCobrado.toFixed(2)}€</Text>
        <Text style={styles.resumenHoras}>{resumen.totalHoras}h totales</Text>
      </View>

      <View style={styles.separador} />

      {/* Lista de pagos */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {pagos.length === 0 ? (
          <Text style={styles.sinHistorial}>Sin historial</Text>
        ) : (
          pagos.map(pago => (
            <PagoCard key={pago.id} pago={pago} />
          ))
        )}
      </ScrollView>

      {/* Difuminado inferior */}
      <LinearGradient
        colors={['rgba(249, 250, 251, 0)', 'rgba(249, 250, 251, 1)']}
        style={styles.gradientBottom}
        pointerEvents="none"
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    //flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resumenContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  resumenMonto: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
  },
  resumenHoras: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  sinHistorial: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 40,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 140,  // ← igual que AlumnosScreen
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    },
})