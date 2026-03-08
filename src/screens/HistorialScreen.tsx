import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import PagoCard from '../components/PagoCard';
import Header from '../components/Header';
import FilterModal from '../components/FilterModal';
import { useHistorial } from '../hooks/useHistorial';
import { useAlumnos } from '../hooks/useAlumnos';

export default function HistorialScreen() {
  const { pagos, resumen, filtros, cargarHistorial, aplicarFiltros, handleVaciarHistorial } = useHistorial();
  const { alumnos } = useAlumnos();
  const [filtroVisible, setFiltroVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial])
  );

  const handleBorrarHistorial = () => {
    Alert.alert(
      'Borrar historial',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', style: 'destructive', onPress: handleVaciarHistorial },
      ]
    );
  };

  // Si hay filtros activos, el icono de filtrar se marca en negro
  const filtrosActivos =
    filtros.periodo !== 'todos' ||
    filtros.alumnoId !== null ||
    filtros.orden !== 'recientes';

  return (
    <SafeAreaView style={styles.container}>

      <Header title="Historial" />

      {/* Resumen total + botones */}
      <View style={styles.resumenContainer}>
        <View style={styles.resumenTextos}>
          <Text style={styles.resumenMonto}>{resumen.totalCobrado.toFixed(2)}€</Text>
          <Text style={styles.resumenHoras}>{resumen.totalHoras}h totales</Text>
        </View>
        <View style={styles.resumenBotones}>
          <TouchableOpacity onPress={handleBorrarHistorial}>
            <AntDesign name="delete" size={22} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botonFiltrar, filtrosActivos && styles.botonFiltrarActivo]}
            onPress={() => setFiltroVisible(true)}
          >
            <AntDesign name="filter" size={16} color={filtrosActivos ? '#fff' : '#111827'} />
            <Text style={[styles.textoFiltrar, filtrosActivos && styles.textoFiltrarActivo]}>
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>
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

      <LinearGradient
        colors={['rgba(249, 250, 251, 0)', 'rgba(249, 250, 251, 1)']}
        style={styles.gradientBottom}
        pointerEvents="none"
      />

      <FilterModal
        visible={filtroVisible}
        filtros={filtros}
        alumnos={alumnos}
        onAplicar={aplicarFiltros}
        onCerrar={() => setFiltroVisible(false)}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  resumenContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumenTextos: {
    gap: 2,
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
  resumenBotones: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 10,
  },
  botonFiltrar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  botonFiltrarActivo: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  textoFiltrar: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
  textoFiltrarActivo: {
    color: '#fff',
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
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 140,
  },
  sinHistorial: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 40,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
});