import { useState, useMemo, useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AlumnoCard from '../components/AlumnoCard';
import AddButton from '../components/AddButton';
import FormularioAlumno from '../components/FormAlumno';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';

import { useAlumnos } from '../hooks/useAlumnos';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Alumno } from '../type/types';
import { useTranslation } from 'react-i18next';



export default function CalendarioScreen() {

    const c = useTheme();
    const { t } = useTranslation();
    const styles = useMemo(() => makeStyles(c), [c]);
    const scrollY = useRef(new Animated.Value(0)).current;


    return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
    
            {/* Cabecera minimalista */}
            <Header title="Calendario" scrollY={scrollY} />
    
            <ScrollView>
              
            </ScrollView>
    
            
    
          </SafeAreaView>
        </SafeAreaProvider>
      );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.fondo,
    width: '100%',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 140,
  },
  scrollVacio: {
  flexGrow: 1,
  alignItems: 'center',
  paddingVertical: 10,
  paddingBottom: 140,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
});