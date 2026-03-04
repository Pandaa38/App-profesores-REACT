import { useState, useEffect } from 'react';
import { Alumno } from '../type/types';
import { inicializarDB } from '../database/database';
import { getAlumnos, addAlumno, updateHoras, cobrarAlumno, deleteAlumno } from '../database/dataAlumnos';

export function useAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const cargarAlumnos = () => {
    const datos = getAlumnos();
    setAlumnos(datos);
  };

  useEffect(() => { inicializarDB(); cargarAlumnos(); }, []);

  const handleCobrar = (alumno: Alumno) => {
    cobrarAlumno(alumno.id);
    cargarAlumnos();
  };

  const handleAddHoras = (alumno: Alumno, horas: number) => {
    updateHoras(alumno.id, alumno.horasPendientes + horas);
    cargarAlumnos();
  };

  const handleEliminar = (alumno: Alumno) => {
    deleteAlumno(alumno.id);
    cargarAlumnos();
  };

  const handleAñadirAlumno = (nombre: string, precioPorHora: number) => {
    addAlumno(nombre, precioPorHora);
    cargarAlumnos();
  };

  return {
    alumnos,
    handleCobrar,
    handleAddHoras,
    handleEliminar,
    handleAñadirAlumno,
  };
}