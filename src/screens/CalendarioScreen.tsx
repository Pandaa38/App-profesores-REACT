import {useMemo, useState, useRef} from "react";
import {StyleSheet, View, Alert, Animated} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import Header from "../components/Header";
import CalendaroSemana from "../components/CalendarioSemana";
import AddButton from "../components/AddButton";
import FormularioHorario from "../components/FormHorario";

import {useTheme} from "../theme/useTheme";
import {Colores} from "../theme/colores";
import {useTranslation} from "react-i18next";
import {useCalendarioContext} from "../context/CalendarioContext";
import {useAlumnos} from "../hooks/useAlumnos";
import {HorarioConAlumno} from "../type/types";

export default function CalendarioScreen() {
  const c = useTheme();
  const {t} = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Estados locales para el modal y edición
  const [formVisible, setFormVisible] = useState(false);
  const [horarioEditar, setHorarioEditar] = useState<HorarioConAlumno | null>(null);

  // Hooks y contexto
  const {alumnos} = useAlumnos();
  const {horarios, diasLaborables, crearHorariosMultiples, crearHorario, editarHorario, eliminarHorario} =
    useCalendarioContext();

  const diasActivos = useMemo(() => diasLaborables.filter((d) => d.habilitado), [diasLaborables]);

  // Al pulsar una clase en la cuadrícula: opciones de Editar o Eliminar
  const handlePressHorario = (horario: HorarioConAlumno) => {
    const nombresDias = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const diaNombre = t(`dias.${horario.diaId}`, {
      defaultValue: nombresDias[horario.diaId],
    });

    Alert.alert(horario.alumnoNombre, `${diaNombre} • ${horario.horaInicio} - ${horario.horaFin}`, [
      {
        text: t("alumnos.cancelar", {defaultValue: "Cancelar"}),
        style: "cancel",
      },
      {
        text: t("alumnos.eliminar", {defaultValue: "Eliminar"}),
        style: "destructive",
        onPress: () => eliminarHorario(horario.id),
      },
      {
        text: t("form.editarAlumno", {defaultValue: "Editar"}),
        onPress: () => {
          setHorarioEditar(horario);
          setFormVisible(true);
        },
      },
    ]);
  };

  // Guardado de horarios (Crear múltiples o Editar uno)
  const handleGuardarHorario = (alumnoId: number, diasIds: number[], horaInicio: string, horaFin: string) => {
    if (diasIds.length === 0) return;

    if (horarioEditar) {
      editarHorario(horarioEditar.id, diasIds[0], horaInicio, horaFin);
    } else {
      if (crearHorariosMultiples) {
        crearHorariosMultiples(alumnoId, diasIds, horaInicio, horaFin);
      } else {
        diasIds.forEach((diaId) => {
          crearHorario(alumnoId, diaId, horaInicio, horaFin);
        });
      }
    }

    setFormVisible(false);
    setHorarioEditar(null);
  };

  const handleAbrirNuevo = () => {
    setHorarioEditar(null);
    setFormVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header title={t("ajustes.calendario", {defaultValue: "Calendario"})} scrollY={scrollY} />

      {/* Cuadrícula semanal de clases */}
      <CalendaroSemana diasLaborables={diasLaborables} horarios={horarios} onPressHorario={handlePressHorario} />

      {/* Botón flotante para añadir clase */}
      <View style={styles.fabContainer}>
        <AddButton tipo="addHorario" onPress={handleAbrirNuevo} />
      </View>

      {/* Formulario Modal con ruletas y selección múltiple */}
      <FormularioHorario
        visible={formVisible}
        alumnos={alumnos}
        dias={diasActivos}
        horarioEditar={horarioEditar}
        onGuardar={handleGuardarHorario}
        onCancelar={() => {
          setFormVisible(false);
          setHorarioEditar(null);
        }}
      />
    </SafeAreaView>
  );
}

const makeStyles = (c: Colores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.fondo,
      width: "100%",
    },
    fabContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
      zIndex: 10,
    },
  });
