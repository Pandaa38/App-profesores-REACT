import { useState, useCallback } from 'react';
import { PagoRegistro } from '../type/types';
import { getPagos, getResumenHistorial } from '../database/dataHistorial';

export function useHistorial() {
  const [pagos, setPagos] = useState<PagoRegistro[]>([]);
  const [resumen, setResumen] = useState({ totalCobrado: 0, totalHoras: 0 });

  const cargarHistorial = useCallback(() => {
    setPagos(getPagos());
    setResumen(getResumenHistorial());
  }, []);

  return {
    pagos,
    resumen,
    cargarHistorial,
  };
}