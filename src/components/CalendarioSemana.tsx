// src/components/CalendaroSemana.tsx
import React, {useMemo, useRef, useEffect} from "react";
import {View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import * as Haptics from "expo-haptics";
import {DiaLaborable, HorarioConAlumno} from "../type/types";
import {useTheme} from "../theme/useTheme";
import {Colores} from "../theme/colores";
import {Fonts} from "../theme/fonts";
import {useTranslation} from "react-i18next";

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const TIME_COLUMN_WIDTH = 48;
const HORA_ALTO = 64; // Altura en px de cada tramo de 1 hora

interface CalendaroSemanaProps {
  diasLaborables: DiaLaborable[];
  horarios: HorarioConAlumno[];
  onPressHorario: (horario: HorarioConAlumno) => void;
}

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export default function CalendaroSemana({diasLaborables, horarios, onPressHorario}: CalendaroSemanaProps) {
  const c = useTheme();
  const {t} = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scrollViewRef = useRef<ScrollView>(null);

  // 1. Filtrar únicamente los días habilitados por el usuario
  const diasActivos = useMemo(() => {
    const filtrados = diasLaborables.filter((d) => d.habilitado);
    return filtrados.length > 0 ? filtrados : ([1, 2, 3, 4, 5].map((id) => ({id, habilitado: true})) as DiaLaborable[]);
  }, [diasLaborables]);

  const columnWidth = Math.floor((SCREEN_WIDTH - TIME_COLUMN_WIDTH) / diasActivos.length);
  const horas = useMemo(() => Array.from({length: 24}, (_, i) => i), []);

  const nombresDiasCortos: Record<number, string> = {
    1: "LUN",
    2: "MAR",
    3: "MIÉ",
    4: "JUE",
    5: "VIE",
    6: "SÁB",
    7: "DOM",
  };

  // 2. Auto-scroll inteligente a la primera clase o a las 08:00
  useEffect(() => {
    let horaMinima = 8;
    if (horarios.length > 0) {
      const horasClases = horarios.map((h) => {
        const [hora] = h.horaInicio.split(":").map(Number);
        return hora;
      });
      const claseMasTemprana = Math.min(...horasClases);
      horaMinima = Math.min(8, Math.max(0, claseMasTemprana - 1));
    }

    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: horaMinima * HORA_ALTO,
        animated: true,
      });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* CABECERA FIJA DE DÍAS */}
      <View style={styles.daysHeader}>
        <View style={{width: TIME_COLUMN_WIDTH}} />
        {diasActivos.map((dia) => (
          <View key={dia.id} style={[styles.dayHeaderCell, {width: columnWidth}]}>
            <Text style={styles.dayHeaderText}>{nombresDiasCortos[dia.id] ?? t(`dias.${dia.id}`).slice(0, 3)}</Text>
          </View>
        ))}
      </View>

      {/* CUADRÍCULA DE 24 HORAS CON SCROLL */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollArea}
        contentContainerStyle={{
          height: HORA_ALTO * 24 + 100, // Margen extra inferior para que el FAB no tape nada
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridCanvas}>
          {/* LÍNEAS HORIZONTALES Y HORAS */}
          {horas.map((h) => (
            <View key={h} style={[styles.hourRow, {top: h * HORA_ALTO, height: HORA_ALTO}]}>
              <View style={[styles.timeCell, {width: TIME_COLUMN_WIDTH}]}>
                <Text style={styles.timeText}>{h < 10 ? `0${h}:00` : `${h}:00`}</Text>
              </View>
              {diasActivos.map((d) => (
                <View key={`${h}-${d.id}`} style={[styles.gridCell, {width: columnWidth}]} />
              ))}
            </View>
          ))}

          {/* CAPA FLOTANTE DE BLOQUES DE CLASES */}
          {horarios.map((horario) => {
            const colIndex = diasActivos.findIndex((d) => d.id === horario.diaId);
            if (colIndex === -1) return null; // El día está desactivado en ajustes

            const startMin = timeToMinutes(horario.horaInicio);
            const endMin = timeToMinutes(horario.horaFin);
            const durationMin = Math.max(15, endMin - startMin);

            const top = (startMin / 60) * HORA_ALTO;
            const height = Math.max(28, (durationMin / 60) * HORA_ALTO - 2);
            const left = TIME_COLUMN_WIDTH + colIndex * columnWidth + 2;
            const width = columnWidth - 4;

            return (
              <TouchableOpacity
                key={horario.id}
                activeOpacity={0.85}
                style={[
                  styles.claseCard,
                  {
                    top,
                    left,
                    width,
                    height,
                  },
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onPressHorario(horario);
                }}
              >
                <Text style={styles.claseAlumno} numberOfLines={1}>
                  {horario.alumnoNombre}
                </Text>
                {height >= 40 && (
                  <Text style={styles.claseHoras} numberOfLines={1}>
                    {horario.horaInicio} - {horario.horaFin}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: Colores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.fondo,
    },
    daysHeader: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.borde,
      backgroundColor: c.tarjeta,
      paddingVertical: 10,
    },
    dayHeaderCell: {
      alignItems: "center",
      justifyContent: "center",
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: c.borde,
    },
    dayHeaderText: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      color: c.textoP,
      letterSpacing: 0.5,
    },
    scrollArea: {
      flex: 1,
    },
    gridCanvas: {
      position: "relative",
      height: HORA_ALTO * 24,
    },
    hourRow: {
      position: "absolute",
      left: 0,
      right: 0,
      flexDirection: "row",
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.borde,
    },
    timeCell: {
      alignItems: "flex-end",
      paddingRight: 6,
    },
    timeText: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      color: c.textoT,
      marginTop: -7,
      backgroundColor: c.fondo,
      paddingHorizontal: 2,
    },
    gridCell: {
      height: "100%",
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: c.borde,
    },
    claseCard: {
      position: "absolute",
      backgroundColor: c.tarjeta,
      borderRadius: 6,
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderLeftWidth: 3.5,
      borderLeftColor: c.accion,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.borde,
      justifyContent: "flex-start",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      overflow: "hidden",
    },
    claseAlumno: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: c.textoP,
    },
    claseHoras: {
      fontSize: 9,
      fontFamily: Fonts.medium,
      color: c.textoT,
      marginTop: 1,
    },
  });
