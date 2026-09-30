import {useEffect, useMemo, useRef, useState} from "react";
import {StyleSheet, View, Animated} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";

import Header from "../components/Header";
import CalendaroSemana from "../components/CalendaroSemana";
import AddButton from "../components/AddButton";
import FormularioHorario from "../components/FormHorario";

import {useTheme} from "../theme/useTheme";
import {Colores} from "../theme/colores";
import {useTranslation} from "react-i18next";
import {useAjustesContext} from "../context/AjustesContext";
import {useAlumnos} from "../hooks/useAlumnos";

function calcularSemanaSiguiente(lunes: Date, semanas: number) {
  const nuevaFecha = new Date(lunes);
  nuevaFecha.setDate(nuevaFecha.getDate() + semanas * 7);
  return nuevaFecha;
}

function calcularSemanaAnterior(lunes: Date, semanas: number) {
  const nuevaFecha = new Date(lunes);
  nuevaFecha.setDate(nuevaFecha.getDate() - semanas * 7);
  return nuevaFecha;
}

export default function CalendarioScreen() {
  const c = useTheme();
  const {t} = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const pagerRef = useRef<PagerView>(null);

  const posicionPendiente = useRef<number | null>(null);

  const [formVisible, setFormVisible] = useState(false);

  const {alumnos} = useAlumnos();
  const {calendario} = useAjustesContext();
  const {lunesActual, diasLaborables, avanzarSemana, retrocederSemana, crearHorario} = calendario;
  const diasActivos = useMemo(() => diasLaborables.filter((d) => d.habilitado), [diasLaborables]);

  const semanaPasada = useMemo(() => calcularSemanaAnterior(lunesActual, 1), [lunesActual]);
  const semanaQueViene = useMemo(() => calcularSemanaSiguiente(lunesActual, 1), [lunesActual]);

  useEffect(() => {
    pagerRef.current?.setPageWithoutAnimation(1);
  }, [lunesActual]);

  const handlePageSelected = (e: any) => {
    posicionPendiente.current = e.nativeEvent.position;
  };

  const handlePageScrollStateChanged = (e: any) => {
    if (e.nativeEvent.pageScrollState === "idle" && posicionPendiente.current !== null) {
      if (posicionPendiente.current === 0) {
        retrocederSemana();
      } else if (posicionPendiente.current === 2) {
        avanzarSemana();
      }
      posicionPendiente.current = null;
    }
  };

  const handleGuardarHorario = (alumnoId: number | null, diaId: number | null, horaInicio: string, horaFin: string) => {
    if (alumnoId === null || diaId === null) return;

    crearHorario(alumnoId, diaId, horaInicio, horaFin);
    setFormVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="Calendario" scrollY={scrollY} />

        <PagerView
          ref={pagerRef}
          style={styles.pager}
          initialPage={1}
          onPageSelected={handlePageSelected}
          onPageScrollStateChanged={handlePageScrollStateChanged}
          overdrag={false}
        >
          <View key="pasado">
            <CalendaroSemana lunesActual={semanaPasada} diasLaborables={diasLaborables} />
          </View>

          <View key="presente">
            <CalendaroSemana lunesActual={lunesActual} diasLaborables={diasLaborables} />
          </View>

          <View key="futuro">
            <CalendaroSemana lunesActual={semanaQueViene} diasLaborables={diasLaborables} />
          </View>
        </PagerView>

        <View style={styles.fabContainer}>
          <AddButton tipo="addHorario" onPress={() => setFormVisible(true)} />
        </View>

        <FormularioHorario
          visible={formVisible}
          alumnos={alumnos}
          dias={diasActivos}
          onGuardar={handleGuardarHorario}
          onCancelar={() => setFormVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const makeStyles = (c: Colores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.fondo,
      width: "100%",
    },
    pager: {
      flex: 1,
      width: "100%",
    },
    gradientBottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 120,
    },
    fabContainer: {
      position: "absolute",
      bottom: 10,
      right: 20,
      alignSelf: "center",
      zIndex: 10,
    },
  });
