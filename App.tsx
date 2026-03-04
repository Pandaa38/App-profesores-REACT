import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // IMPORTANTE AÑADIR ESTO

import AlumnoCard from './src/components/AlumnoCard';
import AddButton from './src/components/AddButton';

import FormularioAlumno from './src/components/FormAlumno';
import { useAlumnos } from './src/hooks/useAlumnos';

export default function App() {
  const [formVisible, setFormVisible] = useState(false);
  const { alumnos, handleCobrar, handleAddHoras, handleEliminar, handleAñadirAlumno } = useAlumnos();

  const onGuardar = (nombre: string, precioPorHora: number) => {
    handleAñadirAlumno(nombre, precioPorHora);
    setFormVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Cabecera minimalista */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Menú</Text>
        <Text style={styles.headerTitle}>Mis Alumnos</Text>
        <Text style={styles.headerText}>Ajustes</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {alumnos.map(alumno => (
          <AlumnoCard
            key={alumno.id}
            alumno={alumno}
            onAddHoras={handleAddHoras}
            onCobrar={handleCobrar}
            onEliminar={handleEliminar}
          />
        ))}
      </ScrollView>

      {/* DEGRADADO INFERIOR (Efecto Tricount) */}
      <LinearGradient
        colors={['rgba(249, 250, 251, 0)', 'rgba(249, 250, 251, 1)']} // Funde hacia el color de fondo
        style={styles.gradientBottom}
        pointerEvents="none" // FUNDAMENTAL: Permite hacer clic "a través" del degradado
      />

      {/* BOTÓN FLOTANTE */}
      <View style={styles.fabContainer}>
        <AddButton onPress={() => setFormVisible(true)} />
      </View>

      <FormularioAlumno
        visible={formVisible}
        onGuardar={onGuardar}
        onCancelar={() => setFormVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Un gris muy, muy claro (casi blanco) elegante
    width: '100%',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#F9FAFB', // Mismo fondo para que se fusione
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 1,
    paddingTop: 10,
  },
  headerText: {
    color: '#9CA3AF', // Gris suave para acciones secundarias
    fontWeight: '500',
    fontSize: 14,
  },
  headerTitle: {
    color: '#111827', // Negro pizarra para el título
    fontWeight: 'bold',
    fontSize: 18,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 140, // Mucho espacio para que la última tarjeta pase el botón flotante
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120, // Altura del difuminado
  },
  fabContainer: {
    position: 'absolute',
    bottom: 40, // Altura del botón desde abajo
    alignSelf: 'center',
    zIndex: 10,
  },
});