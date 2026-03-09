// src/theme/colores.ts

export const temaClaro = {
  // Fondos
  fondo:           '#F8FAFC', // Gris muy pálido, más elegante que el gris puro
  tarjeta:         '#FFFFFF',

  // Textos
  textoP:          '#0F172A', // Slate 900 (Negro suave)
  textoS:          '#64748B', // Slate 500
  textoT:          '#94A3B8', // Slate 400

  // Bordes
  borde:           '#E2E8F0', // Slate 200

  // Acción principal (El azul que pediste)
  accion:          '#2563EB', // Blue 600
  accionTexto:     '#FFFFFF',

  // Semánticos
  deuda:           '#F43F5E', // Rose 500 (Rojo más moderno)
  exito:           '#10B981', // Emerald 500 (Verde vibrante)
};

export const temaOscuro: Colores = {
  // Fondos
  fondo:           '#0F172A', // Slate 900 (Fondo azul marino muy oscuro)
  tarjeta:         '#1E293B', // Slate 800

  // Textos
  textoP:          '#F8FAFC',
  textoS:          '#94A3B8',
  textoT:          '#64748B',

  // Bordes
  borde:           '#334155', // Slate 700

  // Acción principal
  accion:          '#3B82F6', // Blue 500 (Un azul un poco más claro para que resalte en oscuro)
  accionTexto:     '#FFFFFF',

  // Semánticos
  deuda:           '#F43F5E',
  exito:           '#10B981',
};

export type Colores = typeof temaClaro;