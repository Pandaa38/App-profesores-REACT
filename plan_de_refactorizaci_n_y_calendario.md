# Plan Integral: Refactorización de Arquitectura y Calendario Semanal MVP

Este documento detalla la hoja de ruta para desacoplar el estado global, consolidar la base de datos y construir el sistema de horario semanal interactivo para la gestión de tutorías y clases.

## 1. Decisión de Diseño: ¿Hora Fin vs. Duración?

Para el formulario de creación/edición de horarios se adoptará la opción **Hora de Inicio (Ruleta) + Duración de la Clase (Ruleta o Tramos)** por las siguientes razones técnicas y de experiencia de usuario:

### Ventajas Técnicas y de UX

1. **Prevención nativa de errores lógicos:** En un selector de *Hora Inicio + Hora Fin*, el usuario puede seleccionar accidentalmente un fin anterior al inicio (por ejemplo: Inicio 17:00, Fin 16:30), lo que exigiría validaciones reactivas y mensajes de error. Con *Inicio + Duración*, cualquier combinación es matemáticamente válida.

2. **Coherencia con las clases particulares:** Las sesiones se reservan por bloques estándar ($30\text{ min}$, $45\text{ min}$, $1\text{ h}$, $1.5\text{ h}$, $2\text{ h}$). Además, el modelo ya cuenta con `ajustes.duracion` en `useAjustes.ts`, por lo que el formulario puede precargarse con la duración preferida del profesor.

3. **Cálculo trivial y persistencia compatible:** En la base de datos se sigue guardando `hora_inicio` y `hora_fin` (en formato `"HH:mm"`), calculando el fin automáticamente:
   

   $$
   \text{minutosTotalesInicio} = (\text{horaInicio} \times 60) + \text{minutoInicio}
   $$

   $$
   \text{minutosTotalesFin} = \text{minutosTotalesInicio} + \text{duracionEnMinutos}
   $$

   $$
   \text{horaFin} = \left\lfloor \frac{\text{minutosTotalesFin}}{60} \right\rfloor, \quad \text{minutoFin} = \text{minutosTotalesFin} \pmod{60}
   $$

## 2. Fase 1: Desacoplamiento de Contextos y Estado Global

### Problema Actual

`AjustesContext.tsx` agrupa tanto la configuración cosmética y de localización (`useAjustes`) como toda la capa del calendario (`useCalendario`). Cada modificación en el calendario reevalúa componentes suscritos a la moneda o tema, y viceversa.

### Acciones

1. **Crear `context/CalendarioContext.tsx`:**

   * Proveerá: `diasLaborables`, `horarios`, `notas`, `cargando`, `toggleDiaLaborable`, `crearHorario`, `crearHorariosMultiples`, `editarHorario`, `eliminarHorario`, `cargarDatos`.

2. **Limpiar `context/AjustesContext.tsx`:**

   * Limitar el contexto a: `ajustes`, `cargando`, `actualizarTema`, `actualizarMoneda`, `actualizarDuracion`, `actualizarIdioma`.

3. **Punto de Entrada (`App.tsx`):**

   * Anidar los proveedores en el árbol raíz:

     ```
     <AjustesProvider>
       <CalendarioProvider>
         <NavigationContainer>
           <TabNavigator />
         </NavigationContainer>
       </CalendarioProvider>
     </AjustesProvider>
     
     ```

## 3. Fase 2: Tipos y Capa de Base de Datos

### A. Corrección y Extensión en `type/types.ts`

1. Corregir la sintaxis de cierre de interfaces corruptas en el volcado original.

2. Homogeneizar tipos para la vista del calendario:

   ```
   export interface Horario {
     id: number;
     alumnoId: number;
     diaId: number;
     horaInicio: string; // "HH:mm"
     horaFin: string;    // "HH:mm"
     alumnoNombre?: string; // Derivado de JOIN
   }
   
   export type HorarioInput = {
     alumnoId: number;
     diaIds: number[];    // Permite múltiples días
     horaInicio: string;
     duracionMinutos: number;
   };
   
   ```

### B. Mejoras en `database/dataCalendario.ts`

1. **Optimizar `getHorarios()` con `JOIN`:**

   * En lugar de recuperar solo IDs, cruzar con la tabla `alumnos` para obtener el nombre del estudiante en una única consulta sincronizada:

     ```
     SELECT 
       h.id, 
       h.alumno_id AS alumnoId, 
       h.dia_id AS diaId, 
       h.hora_inicio AS horaInicio, 
       h.hora_fin AS horaFin,
       a.nombre AS alumnoNombre
     FROM horarios h
     JOIN alumnos a ON h.alumno_id = a.id
     ORDER BY h.dia_id ASC, h.hora_inicio ASC;
     
     ```

2. **Inserción de Múltiples Días (`addHorariosMultiples`):**

   * Ejecutar la creación de horarios dentro de una transacción SQLite para garantizar atomicidad cuando el usuario marque varios días (ej. Lunes y Miércoles):

     ```
     export function addHorariosMultiples(alumnoId: number, diasIds: number[], horaInicio: string, horaFin: string): void {
       db.withTransactionSync(() => {
         for (const diaId of diasIds) {
           db.runSync(
             `INSERT INTO horarios (alumno_id, dia_id, hora_inicio, hora_fin) VALUES (?, ?, ?, ?);`,
             [alumnoId, diaId, horaInicio, horaFin]
           );
         }
       });
     }
     
     ```

