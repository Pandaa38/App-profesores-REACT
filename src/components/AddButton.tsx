import {TouchableOpacity, StyleSheet, useColorScheme} from "react-native";
import {AntDesign, FontAwesome6} from "@expo/vector-icons";
import {useMemo} from "react";
import {useTheme} from "../theme/useTheme";
import {useAjustesContext} from "../context/AjustesContext";
import {Colores} from "../theme/colores";

type AddButtonTipo = "addAlumno" | "addHorario";

type AddButtonProps = {
  onPress: () => void;
  tipo?: AddButtonTipo;
  addAlumno?: boolean;
};

export default function AddButton({onPress, tipo, addAlumno}: AddButtonProps) {
  const resolvedTipo = tipo ?? (addAlumno ? "addAlumno" : "addHorario");
  const c = useTheme();
  const {ajustes} = useAjustesContext();
  const sistemaOscuro = useColorScheme() === "dark";
  const esModoOscuro = ajustes.tema === "oscuro" || (ajustes.tema === "sistema" && sistemaOscuro);

  const styles = useMemo(() => makeStyles(c, esModoOscuro), [c, esModoOscuro]);

  const iconColor = esModoOscuro ? c.accion : c.accionTexto;

  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      {resolvedTipo === "addHorario" ? (
        <FontAwesome6 name="add" size={24} color={iconColor} />
      ) : (
        <AntDesign name="user-add" size={32} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}

const makeStyles = (c: Colores, oscuro: boolean) =>
  StyleSheet.create({
    button: {
      backgroundColor: oscuro ? "transparent" : c.accion,
      borderWidth: oscuro ? 2 : 0,
      borderColor: c.accion,
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",

      elevation: oscuro ? 0 : 8,
      shadowColor: c.accion,
      //shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
  });
