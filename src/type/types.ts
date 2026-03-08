// Basado en tu modelo de Alumno
export type Alumno = {
  id: number;
  nombre: string;
  precioPorHora: number;
  horasPendientes: number;
}

export type PagoRegistro = {
  id: number;
  alumnoId: number | null;
  alumnoNombre: string;
  horasCobradas: number;
  montoCobrado: number;
  fecha: string;
}

export type Clase = {
  fecha: string;
  horas: number;
  alumno: Alumno;
  pagoRegistro: PagoRegistro;
}

export type HistorialPago = {
  pagos: PagoRegistro[];
}
