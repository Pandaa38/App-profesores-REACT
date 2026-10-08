// HACEN LAS COSAS FUNCIONAR
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  useColorScheme,
  Animated,
} from "react-native";
import {useMemo, useRef, useEffect, useState} from "react";
import {useAjustesContext} from "../context/AjustesContext";
import {useCalendarioContext} from "../context/CalendarioContext";

// COLORCITOS
import {useTheme} from "../theme/useTheme";
import {Colores} from "../theme/colores";
import {Fonts} from "../theme/fonts";
import Constants from "expo-constants";

// MODO ME CREO INTERNACIONAL
import {Tema, Moneda, Idioma} from "../hooks/useAjustes";
import {useTranslation} from "react-i18next";

// COMPONENTES
import ScreenLayout from "../components/ScreenLayout";
import SelectorChips from "../components/SelectorChips";

// ICONOS
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AjustesScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {ajustes, actualizarTema, actualizarMoneda, actualizarIdioma} = useAjustesContext();
  const {diasLaborables, toggleDiaLaborable} = useCalendarioContext();
  const c = useTheme();
  const colorScheme = useColorScheme();
  const esOscuro = ajustes.tema === "oscuro" || (ajustes.tema === "sistema" && colorScheme === "dark");
  const {t} = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);

  const appName = Constants.expoConfig?.name ?? "TutorApp";

  const mostrarProximamente = (funcion: string) => {
    Alert.alert(t("ajustes.proximamente"), t("ajustes.proximamenteMsg", {funcion}), [{text: "OK"}]);
  };

  const temas: {label: string; value: Tema}[] = [
    {label: t("ajustes.temaClaro"), value: "claro"},
    {label: t("ajustes.temaOscuro"), value: "oscuro"},
    {label: t("ajustes.temaSistema"), value: "sistema"},
  ];

  const monedas: {label: string; value: Moneda}[] = [
    {label: "€", value: "€"},
    {label: "$", value: "$"},
    {label: "£", value: "£"},
  ];

  const idiomas: {label: string; value: Idioma}[] = [
    {label: "Español", value: "es"},
    {label: "English", value: "en"},
  ];

  const [diasExpanded, setDiasExpanded] = useState(false);

  const getNombreDia = (id: number) => {
    const nombresDias = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return t(`dias.${id}`, {defaultValue: nombresDias[id]});
  };

  return (
    <>
      <ScreenLayout
        title={t("ajustes.titulo")}
        scrollY={scrollY}
        showGradient={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
        scrollEventThrottle={16}
      >
        {/* APARIENCIA */}
        <Text style={styles.seccionTitulo}>{t("ajustes.apariencia")}</Text>
        <View style={styles.bloque}>
          <Text style={styles.opcionLabel}>{t("ajustes.tema")}</Text>
          <SelectorChips opciones={temas} valorActual={ajustes.tema} onSelect={actualizarTema} />
        </View>

        {/* PREFERENCIAS */}
        <Text style={styles.seccionTitulo}>{t("ajustes.preferencias")}</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>{t("ajustes.moneda")}</Text>
            <SelectorChips opciones={monedas} valorActual={ajustes.moneda} onSelect={actualizarMoneda} />
          </View>
        </View>

        {/* IDIOMA */}
        <Text style={styles.seccionTitulo}>{t("ajustes.idioma")}</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>{t("ajustes.seleccionarIdioma")}</Text>
            <SelectorChips opciones={idiomas} valorActual={ajustes.idioma} onSelect={actualizarIdioma} />
          </View>
        </View>

        {/* DIAS */}
        <Text style={styles.seccionTitulo}>{t("ajustes.calendario", {defaultValue: "CALENDARIO"})}</Text>
        <View style={styles.bloque}>
          <TouchableOpacity
            style={styles.opcionFila}
            onPress={() => setDiasExpanded(!diasExpanded)}
            activeOpacity={0.7}
          >
            <Text style={styles.opcionLabel}>{t("ajustes.diasLaborables", {defaultValue: "Días Laborables"})}</Text>
            <AntDesign name={diasExpanded ? "up" : "down"} size={18} color={c.textoT} />
          </TouchableOpacity>

          {/* Si está expandido, renderizamos la lista */}
          {diasExpanded && (
            <View style={styles.diasContainer}>
              <View style={styles.divisor} />
              {diasLaborables.map((dia) => (
                <TouchableOpacity
                  key={dia.id}
                  style={styles.diaFila}
                  onPress={() => toggleDiaLaborable(dia.id, dia.habilitado)}
                  activeOpacity={0.6}
                >
                  <Text style={[styles.diaTexto, !dia.habilitado && styles.diaTextoInactivo]}>
                    {getNombreDia(dia.id)}
                  </Text>

                  {/* Cajita tipo Checkbox */}
                  <View style={[styles.checkbox, dia.habilitado && styles.checkboxActivo]}>
                    {dia.habilitado && <AntDesign name="check" size={14} color={c.fondo} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* DATOS */}
        <Text style={styles.seccionTitulo}>{t("ajustes.datos")}</Text>
        <View style={styles.bloque}>
          <TouchableOpacity
            style={styles.botonProximamente}
            onPress={() => mostrarProximamente(t("ajustes.exportarCSV"))}
          >
            <AntDesign name="export" size={20} color={c.textoP} />
            <Text style={styles.botonProximamenteTexto}>{t("ajustes.exportarCSV")}</Text>
            <Text style={styles.proximamenteTag}>{t("ajustes.proximamente")}</Text>
          </TouchableOpacity>
        </View>

        {/* ACERCA DE */}
        <Text style={styles.seccionTitulo}>{t("ajustes.acercaDe")}</Text>
        <View style={styles.bloque}>
          <View style={styles.opcionFila}>
            <Text style={styles.opcionLabel}>{t("ajustes.version")}</Text>
            <Text style={styles.versionTexto}>{Constants.expoConfig?.version ?? "1.0.0"}</Text>
          </View>
        </View>

        {/* LOGO */}
        <View style={styles.logoFooter}>
          <View style={[styles.logoMedallon, esOscuro ? styles.logoMedallonOscuro : styles.logoMedallonClaro]}>
            <Image style={styles.logoImagen} source={require("../../assets/adaptive-icon.png")} />
          </View>
          <Text style={styles.logoTexto}>{appName}</Text>
        </View>
      </ScreenLayout>
    </>
  );
}

const makeStyles = (c: Colores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.fondo,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 100,
      gap: 8,
    },
    seccionTitulo: {
      fontSize: 12,
      fontFamily: Fonts.semibold,
      color: c.textoT,
      marginTop: 16,
      marginLeft: 4,
      letterSpacing: 0.8,
    },
    bloque: {
      backgroundColor: c.tarjeta,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.06,
      shadowRadius: 3,
      elevation: 2,
      gap: 12,
    },
    opcionFila: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 8,
    },
    opcionLabel: {
      fontSize: 15,
      color: c.textoP,
      fontFamily: Fonts.medium,
    },
    divisor: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: c.borde,
    },
    botonProximamente: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    botonProximamenteTexto: {
      flex: 1,
      fontSize: 15,
      color: c.textoP,
      fontFamily: Fonts.medium,
    },
    proximamenteTag: {
      fontSize: 12,
      color: c.textoT,
      fontStyle: "italic",
    },
    versionTexto: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: c.textoT,
    },
    logoFooter: {
      alignItems: "center",
      marginTop: 14,
      marginBottom: 50,
      gap: 8,
    },
    logoMedallon: {
      width: 92,
      height: 92,
      borderRadius: 46,
      backgroundColor: c.tarjeta,
      borderWidth: 1,
      borderColor: c.borde,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
    },
    logoMedallonClaro: {
      shadowOpacity: 0.12,
      elevation: 5,
    },
    logoMedallonOscuro: {
      shadowOpacity: 0.28,
      elevation: 2,
      borderColor: c.textoT,
    },
    logoImagen: {
      width: 58,
      height: 58,
      borderRadius: 29,
    },
    logoTexto: {
      fontSize: 12,
      color: c.textoT,
      fontFamily: Fonts.medium,
      letterSpacing: 0.4,
    },
    diasContainer: {
      marginTop: 4,
      gap: 10,
    },
    diaFila: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 6,
      paddingHorizontal: 4,
    },
    diaTexto: {
      fontSize: 14,
      color: c.textoP,
      fontFamily: Fonts.regular,
    },
    diaTextoInactivo: {
      color: c.textoT,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 1.5,
      borderColor: c.borde,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: c.fondo,
    },
    checkboxActivo: {
      backgroundColor: c.accion,
      borderColor: c.accion,
    },
  });
