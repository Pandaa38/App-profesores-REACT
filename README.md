\# 📚 TutorApp — Seguimiento de Alumnos para Profesores



Aplicación multiplataforma (\*\*Android\*\* e \*\*iOS\*\*) diseñada para que profesores particulares gestionen a sus alumnos, controlen las horas impartidas, el precio por hora y el dinero acumulado pendiente de cobro.



Desarrollada originalmente en concepto para KMP, pero construida con \*\*React Native, Expo y TypeScript\*\* para permitir un desarrollo ágil y compilación para iOS directamente desde Windows.



---



\## ✨ Funcionalidades



| Función | Descripción |

|---|---|

| ➕ \*\*Añadir alumnos\*\* | Registra nuevos alumnos con nombre y precio por hora personalizado |

| ✏️ \*\*Editar alumnos\*\* | Modifica el nombre o el precio/hora de un alumno existente |

| 🗑️ \*\*Eliminar alumnos\*\* | Elimina un alumno con diálogo de confirmación (avisa si tiene deuda) |

| ⏱️ \*\*Sumar horas\*\* | Botones rápidos de +1h, +0.5h y entrada personalizada (+Xh) |

| 💰 \*\*Deuda acumulada\*\* | Cálculo automático: `horas pendientes × precio/hora` |

| ✅ \*\*Cobrar (reset)\*\* | Registra el cobro en el historial y resetea las horas a 0 |

| 📋 \*\*Historial de cobros\*\* | Lista cronológica de todos los cobros: alumno, monto, horas, fecha |

| 📊 \*\*Resumen global\*\* | Tarjeta con total de alumnos, horas pendientes y deuda total |

| ⚠️ \*\*Confirmaciones\*\* | Diálogos de confirmación para acciones destructivas (cobrar, eliminar) |

| 📱 \*\*Multiplataforma\*\* | Funciona nativamente en Android e iOS |



---



\## 🖼️ Pantallas



\### Pantalla de Alumnos

\- Tarjeta resumen superior con estadísticas globales

\- Lista de tarjetas con la información de cada alumno

\- Botones de acción: +1h, +0.5h, +Xh (personalizado) y Cobrar

\- Iconos de editar (✏️) y eliminar (🗑️) en cada tarjeta

\- FAB (+) para añadir nuevo alumno

\- Deuda destacada en rojo cuando es > 0, verde cuando está al día



\### Pantalla de Historial

\- Resumen del total cobrado históricamente

\- Lista de todos los cobros realizados con:

&nbsp; - Nombre del alumno

&nbsp; - Monto cobrado

&nbsp; - Horas cobradas

&nbsp; - Fecha y hora del cobro



\### Navegación

\- Barra de navegación inferior con 2 pestañas: \*\*Alumnos\*\* | \*\*Historial\*\*



---



\## 🏗️ Arquitectura del Proyecto

```text

/TutorApp

├── app/                  # Enrutamiento (Expo Router)

│   ├── (tabs)/           # Pestañas de navegación principal

│   │   ├── index.tsx     # Pantalla de Alumnos

│   │   └── history.tsx   # Pantalla de Historial

│   └── \_layout.tsx       # Layout principal de la aplicación

├── components/           # Componentes de UI reutilizables

│   ├── AlumnoCard.tsx    # Tarjeta individual de alumno

│   ├── ResumenItem.tsx   # Tarjetas de resumen global

│   └── dialogs/          # Diálogos modulares (Material 3)

├── store/                # Lógica de negocio y estado global

│   └── useTutorStore.ts  # Estado con Zustand (equivalente al ViewModel)

└── types/                # Interfaces TypeScript

&nbsp;   └── index.ts          # Modelos de Alumno y PagoRegistro

```



\### Patrón de diseño

\- \*\*Estado Global:\*\* Zustand para manejar reactividad y lógica centralizada.

\- \*\*UI:\*\* React Native Paper para componentes consistentes con Material Design 3.

\- \*\*Navegación:\*\* Expo Router (basado en archivos).



---



\## 🛠️ Stack Tecnológico



| Tecnología | Propósito |

|---|---|

| React Native | Framework principal |

| Expo | Herramientas de desarrollo, compilación y testing |

| TypeScript | Lenguaje tipado (seguridad y autocompletado) |

| Zustand | Gestión del estado global (Ligero y potente) |

| React Native Paper | Librería de UI (Material 3) |

| Expo SQLite | Persistencia de datos local |



---



\## 🚀 Cómo ejecutar y probar



\### Requisitos previos

\- Node.js (LTS) instalado en tu equipo.

\- App \*\*Expo Go\*\* instalada en tu dispositivo físico (iOS o Android).



\### Iniciar el entorno de desarrollo



Desde la terminal en la raíz del proyecto:

```bash

\# Iniciar el servidor de Expo

npx expo start

```



\### Probar en el móvil (Sin necesidad de Mac)

1\. Asegúrate de que tu móvil y tu PC estén en la misma red Wi-Fi.

2\. Abre la app \*\*Expo Go\*\* en tu iPhone o Android.

3\. Escanea el código QR que aparece en la terminal.

4\. Cualquier cambio en el código se reflejará instantáneamente en tu móvil.



---



\## 🔧 Modelo de datos



\### Alumno

```typescript

export interface Alumno {

&nbsp;   id: string;

&nbsp;   nombre: string;

&nbsp;   precioPorHora: number;

&nbsp;   horasPendientes: number;

}

```



\### PagoRegistro

```typescript

export interface PagoRegistro {

&nbsp;   id: string;

&nbsp;   alumnoNombre: string;

&nbsp;   montoCobrado: number;

&nbsp;   horasCobradas: number;

&nbsp;   fecha: string;       // Ej: "26/02/2026 14:30"

}

```



---



\## 🔮 Mejoras futuras



\- \[ ] \*\*Persistencia local\*\* — Guardar datos con Expo SQLite o AsyncStorage

\- \[ ] \*\*Tema oscuro\*\* — Soporte para modo oscuro automático

\- \[ ] \*\*Exportar datos\*\* — Exportar historial a CSV o PDF

\- \[ ] \*\*Notificaciones\*\* — Recordatorios de cobro pendiente

\- \[ ] \*\*Backup/Sync\*\* — Sincronización en la nube (Firebase, Supabase)

\- \[ ] \*\*Búsqueda y filtros\*\* — Buscar alumnos por nombre, filtrar historial por fecha

\- \[ ] \*\*Ordenar alumnos\*\* — Por nombre, deuda o horas pendientes

\- \[ ] \*\*Estadísticas\*\* — Gráficos de ingresos mensuales

