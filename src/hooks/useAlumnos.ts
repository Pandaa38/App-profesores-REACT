import { useState, useEffect } from 'react';

import { Alumno } from '../type/types';

import { inicializarDB } from '../database/database';
import { getAlumnos, addAlumno, updateHoras, cobrarAlumno, deleteAlumno, updateAlumno } from '../database/dataAlumnos';
import { addPago } from '../database/dataHistorial';

export function useAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const cargarAlumnos = () => {
    const datos = getAlumnos();
    setAlumnos(datos);
  };

  useEffect(() => { inicializarDB(); cargarAlumnos(); }, []);

  const handleCobrar = (alumno: Alumno) => {
    const monto = alumno.horasPendientes * alumno.precioPorHora;
    addPago(alumno.id, alumno.nombre, alumno.horasPendientes, monto);
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

  const handleEditarAlumno = (alumno: Alumno, nombre: string, precioPorHora: number, horasPendientes: number) => {
    updateAlumno(alumno.id, nombre, precioPorHora, horasPendientes);
    cargarAlumnos();
  };

  return {
    alumnos,
    handleCobrar,
    handleAddHoras,
    handleEliminar,
    handleAñadirAlumno,
    handleEditarAlumno,
  };
}