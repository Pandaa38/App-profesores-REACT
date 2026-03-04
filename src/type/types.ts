// Basado en tu modelo de Alumno
export type Alumno = {
  id: number;
  nombre: string;
  precioPorHora: number;
  horasPendientes: number;
}

// Basado en tu modelo de PagoRegistro
export type PagoRegistro = {
  id: string;
  alumnoNombre: string;
  montoCobrado: number;
  horasCobradas: number;
  fecha: string; // Ejemplo: "26/02/2026 14:30"
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
