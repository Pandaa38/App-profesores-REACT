import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import Constants from 'expo-constants';
import AntDesign from '@expo/vector-icons/AntDesign';

import Header from '../components/Header';
import { useAjustesContext } from '../context/AjustesContext';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Fonts } from '../theme/fonts';
import { Tema, Moneda, Idioma } from '../hooks/useAjustes';
import { useTranslation } from 'react-i18next';

export default function AjustesScreen() {
  const { ajustes, actualizarTema, actualizarMoneda, actualizarIdioma } = useAjustesContext();
  const c = useTheme();
  const colorScheme = useColorScheme();
  const esOscuro = ajustes.tema === 'oscuro' || (ajustes.tema === 'sistema' && colorScheme === 'dark');
  const { t } = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);

  const appName = Constants.expoConfig?.name ?? 'TutorApp';

  const mostrarProximamente = (funcion: string) => {
    Alert.alert(
      t('ajustes.proximamente'),
      t('ajustes.proximamenteMsg', { funcion }),
      [{ text: 'OK' }]
    );
  };

  const temas: { label: string; value: Tema }[] = [
    { label: t('ajustes.temaClaro'), value: 'claro' },
    { label: t('ajustes.temaOscuro'), value: 'oscuro' },
    { label: t('ajustes.temaSistema'), value: 'sistema' },
  ];

  const monedas: { label: string; value: Moneda }[] = [
    { label: '€', value: '€' },
    { label: '$', value: '$' },
    { label: '£', value: '£' },
  ];

  const idiomas: { label: string; value: Idioma }[] = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' },
  ];

  // const duraciones: { label: string; value: Duracion }[] = [
  //   { label: '0.5h', value: 0.5 },
  //   { label: '1h', value: 1 },
  //   { label: '1.5h', value: 1.5 },
  //   { label: '2h', value: 2 },
  // ];

  return (
    <SafeAreaView style={styles.container}>

      <Header title={t('ajustes.titulo')} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* APARIENCIA */}
        <Text style={styles.seccionTitulo}>{t('ajustes.apariencia')}</Text>
        <View style={styles.bloque}>
          <Text style={styles.opcionLabel}>{t('ajustes.tema')}</Text>
          <View style={styles.chips}>
            {temas.map(tema => (
              <TouchableOpacity
                key={tema.value}
                style={[styles.chip, ajustes.tema === tema.value && styles.chipActivo]}
                onPress={() => actualizarTema(tema.value)}
              >
                <Text style={[styles.chipTexto, ajustes.tema === tema.value && styles.chipTextoActivo]}>
                  {tema.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PREFERENCIAS */}
        <Text style={styles.seccionTitulo}>{t('ajustes.preferencias')}</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>{t('ajustes.moneda')}</Text>
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
        <Text style={styles.seccionTitulo}>{t('ajustes.idioma')}</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>{t('ajustes.seleccionarIdioma')}</Text>
            <View style={styles.chips}>
              {idiomas.map(i => (
                <TouchableOpacity
                  key={i.value}
                  style={[styles.chip, ajustes.idioma === i.value && styles.chipActivo]}
                  onPress={() => actualizarIdioma(i.value)}
                >
                  <Text style={[styles.chipTexto, ajustes.idioma === i.value && styles.chipTextoActivo]}>
                    {i.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* DATOS */}
        <Text style={styles.seccionTitulo}>{t('ajustes.datos')}</Text>
        <View style={styles.bloque}>
          <TouchableOpacity
            style={styles.botonProximamente}
            onPress={() => mostrarProximamente(t('ajustes.exportarCSV'))}
          >
            <AntDesign name="export" size={20} color={c.textoP} />
            <Text style={styles.botonProximamenteTexto}>{t('ajustes.exportarCSV')}</Text>
            <Text style={styles.proximamenteTag}>{t('ajustes.proximamente')}</Text>
          </TouchableOpacity>
        </View>
        
        {/* ACERCA DE */}
        <Text style={styles.seccionTitulo}>{t('ajustes.acercaDe')}</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>{t('ajustes.version')}</Text>
            <Text style={styles.versionTexto}>
              {Constants.expoConfig?.version ?? '1.0.0'}
            </Text>
          </View>
        </View>

        {/* LOGO */}
        <View style={styles.logoFooter}>
          <View
            style={[
              styles.logoMedallon,
              esOscuro ? styles.logoMedallonOscuro : styles.logoMedallonClaro,
            ]}
          >
            <Image
              style={styles.logoImagen}
              source={require('../../assets/adaptive-icon.png')}
            />
          </View>
          <Text style={styles.logoTexto}>{appName}</Text>
        </View>

      </ScrollView>
      
      {/*
      <LinearGradient
        colors={[`${c.fondo}00`, c.fondo]}
        style={styles.gradientBottom}
        pointerEvents="none"
      />
      */}

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
    minWidth: 68,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.borde,
    backgroundColor: c.tarjeta,
    alignItems: 'center',
  },
  chipActivo: {
    backgroundColor: c.accion,
    borderColor: c.accion,
  },
  chipTexto: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: c.textoS,
    textAlign: 'center',
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
  logoFooter: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 50,
    gap: 8,
  },
  logoMedallon: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: c.tarjeta,
    borderWidth: 1,
    borderColor: c.borde,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  logoMedallonClaro: {
    shadowOpacity: 0.12,
    elevation: 5,
  },
  logoMedallonOscuro: {
    shadowOpacity: 0.28,
    elevation: 2,
    borderColor: c.textoT,
  },
  logoImagen: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  logoTexto: {
    fontSize: 12,
    color: c.textoT,
    fontFamily: Fonts.medium,
    letterSpacing: 0.4,
  },
});