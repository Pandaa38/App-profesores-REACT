import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import Header from '../components/Header';
import { useAjustesContext } from '../context/AjustesContext';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Fonts } from '../theme/fonts';
import { Tema, Moneda } from '../hooks/useAjustes';

const mostrarProximamente = (funcion: string) => {
  Alert.alert(
    'Próximamente',
    `${funcion} estará disponible en una próxima versión.`,
    [{ text: 'OK' }]
  );
};

export default function AjustesScreen() {
  const { ajustes, actualizarTema, actualizarMoneda } = useAjustesContext();
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const temas: { label: string; value: Tema }[] = [
    { label: 'Claro', value: 'claro' },
    { label: 'Oscuro', value: 'oscuro' },
    { label: 'Sistema', value: 'sistema' },
  ];

  const monedas: { label: string; value: Moneda }[] = [
    { label: '€', value: '€' },
    { label: '$', value: '$' },
    { label: '£', value: '£' },
  ];

  // const duraciones: { label: string; value: Duracion }[] = [
  //   { label: '0.5h', value: 0.5 },
  //   { label: '1h', value: 1 },
  //   { label: '1.5h', value: 1.5 },
  //   { label: '2h', value: 2 },
  // ];

  return (
    <SafeAreaView style={styles.container}>

      <Header title="Ajustes" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* APARIENCIA */}
        <Text style={styles.seccionTitulo}>APARIENCIA</Text>
        <View style={styles.bloque}>
          <Text style={styles.opcionLabel}>Tema</Text>
          <View style={styles.chips}>
            {temas.map(t => (
              <TouchableOpacity
                key={t.value}
                style={[styles.chip, ajustes.tema === t.value && styles.chipActivo]}
                onPress={() => actualizarTema(t.value)}
              >
                <Text style={[styles.chipTexto, ajustes.tema === t.value && styles.chipTextoActivo]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PREFERENCIAS */}
        <Text style={styles.seccionTitulo}>PREFERENCIAS</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>Moneda</Text>
            <View style={styles.chips}>
              {monedas.map(m => (
                <TouchableOpacity
                  key={m.value}
                  style={[styles.chip, ajustes.moneda === m.value && styles.chipActivo]}
                  onPress={() => actualizarMoneda(m.value)}
                >
                  <Text style={[styles.chipTexto, ajustes.moneda === m.value && styles.chipTextoActivo]}>
                    {m.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* <View style={styles.divisor} />
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>Duración por defecto</Text>
            <View style={styles.chips}>
              {duraciones.map(d => (
                <TouchableOpacity
                  key={d.value}
                  style={[styles.chip, ajustes.duracion === d.value && styles.chipActivo]}
                  onPress={() => actualizarDuracion(d.value)}
                >
                  <Text style={[styles.chipTexto, ajustes.duracion === d.value && styles.chipTextoActivo]}>
                    {d.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}
        </View>

        {/* IDIOMA */}
        <Text style={styles.seccionTitulo}>IDIOMA</Text>
        <View style={styles.bloque}>
          <TouchableOpacity
            style={styles.botonProximamente}
            onPress={() => mostrarProximamente('Selección de idioma')}
          >
            <Ionicons name="language-outline" size={20} color={c.textoP} />
            <Text style={styles.botonProximamenteTexto}>Seleccionar idioma</Text>
            <Text style={styles.proximamenteTag}>Próximamente</Text>
          </TouchableOpacity>
        </View>

        {/* DATOS */}
        <Text style={styles.seccionTitulo}>DATOS</Text>
        <View style={styles.bloque}>
          <TouchableOpacity
            style={styles.botonProximamente}
            onPress={() => mostrarProximamente('Exportar CSV')}
          >
            <AntDesign name="export" size={20} color={c.textoP} />
            <Text style={styles.botonProximamenteTexto}>Exportar CSV</Text>
            <Text style={styles.proximamenteTag}>Próximamente</Text>
          </TouchableOpacity>
        </View>

        {/* ACERCA DE */}
        <Text style={styles.seccionTitulo}>ACERCA DE</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>Versión</Text>
            <Text style={styles.versionTexto}>
              {Constants.expoConfig?.version ?? '1.0.0'}
            </Text>
          </View>
        </View>

      </ScrollView>

      <LinearGradient
        colors={[`${c.fondo}00`, c.fondo]}
        style={styles.gradientBottom}
        pointerEvents="none"
      />

    </SafeAreaView>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.fondo,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
    gap: 8,
  },
  seccionTitulo: {
    fontSize: 12,
    fontFamily: Fonts.semibold,
    color: c.textoT,
    marginTop: 16,
    marginLeft: 4,
    letterSpacing: 0.8,
  },
  bloque: {
    backgroundColor: c.tarjeta,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },
  opcionFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcionLabel: {
    fontSize: 15,
    color: c.textoP,
    fontFamily: Fonts.medium,
  },
  chips: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.borde,
    backgroundColor: c.tarjeta,
  },
  chipActivo: {
    backgroundColor: c.accion,
    borderColor: c.accion,
  },
  chipTexto: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: c.textoS,
  },
  chipTextoActivo: {
    fontFamily: Fonts.medium,
    color: c.accionTexto,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: c.borde,
  },
  botonProximamente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botonProximamenteTexto: {
    flex: 1,
    fontSize: 15,
    color: c.textoP,
    fontFamily: Fonts.medium,
  },
  proximamenteTag: {
    fontSize: 12,
    color: c.textoT,
    fontStyle: 'italic',
  },
  versionTexto: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: c.textoT,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});