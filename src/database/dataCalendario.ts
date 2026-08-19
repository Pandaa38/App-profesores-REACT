import db from './database';
import { DiaLaborable, Horario, Nota } from '../type/types';

export function getDiasLaborables(): DiaLaborable[] {
  const rows = db.getAllSync<{ id: number; habilitado: number }>(
    `SELECT id, habilitado FROM dias_laborables ORDER BY id ASC;`
  );
  // Mapeamos el 0/1 de SQLite al boolean que espera nuestro tipo
  return rows.map(row => ({
    id: row.id,
    habilitado: row.habilitado === 1
  }));
}

export function updateDiaLaborable(id: number, habilitado: boolean): void {
  db.runSync(
    `UPDATE dias_laborables SET habilitado = ? WHERE id = ?;`,
    [habilitado ? 1 : 0, id]
  );
}

/////////////////////////////////////////////////

export function getHorarios(): Horario[] {
  // Renombramos las columnas en la consulta para que coincidan con la interfaz Horario
  return db.getAllSync<Horario>(
    `SELECT 
      id, 
      alumno_id AS alumnoId, 
      dia_id AS diaId, 
      hora_inicio AS horaInicio, 
      hora_fin AS horaFin 
    FROM horarios
    ORDER BY dia_id ASC, hora_inicio ASC;`
  );
}

export function addHorario(alumnoId: number, diaId: number, horaInicio: string, horaFin: string): void {
  db.runSync(
    `INSERT INTO horarios (alumno_id, dia_id, hora_inicio, hora_fin) 
     VALUES (?, ?, ?, ?);`,
    [alumnoId, diaId, horaInicio, horaFin]
  );
}

export function updateHorario(id: number, diaId: number, horaInicio: string, horaFin: string): void {
  db.runSync(
    `UPDATE horarios 
     SET dia_id = ?, hora_inicio = ?, hora_fin = ? 
     WHERE id = ?;`,
    [diaId, horaInicio, horaFin, id]
  );
}

export function deleteHorario(id: number): void {
  db.runSync(
    `DELETE FROM horarios WHERE id = ?;`,
    [id]
  );
}

///////////////////////////////////////////////////

export function getNotas(horarioId?: number): Nota[] {
  let query = `SELECT * FROM notas`;
  const params: any[] = [];

  if (horarioId !== undefined) {
    query += ` WHERE horario_id = ?`;
    params.push(horarioId);
  }

  query += ` ORDER BY permanente DESC, fecha ASC;`;

  const rows = db.getAllSync<{ id: number; horario_id: number; texto: string; fecha: string | null; permanente: number }>(query, params);
  
  return rows.map(row => ({
    id: row.id,
    horarioId: row.horario_id,
    texto: row.texto,
    fecha: row.fecha,
    permanente: row.permanente === 1
  }));
}

export function addNota(horarioId: number, texto: string, fecha: string | null, permanente: boolean): void {
  db.runSync(
    `INSERT INTO notas (horario_id, texto, fecha, permanente) 
     VALUES (?, ?, ?, ?);`,
    [horarioId, texto, fecha, permanente ? 1 : 0]
  );
}

export function updateNota(id: number, texto: string, fecha: string | null, permanente: boolean): void {
  db.runSync(
    `UPDATE notas 
     SET texto = ?, fecha = ?, permanente = ? 
     WHERE id = ?;`,
    [texto, fecha, permanente ? 1 : 0, id]
  );
}

export function deleteNota(id: number): void {
  db.runSync(
    `DELETE FROM notas WHERE id = ?;`,
    [id]
  );
}