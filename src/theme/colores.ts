// src/theme/colores.ts

// PALETA DE COLORES 1:

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

// PALETA DE COLORES 2
// export const temaClaro = {
//   // Fondos
//   fondo:           '#FFFCF9', // Blanco hueso cálido
//   tarjeta:         '#FFFFFF', // Blanco puro

//   // Textos
//   textoP:          '#27272A', // Zinc 800
//   textoS:          '#71717A', // Zinc 500
//   textoT:          '#A1A1AA', // Zinc 400

//   // Bordes
//   borde:           '#E4E4E7', // Zinc 200

//   // Acción principal (¡Tu nuevo Naranja!)
//   accion:          '#F97316', // Orange 500
//   accionTexto:     '#FFFFFF', // Texto blanco sobre el botón naranja

//   // Semánticos (Tonos suaves para encajar con el estilo amable)
//   deuda:           '#FB7185', // Rose 400 (Rojo sandía)
//   exito:           '#34D399', // Emerald 400 (Verde menta)
// };

// export const temaOscuro: Colores = {
//   // Fondos
//   fondo:           '#18181B', // Zinc 900 (Gris oscuro cálido)
//   tarjeta:         '#27272A', // Zinc 800

//   // Textos
//   textoP:          '#FAFAFA', // Zinc 50
//   textoS:          '#A1A1AA', // Zinc 400
//   textoT:          '#71717A', // Zinc 500

//   // Bordes
//   borde:           '#3F3F46', // Zinc 700

//   // Acción principal
//   accion:          '#FB923C', // Orange 400
//   accionTexto:     '#18181B', // Texto oscuro sobre el botón naranja claro para máxima legibilidad

//   // Semánticos
//   deuda:           '#FB7185', 
//   exito:           '#34D399', 
// };

// export const temaClaro = {
//   // Fondos
//   fondo:           '#F2F2F7', // Gris muy claro (fondo clásico del sistema iOS)
//   tarjeta:         '#FFFFFF', // Blanco puro para las tarjetas

//   // Textos
//   textoP:          '#000000', // Negro puro para máximo contraste
//   textoS:          '#8E8E93', // Gris medio elegante
//   textoT:          '#C7C7CC', // Gris claro para detalles menores

//   // Bordes
//   borde:           '#E5E5EA', // Gris muy sutil

//   // Acción principal (Monocromático)
//   accion:          '#000000', // Botones completamente negros (súper premium)
//   accionTexto:     '#FFFFFF', // Texto blanco sobre negro

//   // Semánticos (Tonos exactos de alerta de iOS)
//   deuda:           '#FF3B30', // Rojo vibrante pero limpio
//   exito:           '#34C759', // Verde corporativo Apple
// };

// export const temaOscuro: Colores = {
//   // Fondos
//   fondo:           '#000000', // Negro OLED puro (los píxeles de la pantalla se apagan)
//   tarjeta:         '#1C1C1E', // Gris oscuro profundo (el estándar para tarjetas en iOS oscuro)

//   // Textos
//   textoP:          '#FFFFFF', // Blanco puro
//   textoS:          '#8E8E93', // Gris medio
//   textoT:          '#48484A', // Gris más oscuro

//   // Bordes
//   borde:           '#38383A', // Bordes oscuros para separar tarjetas

//   // Acción principal (Monocromático Invertido)
//   accion:          '#FFFFFF', // Botones completamente blancos en modo oscuro
//   accionTexto:     '#000000', // Texto negro sobre el botón blanco

//   // Semánticos (Adaptados para no deslumbrar en modo oscuro)
//   deuda:           '#FF453A', // Rojo ligeramente más brillante para compensar el fondo negro
//   exito:           '#32D74B', // Verde brillante
// };




export type Colores = typeof temaClaro;