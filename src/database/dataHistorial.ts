import db from './database';
import { PagoRegistro } from '../type/types';

export function getPagos(): PagoRegistro[] {
  return db.getAllSync<PagoRegistro>(
    `SELECT * 
     FROM pagos 
     ORDER BY fecha DESC;`
  );
}

export function addPago(alumnoId: number, alumnoNombre: string, horasCobradas: number, montoCobrado: number): void {
  db.runSync(
    `INSERT INTO pagos 
    (alumnoId, alumnoNombre, horasCobradas, montoCobrado) 
    VALUES (?, ?, ?, ?);`,
    [alumnoId, alumnoNombre, horasCobradas, montoCobrado]
  );
}

export function getResumenHistorial(): { totalCobrado: number; totalHoras: number } {
  const result = db.getFirstSync<{ totalCobrado: number; totalHoras: number }>(
    `SELECT 
      COALESCE(SUM(montoCobrado), 0) as totalCobrado,
      COALESCE(SUM(horasCobradas), 0) as totalHoras
     FROM pagos;`
  );
  return result ?? { totalCobrado: 0, totalHoras: 0 };
}

export function getPagosPorAlumno(alumnoId: number): PagoRegistro[] {
  return db.getAllSync<PagoRegistro>(
    `SELECT * 
     FROM pagos 
     WHERE alumnoId = ? 
     ORDER BY fecha DESC;`,
    [alumnoId]
  );
}

export function getTotalCobrado(): number {
  const result = db.getFirstSync<{ total: number }>(
    `SELECT SUM(montoCobrado) as total FROM pagos;`
  );
  return result?.total ?? 0;
}

export function getTotalHorasCobradas(): number {
  const result = db.getFirstSync<{ totalHoras: number }>(
    `SELECT SUM(horasCobradas) as totalHoras FROM pagos;`
  );
  return result?.totalHoras ?? 0;
}