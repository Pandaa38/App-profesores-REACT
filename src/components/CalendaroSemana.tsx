import React, {useMemo} from "react";
import {View, Text, ScrollView, StyleSheet, Dimensions} from "react-native";
import {DiaLaborable} from "../type/types";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
const TIME_COLUMN_WIDTH = 45; // Ancho fijo para la nueva columna de horas

function formatMonth(date: Date) {
  return date.toLocaleString(undefined, {month: "long", year: "numeric"});
}

function addDays(d: Date, days: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

interface CalendaroSemanaProps {
  lunesActual: Date;
  diasLaborables: DiaLaborable[];
}

export default function CalendaroSemana({lunesActual, diasLaborables}: CalendaroSemanaProps) {
  const semana = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < 7; i++) arr.push(addDays(lunesActual, i));
    return arr;
  }, [lunesActual]);

  const diasHabilitados = useMemo(() => {
    const activos = diasLaborables.filter((d: DiaLaborable) => d.habilitado).map((d) => d.id);
    if (!activos || activos.length === 0) return [1, 2, 3, 4, 5, 6, 7];
    return activos;
  }, [diasLaborables]);

  const columnas = useMemo(() => {
    return diasHabilitados.map((id) => {
      const index = id - 1;
      return semana[index];
    });
  }, [diasHabilitados, semana]);

  // Restamos el ancho de la columna de horas antes de dividir el espacio entre los días
  const columnWidth = Math.floor((SCREEN_WIDTH - TIME_COLUMN_WIDTH) / Math.max(1, columnas.length));

  const horas = Array.from({length: 24}, (_, i) => i);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>{formatMonth(lunesActual)}</Text>
      </View>

      <View style={styles.daysRow}>
        {/* Espaciador vacío para alinear la cabecera con la columna de horas */}
        <View style={{width: TIME_COLUMN_WIDTH}} />
        {columnas.map((dia, idx) => (
          <View key={idx} style={[styles.dayCell, {width: columnWidth}]}>
            <Text style={styles.dayName}>{dia.toLocaleDateString(undefined, {weekday: "short"})}</Text>
            <Text style={styles.dayNumber}>{dia.getDate()}</Text>
          </View>
        ))}
      </View>

      {/* paddingBottom extra para que el botón no tape la cuadrícula */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}>
        <View style={[styles.gridContainer, {minHeight: SCREEN_HEIGHT * 0.8}]}>
          {horas.map((h) => (
            <View key={h} style={styles.hourRow}>
              {/* Columna de las Horas */}
              <View style={[styles.timeCell, {width: TIME_COLUMN_WIDTH}]}>
                {/* Dejamos vacía la primera línea (h===0) y renderizamos el resto */}
                <Text style={styles.timeText}>{h === 0 ? "" : `${h}`}</Text>
              </View>

              {/* Grid de los Días */}
              {columnas.map((_, cidx) => (
                <View key={String(h) + "-" + cidx} style={[styles.gridCell, {width: columnWidth}]} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
  },
  daysRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
  dayCell: {
    alignItems: "center",
    paddingVertical: 8,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: "#e6e6e6",
  },
  dayName: {
    fontSize: 12,
    color: "#666",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "500",
  },
  scrollArea: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "column",
  },
  hourRow: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 60,
  },
  timeCell: {
    alignItems: "flex-end", // Empuja la hora hacia la derecha (cerca del grid)
    paddingRight: 6,
  },
  timeText: {
    fontSize: 11,
    color: "#888",
    marginTop: -7, // Truco visual: desplaza la hora hacia arriba para centrarla en la línea horizontal
    backgroundColor: "#fff",
  },
  gridCell: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: "#e6e6e6",
    height: "100%",
  },
});
