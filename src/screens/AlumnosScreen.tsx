import { useState, useMemo, useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AlumnoCard from '../components/AlumnoCard';
import AddButton from '../components/AddButton';
import FormularioAlumno from '../components/FormAlumno';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import ScreenLayout from '../components/ScreenLayout';

import { useAlumnos } from '../hooks/useAlumnos';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Alumno } from '../type/types';
import { useTranslation } from 'react-i18next';

export default function AlumnosScreen() {
  const [formVisible, setFormVisible] = useState(false);
  const [alumnoEditar, setAlumnoEditar] = useState<Alumno | undefined>(undefined);
  const { alumnos, handleCobrar, handleAddHoras, handleEliminar, handleAñadirAlumno, handleEditarAlumno } = useAlumnos();

  const c = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onGuardar = (nombre: string, precioPorHora: number, horasPendientes?: number) => {
    if (alumnoEditar) {
      handleEditarAlumno(alumnoEditar, nombre, precioPorHora, horasPendientes ?? alumnoEditar.horasPendientes);
    } else {
      handleAñadirAlumno(nombre, precioPorHora);
    }
    setAlumnoEditar(undefined);
    setFormVisible(false);
  };

  const onEditar = (alumno: Alumno) => {
    setAlumnoEditar(alumno);
    setFormVisible(true);
  };

  return (
    <SafeAreaProvider>
      <ScreenLayout
        title={t('alumnos.titulo')}
        scrollY={scrollY}
        contentContainerStyle={[styles.scrollContent, alumnos.length === 0 && styles.scrollVacio]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        floatingContent={
          <>
            <View style={styles.fabContainer}>
              <AddButton onPress={() => setFormVisible(true)} />
            </View>
            <FormularioAlumno
              visible={formVisible}
              alumnoEditar={alumnoEditar}
              onGuardar={onGuardar}
              onCancelar={() => {
                setAlumnoEditar(undefined);
                setFormVisible(false);
              }}
            />
          </>
        }
      >
        {alumnos.length === 0 ? (
          <EmptyState />
        ) : (
          alumnos.map(alumno => (
            <AlumnoCard
              key={alumno.id}
              alumno={alumno}
              onAddHoras={handleAddHoras}
              onCobrar={handleCobrar}
              onEliminar={handleEliminar}
              onEditar={onEditar}
            />
          ))
        )}
      </ScreenLayout>
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