// src/components/FormHorario.tsx
import React, {useState, useEffect, useMemo} from "react";
import {View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import WheelPicker from "@quidone/react-native-wheel-picker";
import {Alumno, DiaLaborable, HorarioConAlumno} from "../type/types";
import {useTheme} from "../theme/useTheme";
import {Colores} from "../theme/colores";
import {Fonts} from "../theme/fonts";
import {useTranslation} from "react-i18next";
import AntDesign from "@expo/vector-icons/AntDesign";

type FormHorarioProps = {
  visible: boolean;
  alumnos: Alumno[];
  dias: DiaLaborable[];
  horarioEditar?: HorarioConAlumno | null;
  onGuardar: (alumnoId: number, diasIds: number[], horaInicio: string, horaFin: string) => void;
  onCancelar: () => void;
};

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 3;

// 1. Opciones para las ruletas
const HORAS_OPCIONES = Array.from({length: 24}, (_, i) => ({
  label: i < 10 ? `0${i}` : `${i}`,
  value: i,
}));

const MINUTOS_OPCIONES = [0, 15, 30, 45].map((m) => ({
  label: m < 10 ? `0${m}` : `${m}`,
  value: m,
}));

const DURACIONES_OPCIONES = [
  {label: "30 min", value: 30},
  {label: "45 min", value: 45},
  {label: "1h 00m", value: 60},
  {label: "1h 15m", value: 75},
  {label: "1h 30m", value: 90},
  {label: "1h 45m", value: 105},
  {label: "2h 00m", value: 120},
];

export default function FormularioHorario({
  visible,
  alumnos,
  dias,
  horarioEditar,
  onGuardar,
  onCancelar,
}: FormHorarioProps) {
  const c = useTheme();
  const {t} = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);

  // Estados del formulario
  const [alumnoId, setAlumnoId] = useState<number | null>(null);
  const [diasSeleccionados, setDiasSeleccionados] = useState<number[]>([]);
  const [horaInicioH, setHoraInicioH] = useState<number>(16);
  const [horaInicioM, setHoraInicioM] = useState<number>(0);
  const [duracionMinutos, setDuracionMinutos] = useState<number>(60);
  const [dropdownAlumnoVisible, setDropdownAlumnoVisible] = useState(false);

  // Inicialización y modo edición
  useEffect(() => {
    if (horarioEditar) {
      setAlumnoId(horarioEditar.alumnoId);
      setDiasSeleccionados([horarioEditar.diaId]);

      const [hIni, mIni] = horarioEditar.horaInicio.split(":").map(Number);
      const [hFin, mFin] = horarioEditar.horaFin.split(":").map(Number);

      setHoraInicioH(hIni);
      setHoraInicioM(mIni);

      const duracion = hFin * 60 + mFin - (hIni * 60 + mIni);
      const duracionValida = DURACIONES_OPCIONES.some((d) => d.value === duracion) ? duracion : 60;
      setDuracionMinutos(duracionValida);
    } else {
      setAlumnoId(null);
      setDiasSeleccionados([]);
      setHoraInicioH(16);
      setHoraInicioM(0);
      setDuracionMinutos(60);
    }
    setDropdownAlumnoVisible(false);
  }, [visible, horarioEditar]);

  // Cálculo derivado de la hora de finalización
  const {horaInicioStr, horaFinStr} = useMemo(() => {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const inicioStr = `${pad(horaInicioH)}:${pad(horaInicioM)}`;

    const totalMinutosFin = horaInicioH * 60 + horaInicioM + duracionMinutos;
    const finH = Math.min(23, Math.floor(totalMinutosFin / 60));
    const finM = totalMinutosFin >= 24 * 60 ? 59 : totalMinutosFin % 60;

    return {
      horaInicioStr: inicioStr,
      horaFinStr: `${pad(finH)}:${pad(finM)}`,
    };
  }, [horaInicioH, horaInicioM, duracionMinutos]);

  const toggleDia = (id: number) => {
    if (horarioEditar) {
      setDiasSeleccionados([id]); // En edición solo se permite seleccionar un día
      return;
    }
    setDiasSeleccionados((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  };

  const handleGuardar = () => {
    if (alumnoId === null || diasSeleccionados.length === 0) return;
    onGuardar(alumnoId, diasSeleccionados, horaInicioStr, horaFinStr);
  };

  const alumnoSeleccionado = alumnos.find((a) => a.id === alumnoId);
  const diasSemanaNombres = ["", "L", "M", "X", "J", "V", "S", "D"];
  const puedeGuardar = alumnoId !== null && diasSeleccionados.length > 0;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.fondo}>
        <View style={styles.contenedor}>
          {/* Cabecera */}
          <View style={styles.cabecera}>
            <Text style={styles.titulo}>{horarioEditar ? "Editar Horario" : "Nuevo Horario"}</Text>
            <TouchableOpacity onPress={onCancelar}>
              <AntDesign name="close" size={20} color={c.textoT} />
            </TouchableOpacity>
          </View>

          {/* 1. Selector de Alumno */}
          <Text style={styles.seccionLabel}>ALUMNO</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownAlumnoVisible(!dropdownAlumnoVisible)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dropdownTexto, !alumnoSeleccionado && {color: c.textoT}]}>
              {alumnoSeleccionado
                ? `${alumnoSeleccionado.nombre} (${alumnoSeleccionado.precioPorHora}€/h)`
                : "Seleccionar alumno"}
            </Text>
            <AntDesign name={dropdownAlumnoVisible ? "up" : "down"} size={14} color={c.textoT} />
          </TouchableOpacity>

          {dropdownAlumnoVisible && (
            <ScrollView style={styles.dropdownLista} nestedScrollEnabled>
              {alumnos.map((a) => (
                <TouchableOpacity
                  key={a.id}
                  style={[styles.dropdownItem, alumnoId === a.id && styles.dropdownItemActivo]}
                  onPress={() => {
                    setAlumnoId(a.id);
                    setDropdownAlumnoVisible(false);
                  }}
                >
                  <Text style={[styles.dropdownItemTexto, alumnoId === a.id && styles.dropdownItemTextoActivo]}>
                    {a.nombre}
                  </Text>
                  <Text style={styles.dropdownTarifa}>{a.precioPorHora}€/h</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* 2. Selector de Días (Chips) */}
          <Text style={styles.seccionLabel}>DÍAS DE LA SEMANA</Text>
          <View style={styles.diasContainer}>
            {dias.map((d) => {
              const activo = diasSeleccionados.includes(d.id);
              return (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.diaChip, activo && styles.diaChipActivo]}
                  onPress={() => toggleDia(d.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.diaChipTexto, activo && styles.diaChipTextoActivo]}>
                    {diasSemanaNombres[d.id]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 3. Ruletas con @quidone/react-native-wheel-picker */}
          <Text style={styles.seccionLabel}>HORA DE INICIO Y DURACIÓN</Text>
          <View style={styles.ruletasRow}>
            {/* Ruleta: Hora Inicio */}
            <View style={styles.ruletaBloque}>
              <Text style={styles.ruletaSubtitulo}>Inicio</Text>
              <View style={styles.ruletaDoble}>
                <WheelPicker
                  data={HORAS_OPCIONES}
                  value={horaInicioH}
                  onValueChanged={({item}) => setHoraInicioH(item.value)}
                  itemHeight={ITEM_HEIGHT}
                  visibleItemCount={VISIBLE_COUNT}
                  style={{width: 56, height: ITEM_HEIGHT * VISIBLE_COUNT}}
                  itemTextStyle={{
                    color: c.textoT,
                    fontSize: 16,
                    fontFamily: Fonts.medium,
                  }}
                  overlayItemStyle={{
                    backgroundColor: "transparent",
                    borderTopWidth: 1.5,
                    borderBottomWidth: 1.5,
                    borderColor: c.accion,
                  }}
                />
                <Text style={styles.dosPuntos}>:</Text>
                <WheelPicker
                  data={MINUTOS_OPCIONES}
                  value={horaInicioM}
                  onValueChanged={({item}) => setHoraInicioM(item.value)}
                  itemHeight={ITEM_HEIGHT}
                  visibleItemCount={VISIBLE_COUNT}
                  style={{width: 56, height: ITEM_HEIGHT * VISIBLE_COUNT}}
                  itemTextStyle={{
                    color: c.textoT,
                    fontSize: 16,
                    fontFamily: Fonts.medium,
                  }}
                  overlayItemStyle={{
                    backgroundColor: "transparent",
                    borderTopWidth: 1.5,
                    borderBottomWidth: 1.5,
                    borderColor: c.accion,
                  }}
                />
              </View>
            </View>

            {/* Ruleta: Duración */}
            <View style={styles.ruletaBloque}>
              <Text style={styles.ruletaSubtitulo}>Duración</Text>
              <WheelPicker
                data={DURACIONES_OPCIONES}
                value={duracionMinutos}
                onValueChanged={({item}) => setDuracionMinutos(item.value)}
                itemHeight={ITEM_HEIGHT}
                visibleItemCount={VISIBLE_COUNT}
                style={{width: 110, height: ITEM_HEIGHT * VISIBLE_COUNT}}
                itemTextStyle={{
                  color: c.textoT,
                  fontSize: 15,
                  fontFamily: Fonts.medium,
                }}
                overlayItemStyle={{
                  backgroundColor: "transparent",
                  borderTopWidth: 1.5,
                  borderBottomWidth: 1.5,
                  borderColor: c.accion,
                }}
              />
            </View>
          </View>

          {/* Feedback de hora fin calculada */}
          <View style={styles.previewFin}>
            <Text style={styles.previewTexto}>
              Termina a las: <Text style={styles.previewHora}>{horaFinStr}</Text>
            </Text>
          </View>

          {/* 4. Botones de Acción */}
          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>{t("form.cancelar")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonGuardar, !puedeGuardar && styles.botonDeshabilitado]}
              onPress={handleGuardar}
              disabled={!puedeGuardar}
            >
              <Text style={styles.textoGuardar}>{t("form.guardar")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (c: Colores) =>
  StyleSheet.create({
    fondo: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    contenedor: {
      backgroundColor: c.tarjeta,
      borderRadius: 16,
      padding: 20,
      width: "100%",
      maxWidth: 380,
      gap: 10,
    },
    cabecera: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    titulo: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: c.textoP,
    },
    seccionLabel: {
      fontSize: 11,
      fontFamily: Fonts.semibold,
      color: c.textoT,
      letterSpacing: 0.5,
      marginTop: 4,
    },
    dropdown: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.borde,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: c.fondo,
    },
    dropdownTexto: {
      fontSize: 14,
      fontFamily: Fonts.medium,
      color: c.textoP,
    },
    dropdownLista: {
      maxHeight: 120,
      borderWidth: 1,
      borderColor: c.borde,
      borderRadius: 8,
      backgroundColor: c.tarjeta,
      marginTop: -4,
    },
    dropdownItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.borde,
    },
    dropdownItemActivo: {
      backgroundColor: c.fondo,
    },
    dropdownItemTexto: {
      fontSize: 14,
      color: c.textoP,
      fontFamily: Fonts.regular,
    },
    dropdownItemTextoActivo: {
      fontFamily: Fonts.semibold,
    },
    dropdownTarifa: {
      fontSize: 12,
      color: c.textoS,
      fontFamily: Fonts.medium,
    },
    diasContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 4,
    },
    diaChip: {
      flex: 1,
      height: 38,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: c.borde,
      backgroundColor: c.fondo,
      alignItems: "center",
      justifyContent: "center",
    },
    diaChipActivo: {
      backgroundColor: c.accion,
      borderColor: c.accion,
    },
    diaChipTexto: {
      fontSize: 13,
      fontFamily: Fonts.semibold,
      color: c.textoS,
    },
    diaChipTextoActivo: {
      color: c.accionTexto,
    },
    ruletasRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 2,
    },
    ruletaBloque: {
      alignItems: "center",
      gap: 4,
    },
    ruletaSubtitulo: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: c.textoS,
    },
    ruletaDoble: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    dosPuntos: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: c.textoP,
    },
    previewFin: {
      alignItems: "center",
      paddingVertical: 4,
    },
    previewTexto: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: c.textoS,
    },
    previewHora: {
      fontFamily: Fonts.bold,
      color: c.textoP,
    },
    botones: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 12,
      marginTop: 6,
    },
    botonCancelar: {
      paddingVertical: 10,
      paddingHorizontal: 14,
    },
    textoCancelar: {
      fontSize: 14,
      fontFamily: Fonts.medium,
      color: c.textoS,
    },
    botonGuardar: {
      backgroundColor: c.accion,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    botonDeshabilitado: {
      opacity: 0.45,
    },
    textoGuardar: {
      fontSize: 14,
      fontFamily: Fonts.semibold,
      color: c.accionTexto,
    },
  });
