import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import PagoCard from '../components/PagoCard';
import Header from '../components/Header';
import FilterModal from '../components/FilterModal';
import { useHistorial } from '../hooks/useHistorial';
import { useAlumnos } from '../hooks/useAlumnos';
import { useTheme } from '../theme/useTheme';
import { useAjustesContext } from '../context/AjustesContext';
import { Colores } from '../theme/colores';

export default function HistorialScreen() {
  const { pagos, resumen, filtros, cargarHistorial, aplicarFiltros, handleVaciarHistorial } = useHistorial();
  const { alumnos } = useAlumnos();
  const { ajustes } = useAjustesContext();
  const [filtroVisible, setFiltroVisible] = useState(false);
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial])
  );

  const handleBorrarHistorial = () => {
    const mensaje = filtrosActivos
      ? '¿Eliminar los registros filtrados? El resto del historial se mantendrá.'
      : '¿Estás seguro? Esta acción eliminará todo el historial.';

    Alert.alert('Borrar historial', mensaje, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: handleVaciarHistorial },
    ]);
  };

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
          <Text style={styles.resumenMonto}>{resumen.totalCobrado.toFixed(2)}{ajustes.moneda}</Text>
          <Text style={styles.resumenHoras}>{resumen.totalHoras}h totales</Text>
        </View>
        <View style={styles.resumenBotones}>
          <TouchableOpacity onPress={handleBorrarHistorial}>
            <AntDesign name="delete" size={22} color={c.textoT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botonFiltrar, filtrosActivos && styles.botonFiltrarActivo]}
            onPress={() => setFiltroVisible(true)}
          >
            <AntDesign name="filter" size={16} color={filtrosActivos ? c.accionTexto : c.textoP} />
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
        colors={[`${c.fondo}00`, c.fondo]}
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

const makeStyles = (c: Colores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.fondo,
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
    color: c.textoP,
  },
  resumenHoras: {
    fontSize: 14,
    color: c.textoT,
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
    borderColor: c.borde,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  botonFiltrarActivo: {
    backgroundColor: c.accion,
    borderColor: c.accion,
  },
  textoFiltrar: {
    fontSize: 13,
    color: c.textoP,
    fontWeight: '500',
  },
  textoFiltrarActivo: {
    color: c.accionTexto,
  },
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: c.borde,
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
    color: c.textoT,
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