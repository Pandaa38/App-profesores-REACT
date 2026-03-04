import db from './database';
import { Alumno } from '../type/types';

export function getAlumnos(): Alumno[] {
  return db.getAllSync<Alumno>(
    `SELECT * 
    FROM alumnos 
    ORDER BY nombre ASC;`
    );
}

export function addAlumno(nombre: string, precioPorHora: number): void {
  db.runSync(
    `INSERT INTO alumnos 
    (nombre, precioPorHora, horasPendientes) 
    VALUES (?, ?, 0);`, [nombre, precioPorHora]
  );
}

export function updateHoras(id: number, horasPendientes: number): void {
  db.runSync(
    `UPDATE alumnos 
    SET horasPendientes = ? WHERE id = ?;`,
    [horasPendientes, id]
  );
}

export function cobrarAlumno(id: number): void {
  db.runSync(
    `UPDATE alumnos 
    SET horasPendientes = 0 
    WHERE id = ?;`, [id]
  );
}

export function deleteAlumno(id: number): void {
  db.runSync(
    `DELETE FROM alumnos WHERE id = ?;`, [id]
  );
}