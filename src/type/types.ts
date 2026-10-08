/*
Una clase se da a un alumno y se recibe un pago.
Un alumno tiene un nombre, un precio por hora, una cantidad de horas pendientes(no pagadas) y puede tener horario.
Los pagos se guardan con atributos pa luego filtrarlos y se guardan en un historial

*/
// export type Clase = {
//   fecha: string;
//   horas: number;
//   alumno: Alumno;
//   pagoRegistro: PagoRegistro;
// }

export interface Alumno {
  id: number;
  nombre: string;
  precioPorHora: number;
  horasPendientes: number;
  horarios?: Horario[];
}

export type PagoRegistro = {
  id: number;
  alumnoId: number | null;
  alumnoNombre: string;
  horasCobradas: number;
  montoCobrado: number;
  fecha: string;
}

export type HistorialPago = {
  pagos: PagoRegistro[];
}

export interface DiaLaborable {
  id: number;
  habilitado: boolean;
}

export interface Horario {
  id: number;
  alumnoId: number;
  diaId: number;
  horaInicio: string; // "HH:MM"
  horaFin: string;    // "HH:MM"
}

export interface HorarioConAlumno extends Horario {
  alumnoNombre: string;
  precioPorHora?: number;
}

export interface Nota {
  id?: number;
  horarioId: number;
  texto: string;
  fecha: string | null; // "YYYY-MM-DD" para puntuales, null para permanentes
  permanente: boolean;
}
