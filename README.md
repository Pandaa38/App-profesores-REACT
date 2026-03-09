# TutorApp — Gestión de alumnos para profesores particulares

Aplicación móvil multiplataforma (Android e iOS) diseñada para que profesores particulares gestionen sus alumnos, controlen las horas impartidas, el precio por hora, el dinero pendiente de cobro y el historial de pagos.

Desarrollada con React Native, Expo y TypeScript.

---

## Funcionalidades

| Función | Descripción |
|---|---|
| Añadir alumnos | Registra nuevos alumnos con nombre y precio por hora |
| Editar alumnos | Modifica el nombre, precio/hora u horas pendientes |
| Eliminar alumnos | Elimina un alumno con diálogo de confirmación |
| Sumar horas | Botones rápidos de +1h, +0.5h y entrada personalizada |
| Deuda acumulada | Cálculo automático: horas pendientes x precio/hora |
| Cobrar | Registra el cobro en el historial y resetea las horas a 0 |
| Historial de cobros | Lista cronológica con alumno, monto, horas y fecha |
| Filtros en historial | Filtrar por período, alumno y ordenación |
| Resumen global | Total cobrado y horas totales en el historial |
| Ajustes | Tema, moneda y duración por defecto configurables |
| Confirmaciones | Diálogos de confirmación para acciones destructivas |

---

## Pantallas

### Alumnos
- Tarjeta resumen con estadísticas globales (alumnos, horas, deuda total)
- Lista de tarjetas con la información de cada alumno
- Botones de acción: +1h, +0.5h, +Xh personalizado y Cobrar
- Botones de editar y eliminar en cada tarjeta
- FAB para añadir nuevo alumno
- Deuda destacada en rojo cuando es mayor a 0

### Historial
- Total cobrado y horas totales filtrados dinámicamente
- Lista de cobros con nombre, monto, horas y fecha
- Filtros por período (todos, este mes, mes anterior, este año)
- Filtro por alumno con dropdown
- Ordenación por más recientes, más antiguos o mayor importe
- Borrar historial completo con confirmación

### Ajustes
- Selector de tema (claro, oscuro, sistema)
- Selector de moneda (EUR, USD, GBP)
- Duración por defecto de las clases
- Selección de idioma (próximamente)
- Exportar CSV (próximamente)
- Versión de la aplicación

---

## Arquitectura del proyecto

```
App-profesores-REACT/
├── App.tsx                        # Punto de entrada, navegacion y contextos
├── app.json                       # Configuracion de Expo
├── src/
│   ├── navigation/
│   │   └── TabNavigator.tsx       # Barra de navegacion inferior
│   ├── screens/
│   │   ├── AlumnosScreen.tsx      # Pantalla principal de alumnos
│   │   ├── HistorialScreen.tsx    # Pantalla de historial de cobros
│   │   └── AjustesScreen.tsx      # Pantalla de ajustes
│   ├── components/
│   │   ├── AlumnoCard.tsx         # Tarjeta de cada alumno
│   │   ├── ResumenCard.tsx        # Tarjeta de resumen global
│   │   ├── PagoCard.tsx           # Tarjeta de cada cobro en historial
│   │   ├── FilterModal.tsx        # Modal de filtros del historial
│   │   ├── FormAlumno.tsx         # Formulario de añadir/editar alumno
│   │   ├── AddButton.tsx          # Boton flotante de añadir
│   │   └── Header.tsx             # Cabecera reutilizable
│   ├── hooks/
│   │   ├── useAlumnos.ts          # Logica de gestion de alumnos
│   │   ├── useHistorial.ts        # Logica de historial y filtros
│   │   └── useAjustes.ts          # Logica de AsyncStorage
│   ├── context/
│   │   └── AjustesContext.tsx     # Contexto global de ajustes
│   ├── database/
│   │   ├── database.ts            # Inicializacion de SQLite
│   │   ├── dataAlumnos.ts         # Queries de alumnos
│   │   └── dataHistorial.ts       # Queries de historial y filtros
│   └── type/
│       └── types.ts               # Tipos TypeScript globales
```

### Patron de diseño

- **Base de datos:** SQLite con expo-sqlite para persistencia local
- **Estado local:** React hooks (useState, useCallback)
- **Estado global:** React Context para ajustes compartidos entre pantallas
- **Navegacion:** React Navigation con Bottom Tab Navigator
- **Persistencia de ajustes:** AsyncStorage

---

## Stack tecnologico

| Tecnologia | Proposito |
|---|---|
| React Native | Framework principal |
| Expo | Herramientas de desarrollo y compilacion |
| TypeScript | Tipado estatico |
| Expo SQLite | Base de datos local |
| AsyncStorage | Persistencia de ajustes |
| React Navigation | Navegacion entre pantallas |
| Expo Linear Gradient | Efectos visuales de difuminado |
| Expo Vector Icons | Iconografia |
| Expo Constants | Informacion de la aplicacion |

---

## Modelo de datos

### Alumno
```typescript
type Alumno = {
  id: number;
  nombre: string;
  precioPorHora: number;
  horasPendientes: number;
}
```

### PagoRegistro
```typescript
type PagoRegistro = {
  id: number;
  alumnoId: number | null;   // null si el alumno fue eliminado
  alumnoNombre: string;      // snapshot del nombre en el momento del cobro
  horasCobradas: number;
  montoCobrado: number;
  fecha: string;             // formato ISO con hora local
}
```

### Ajustes
```typescript
type Ajustes = {
  tema: 'claro' | 'oscuro' | 'sistema';
  moneda: '€' | '$' | '£';
  duracion: 0.5 | 1 | 1.5 | 2;
}
```

---

## Como ejecutar

### Requisitos
- Node.js LTS
- App Expo Go en el dispositivo movil

### Iniciar

```bash
npx expo start
```

Escanea el codigo QR con Expo Go. El dispositivo y el PC deben estar en la misma red Wi-Fi.

---

## Mejoras futuras

- [ ] Tema oscuro funcional en toda la app
- [ ] Seleccion de idioma
- [ ] Exportar historial a CSV
- [ ] Notificaciones de cobro pendiente
- [ ] Estadisticas graficas de ingresos mensuales
- [ ] Backup en la nube
- [ ] Busqueda de alumnos por nombre
- [ ] Ordenar alumnos por nombre, deuda u horas