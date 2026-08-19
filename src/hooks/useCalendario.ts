// src/hooks/useCalendario.ts
import { useState, useEffect, useCallback } from 'react';
import { DiaLaborable, Horario, Nota } from '../type/types';
import {
  getDiasLaborables,
  updateDiaLaborable,
  getHorarios,
  addHorario,
  updateHorario,
  deleteHorario,
  getNotas,
  addNota,
  updateNota,
  deleteNota,
} from '../database/dataCalendario';

const getLunes = (fecha: Date): Date => {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  const dia = d.getDay();
  const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
};

export function useCalendario() {
  const [lunesActual, setLunesActual] = useState<Date>(() => getLunes(new Date()));

  const [diasLaborables, setDiasLaborables] = useState<DiaLaborable[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  const avanzarSemana = useCallback(() => {
    setLunesActual((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 7);
      return next;
    });
  }, []);

  const retrocederSemana = useCallback(() => {
    setLunesActual((prev) => {
      const prevDate = new Date(prev);
      prevDate.setDate(prev.getDate() - 7);
      return prevDate;
    });
  }, []);

  const irAHoy = useCallback(() => {
    setLunesActual(getLunes(new Date()));
  }, []);

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
      console.error("Error al cargar datos del calendario:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const toggleDiaLaborable = useCallback((id: number, habilitado: boolean) => {
    updateDiaLaborable(id, !habilitado);
    cargarDatos();
  }, [cargarDatos]);

  const crearHorario = useCallback((alumnoId: number, diaId: number, horaInicio: string, horaFin: string) => {
    addHorario(alumnoId, diaId, horaInicio, horaFin);
    cargarDatos();
  }, [cargarDatos]);

  const editarHorario = useCallback((id: number, diaId: number, horaInicio: string, horaFin: string) => {
    updateHorario(id, diaId, horaInicio, horaFin);
    cargarDatos();
  }, [cargarDatos]);

  const eliminarHorario = useCallback((id: number) => {
    deleteHorario(id);
    cargarDatos();
  }, [cargarDatos]);

  const crearNota = useCallback((horarioId: number, texto: string, fecha: string | null, permanente: boolean) => {
    addNota(horarioId, texto, fecha, permanente);
    cargarDatos();
  }, [cargarDatos]);

  const editarNota = useCallback((id: number, texto: string, fecha: string | null, permanente: boolean) => {
    updateNota(id, texto, fecha, permanente);
    cargarDatos();
  }, [cargarDatos]);

  const eliminarNota = useCallback((id: number) => {
    deleteNota(id);
    cargarDatos();
  }, [cargarDatos]);

  return {
    // Estados
    lunesActual,
    diasLaborables,
    horarios,
    notas,
    cargando,
    
    // Navegación de tiempo
    avanzarSemana,
    retrocederSemana,
    irAHoy,
    
    // Acciones de Base de Datos
    toggleDiaLaborable,
    crearHorario,
    editarHorario,
    eliminarHorario,
    crearNota,
    editarNota,
    eliminarNota,
    cargarDatos
  };
}