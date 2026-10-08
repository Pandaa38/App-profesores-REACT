import { useState, useEffect, useCallback } from 'react';
import { DiaLaborable, HorarioConAlumno, Nota } from '../type/types';
import {
  getDiasLaborables,
  updateDiaLaborable,
  getHorarios,
  addHorario,
  addHorariosMultiples,
  updateHorario,
  deleteHorario,
  getNotas,
  addNota,
  updateNota,
  deleteNota,
} from '../database/dataCalendario';

export function useCalendario() {
  const [diasLaborables, setDiasLaborables] = useState<DiaLaborable[]>([]);
  const [horarios, setHorarios] = useState<HorarioConAlumno[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // Carga sincronizada de datos desde SQLite
  const cargarDatos = useCallback(() => {
    setCargando(true);
    try {
      const diasBD = getDiasLaborables();
      const horariosBD = getHorarios();
      const notasBD = getNotas();
      setDiasLaborables(diasBD);
      setHorarios(horariosBD);
      setNotas(notasBD);
    } catch (error) {
      console.error('Error al cargar datos del calendario:', error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Modificar visibilidad de un día (Lunes a Domingo)
  const toggleDiaLaborable = useCallback(
    (id: number, habilitado: boolean) => {
      updateDiaLaborable(id, !habilitado);
      cargarDatos();
    },
    [cargarDatos]
  );

  // Crear una clase en un único día
  const crearHorario = useCallback(
    (alumnoId: number, diaId: number, horaInicio: string, horaFin: string) => {
      addHorario(alumnoId, diaId, horaInicio, horaFin);
      cargarDatos();
    },
    [cargarDatos]
  );

  // Crear una clase en múltiples días de forma atómica en SQLite
  const crearHorariosMultiples = useCallback(
    (alumnoId: number, diasIds: number[], horaInicio: string, horaFin: string) => {
      addHorariosMultiples(alumnoId, diasIds, horaInicio, horaFin);
      cargarDatos();
    },
    [cargarDatos]
  );

  // Modificar horario existente
  const editarHorario = useCallback(
    (id: number, diaId: number, horaInicio: string, horaFin: string) => {
      updateHorario(id, diaId, horaInicio, horaFin);
      cargarDatos();
    },
    [cargarDatos]
  );

  // Eliminar horario
  const eliminarHorario = useCallback(
    (id: number) => {
      deleteHorario(id);
      cargarDatos();
    },
    [cargarDatos]
  );

  // Gestión de Notas
  const crearNota = useCallback(
    (horarioId: number, texto: string, fecha: string | null, permanente: boolean) => {
      addNota(horarioId, texto, fecha, permanente);
      cargarDatos();
    },
    [cargarDatos]
  );

  const editarNota = useCallback(
    (id: number, texto: string, fecha: string | null, permanente: boolean) => {
      updateNota(id, texto, fecha, permanente);
      cargarDatos();
    },
    [cargarDatos]
  );

  const eliminarNota = useCallback(
    (id: number) => {
      deleteNota(id);
      cargarDatos();
    },
    [cargarDatos]
  );

  return {
    // Estado
    diasLaborables,
    horarios,
    notas,
    cargando,

    // Acciones de Horarios y Días
    toggleDiaLaborable,
    crearHorario,
    crearHorariosMultiples,
    editarHorario,
    eliminarHorario,

    // Acciones de Notas
    crearNota,
    editarNota,
    eliminarNota,

    // Recarga manual
    cargarDatos,
  };
}