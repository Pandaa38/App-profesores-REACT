import db from './database';
import { PagoRegistro } from '../type/types';

export type Periodo = 'todos' | 'esteMes' | 'mesAnterior' | 'esteAno';
export type Orden = 'recientes' | 'antiguos' | 'mayorImporte';

export type FiltrosHistorial = {
  periodo: Periodo;
  alumnoId: number | null;
  orden: Orden;
};

export const FILTROS_DEFAULT: FiltrosHistorial = {
  periodo: 'todos',
  alumnoId: null,
  orden: 'recientes',
};

// Genera las condiciones WHERE y ORDER BY según los filtros
function buildQuery(filtros: FiltrosHistorial): { where: string; params: any[]; orderBy: string } {
  const conditions: string[] = [];
  const params: any[] = [];

  // Filtro por período
  switch (filtros.periodo) {
    case 'esteMes':
      conditions.push(`strftime('%Y-%m', fecha) = strftime('%Y-%m', 'now', 'localtime')`);
      break;
    case 'mesAnterior':
      conditions.push(`strftime('%Y-%m', fecha) = strftime('%Y-%m', 'now', 'localtime', '-1 month')`);
      break;
    case 'esteAno':
      conditions.push(`strftime('%Y', fecha) = strftime('%Y', 'now', 'localtime')`);
      break;
  }

  // Filtro por alumno
  if (filtros.alumnoId !== null) {
    conditions.push(`alumnoId = ?`);
    params.push(filtros.alumnoId);
  }

  // Construir WHERE
  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Construir ORDER BY
  const orderBy = {
    recientes:    'ORDER BY fecha DESC',
    antiguos:     'ORDER BY fecha ASC',
    mayorImporte: 'ORDER BY montoCobrado DESC',
  }[filtros.orden];

  return { where, params, orderBy };
}

export function getPagos(filtros: FiltrosHistorial = FILTROS_DEFAULT): PagoRegistro[] {
  const { where, params, orderBy } = buildQuery(filtros);
  return db.getAllSync<PagoRegistro>(
    `SELECT * FROM pagos ${where} ${orderBy};`,
    params
  );
}

export function getResumenHistorial(filtros: FiltrosHistorial = FILTROS_DEFAULT): { totalCobrado: number; totalHoras: number } {
  const { where, params } = buildQuery(filtros);
  const result = db.getFirstSync<{ totalCobrado: number; totalHoras: number }>(
    `SELECT 
      COALESCE(SUM(montoCobrado), 0) as totalCobrado,
      COALESCE(SUM(horasCobradas), 0) as totalHoras
     FROM pagos ${where};`,
    params
  );
  return result ?? { totalCobrado: 0, totalHoras: 0 };
}

export function addPago(alumnoId: number, alumnoNombre: string, horasCobradas: number, montoCobrado: number): void {
  db.runSync(
    `INSERT INTO pagos (alumnoId, alumnoNombre, horasCobradas, montoCobrado) 
     VALUES (?, ?, ?, ?);`,
    [alumnoId, alumnoNombre, horasCobradas, montoCobrado]
  );
}

export function vaciarHistorial(filtros: FiltrosHistorial = FILTROS_DEFAULT): void {
  const { where, params } = buildQuery(filtros);
  db.runSync(`DELETE FROM pagos ${where};`, params);
}

export function getPagosPorAlumno(alumnoId: number): PagoRegistro[] {
  return db.getAllSync<PagoRegistro>(
    `SELECT * FROM pagos WHERE alumnoId = ? ORDER BY fecha DESC;`,
    [alumnoId]
  );
}