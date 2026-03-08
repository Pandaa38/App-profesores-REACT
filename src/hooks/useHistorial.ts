import { useState, useCallback } from 'react';
import { PagoRegistro } from '../type/types';
import { getPagos, getResumenHistorial, vaciarHistorial, FiltrosHistorial, FILTROS_DEFAULT } from '../database/dataHistorial';

export function useHistorial() {
  const [pagos, setPagos] = useState<PagoRegistro[]>([]);
  const [resumen, setResumen] = useState({ totalCobrado: 0, totalHoras: 0 });
  const [filtros, setFiltros] = useState<FiltrosHistorial>(FILTROS_DEFAULT);

  const cargarHistorial = useCallback((filtrosActivos: FiltrosHistorial = FILTROS_DEFAULT) => {
    setPagos(getPagos(filtrosActivos));
    setResumen(getResumenHistorial(filtrosActivos));
  }, []);

  const aplicarFiltros = (nuevosFiltros: FiltrosHistorial) => {
    setFiltros(nuevosFiltros);
    cargarHistorial(nuevosFiltros);
  };

  const handleVaciarHistorial = () => {
    vaciarHistorial();
    setFiltros(FILTROS_DEFAULT);
    cargarHistorial(FILTROS_DEFAULT);
  };

  return {
    pagos,
    resumen,
    filtros,
    cargarHistorial,
    aplicarFiltros,
    handleVaciarHistorial,
  };
}