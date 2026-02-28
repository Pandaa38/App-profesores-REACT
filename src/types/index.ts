// Basado en tu modelo de Alumno
export interface Alumno {
  id: string;
  nombre: string;
  precioPorHora: number;
  horasPendientes: number;
}

// Basado en tu modelo de PagoRegistro
export interface PagoRegistro {
  id: string;
  alumnoNombre: string;
  montoCobrado: number;
  horasCobradas: number;
  fecha: string; // Ejemplo: "26/02/2026 14:30"
}