## 4. Fase 3: Rediseño del Formulario de Horarios (`FormHorario.tsx`)

El nuevo formulario sustituirá los `TextInput` libres por controles táctiles precisos:

1. **Selector de Alumno:** Dropdown estilizado con lista de alumnos disponibles.

2. **Selector Múltiple de Días:**

   * Fila de chips seleccionables: `[L] [M] [X] [J] [V] [S] [D]`.

   * Permite activar o desactivar varios días simultáneamente mediante un estado `diasSeleccionados: number[]`.

3. **Ruleta / Tambor de Hora de Inicio:**

   * Columna Horas: `07` a `23`.

   * Columna Minutos: `00`, `15`, `30`, `45`.

   * Implementado mediante dos `FlatList` / `ScrollView` con `snapToInterval` o selectores numéricos con botones de incremento rápido.

4. **Selector de Duración de Clase:**

   * Chips rápidos de selección directa: `30 min`, `45 min`, `1 h`, `1 h 15 min`, `1 h 30 min`, `2 h`.

   * Muestra en tiempo real una etiqueta informativa: `"Horario resultante: 16:30 - 17:30"`.

## 5. Fase 4: Renderizado del Horario Semanal (`CalendaroSemana.tsx`)

### Transformación de Cuadrícula Estática a Cuadrícula Activa

1. **Eliminar Paginación Temporal Innecesaria:**

   * Como se modela una plantilla semanal fija, no se requiere calcular semanas hacia adelante o atrás (`semanaPasada`, `semanaQueViene`).

2. **Columnas Dinámicas:**

   * Las columnas se generan a partir de los `diasLaborables` habilitados (`dia.habilitado === true`).

   * Ancho de columna:
     

     $$
     \text{columnWidth} = \frac{\text{SCREEN\_WIDTH} - \text{TIME\_COLUMN\_WIDTH}}{\text{totalDiasActivos}}
     $$

3. **Cálculo de Coordenadas de los Bloques de Clase:**

   * Altura de celda por hora fija: $\text{ALTO\_HORA} = 60\text{ px}$ ($1\text{ px} = 1\text{ minuto}$).

   * Para cada horario perteneciente al `diaId`:
     

     $$
     \text{offsetMinutos} = (\text{hora} \times 60) + \text{minuto}
     $$

     $$
     \text{top} = \left(\frac{\text{offsetMinutos}}{60}\right) \times \text{ALTO\_HORA}
     $$

     $$
     \text{altura} = \left(\frac{\text{duracionMinutos}}{60}\right) \times \text{ALTO\_HORA}
     $$

4. **Tarjeta de Clase Superpuesta:**

   * Bloque posicionado con `position: 'absolute'` dentro de la columna correspondiente.

   * Contenido: Nombre del alumno y rango horario (`"16:00 - 17:00"`).

   * Evento `onPress`: Dispara el modal de inspección/gestión.

## 6. Fase 5: Acciones de Horario (Detalle, Edición y Eliminación)

1. **Modal de Detalle / Acciones (`ModalAccionHorario`):**

   * Al pulsar un bloque de clase en la cuadrícula, se despliega una tarjeta inferior con:

     * Nombre del estudiante.

     * Día y rango horario.

     * Botón **Editar**: Cierra el visor y abre `FormHorario` en modo edición con los datos precargados.

     * Botón **Eliminar**: Despliega una alerta de confirmación (`Alert.alert`) y ejecuta `eliminarHorario(id)` sobre SQLite.

## 7. Matriz de Cambios por Archivo

| Archivo | Responsabilidad / Cambio Principal | 
 | ----- | ----- | 
| `type/types.ts` | Reparar sintaxis, extender `Horario` con `alumnoNombre`, definir `HorarioInput`. | 
| `context/CalendarioContext.tsx` | **Nuevo archivo.** Contexto específico para la gestión y mutación del calendario. | 
| `context/AjustesContext.tsx` | Retirar `useCalendario` y conservar exclusivamente preferencias generales. | 
| `database/dataCalendario.ts` | Añadir `JOIN alumnos` en `getHorarios()` y función transaccional `addHorariosMultiples()`. | 
| `hooks/useCalendario.ts` | Exponer `crearHorariosMultiples` y refresco optimizado del listado. | 
| `components/FormHorario.tsx` | Sustituir `TextInput` por ruletas/tramos de hora y selección múltiple de días. | 
| `components/CalendaroSemana.tsx` | Implementar renderizado posicional absoluto de clases sobre las 24 horas y eventos click. | 
| `screens/CalendarioScreen.tsx` | Eliminar `PagerView`, conectar `CalendarioContext` y coordinar modales de creación/edición. | 
| `screens/AjustesScreen.tsx` | Consumir `diasLaborables` desde `CalendarioContext` en lugar de `AjustesContext`. | 
| `App.tsx` | Registrar `CalendarioProvider` debajo de `AjustesProvider`. | 

## 8. Siguientes Pasos

1. Ejecutar la separación de **`CalendarioContext`** y su cableado en `App.tsx` y `AjustesScreen.tsx`.

2. Actualizar las funciones de consulta e inserción en **`dataCalendario.ts`**.

3. Construir los componentes de ruleta de hora e integrarlos en **`FormHorario.tsx`**.

4. Implementar los cálculos de posicionamiento y renderizado en **`CalendaroSemana.tsx`**.