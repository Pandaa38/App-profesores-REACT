import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


import { Alumno } from './type/types';
import AlumnoCard from './src/components/AlumnoCard';

import { useState } from 'react';

const listaAlumnos: Alumno[] = [
  {
    id: '1', //cambiar para mejor sql?
    nombre: "Bea",
    precioPorHora: 15,
    horasPendientes: 2
  },
  {
    id: '2',
    nombre: "Erik",
    precioPorHora: 18,
    horasPendientes: 10
  },
  {
    id: '3',
    nombre: "Daniela",
    precioPorHora: 18,
    horasPendientes: 10
  },
  {
    id: '4',
    nombre: "Sofia",
    precioPorHora: 20,
    horasPendientes: 5
  },
  {
    id: '5',
    nombre: "Miranda",
    precioPorHora: 15,
    horasPendientes: 8
  }
];


export default function App() {
  const [alumnos, setAlumnos] = useState<Alumno[]>(listaAlumnos);


  const handleCobrar = (alumno: Alumno) => {
    setAlumnos(alumnos.map(a => a.id === alumno.id ? { ...a, horasPendientes: 0 } : a ));
  };

  const handleAddHoras = (alumno: Alumno, horas: number) => {
    setAlumnos(alumnos.map(a => a.id === alumno.id 
        ? { ...a, horasPendientes: a.horasPendientes + horas } : a ));
  };

  const handleEliminar = (alumno: Alumno) => {
    setAlumnos(alumnos.filter(a => a.id !== alumno.id));
  };

  return (
    <View style={styles.container}>

      {/*HEADER*/}
      <View style={styles.header}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Menu</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Ajustes</Text>
      </View>

      {/*CONTENIDO PRINCIPAL*/}
      <StatusBar style="auto" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43c8dfb7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth, // La línea más fina posible
    borderBottomColor: '#1d6fa5',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
