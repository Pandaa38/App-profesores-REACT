import {View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView} from "react-native";
import {useEffect, useState, useMemo} from "react";
import {Alumno, DiaLaborable} from "../type/types"; // <-- Importamos DiaLaborable
import {useTheme} from "../theme/useTheme";
import {Colores} from "../theme/colores";
import {useTranslation} from "react-i18next";
import AntDesign from "@expo/vector-icons/AntDesign";

type FormHorarioProps = {
  visible: boolean;
  alumnos: Alumno[];
  dias: DiaLaborable[]; // <-- Tipado corregido
  horarioEditar?: {alumnoId: number | null; diaId: number | null; horaInicio: string; horaFin: string};
  onGuardar: (alumnoId: number, diaId: number, horaInicio: string, horaFin: string) => void;
  onCancelar: () => void;
};

export default function FormularioHorario({
  visible,
  alumnos,
  dias,
  horarioEditar,
  onGuardar,
  onCancelar,
}: FormHorarioProps) {
  const [alumnoId, setAlumnoId] = useState<number | null>(null);
  const [diaId, setDiaId] = useState<number | null>(null);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // <-- Estados independientes para cada desplegable
  const [dropdownAlumnoAbierto, setDropdownAlumnoAbierto] = useState(false);
  const [dropdownDiaAbierto, setDropdownDiaAbierto] = useState(false);

  const c = useTheme();
  const {t} = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);

  const alumnoSeleccionado = alumnos.find((a) => a.id === alumnoId);
  const diaSeleccionado = dias.find((d) => d.id === diaId);

  // Función para obtener el nombre del día traducido
  const getNombreDia = (id: number) => t(`dias.${id}`);

  useEffect(() => {
    if (horarioEditar) {
      setAlumnoId(horarioEditar.alumnoId);
      setDiaId(horarioEditar.diaId);
      setHoraInicio(horarioEditar.horaInicio);
      setHoraFin(horarioEditar.horaFin);
    } else {
      setAlumnoId(null);
      setDiaId(null);
      setHoraInicio("");
      setHoraFin("");
    }
    setDropdownAlumnoAbierto(false);
    setDropdownDiaAbierto(false);
  }, [visible, horarioEditar]);

  const handleGuardar = () => {
    if (!horaInicio.trim() || !horaFin.trim() || alumnoId === null || diaId === null) return;

    onGuardar(alumnoId, diaId, horaInicio.trim(), horaFin.trim());

    setAlumnoId(null);
    setDiaId(null);
    setHoraInicio("");
    setHoraFin("");
    setDropdownAlumnoAbierto(false);
    setDropdownDiaAbierto(false);
  };

  const toggleAlumnoDropdown = () => {
    setDropdownAlumnoAbierto((prev) => !prev);
    setDropdownDiaAbierto(false); // Cierra el otro
  };

  const toggleDiaDropdown = () => {
    setDropdownDiaAbierto((prev) => !prev);
    setDropdownAlumnoAbierto(false); // Cierra el otro
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.fondo}>
        <View style={styles.formulario}>
          <Text style={styles.titulo}>{horarioEditar ? "Editar Horario" : "Nuevo Horario"}</Text>

          {/* DROPDOWN ALUMNO */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleAlumnoDropdown}>
              <Text style={styles.dropdownTexto}>
                {alumnoSeleccionado ? alumnoSeleccionado.nombre : "Selecciona un alumno"}
              </Text>
              <AntDesign name={dropdownAlumnoAbierto ? "up" : "down"} size={14} color={c.textoS} />
            </TouchableOpacity>

            {dropdownAlumnoAbierto && (
              <ScrollView style={styles.dropdownLista} nestedScrollEnabled={true}>
                {alumnos.map((alumno) => (
                  <TouchableOpacity
                    key={`al-${alumno.id}`}
                    style={[styles.dropdownItem, alumnoId === alumno.id && styles.dropdownItemActivo]}
                    onPress={() => {
                      setAlumnoId(alumno.id);
                      setDropdownAlumnoAbierto(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemTexto, alumnoId === alumno.id && styles.dropdownItemTextoActivo]}>
                      {alumno.nombre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* DROPDOWN DIA */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDiaDropdown}>
              <Text style={styles.dropdownTexto}>
                {diaSeleccionado ? getNombreDia(diaSeleccionado.id) : "Selecciona un día"}
              </Text>
              <AntDesign name={dropdownDiaAbierto ? "up" : "down"} size={14} color={c.textoS} />
            </TouchableOpacity>

            {dropdownDiaAbierto && (
              <ScrollView style={styles.dropdownLista} nestedScrollEnabled={true}>
                {dias.map((dia) => (
                  <TouchableOpacity
                    key={`dia-${dia.id}`}
                    style={[styles.dropdownItem, diaId === dia.id && styles.dropdownItemActivo]}
                    onPress={() => {
                      setDiaId(dia.id);
                      setDropdownDiaAbierto(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemTexto, diaId === dia.id && styles.dropdownItemTextoActivo]}>
                      {getNombreDia(dia.id)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder={"Hora Inicio (ej: 16:00)"}
            placeholderTextColor={c.textoT}
            value={horaInicio}
            onChangeText={setHoraInicio}
          />

          <TextInput
            style={styles.input}
            placeholder={"Hora Fin (ej: 17:00)"}
            placeholderTextColor={c.textoT}
            value={horaFin}
            onChangeText={setHoraFin}
          />

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>{t("form.cancelar")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
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
    },
    formulario: {
      backgroundColor: c.tarjeta,
      borderRadius: 12,
      padding: 24,
      width: "85%",
      gap: 12,
    },
    titulo: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: c.textoP,
    },
    dropdownContainer: {
      gap: 4,
    },
    dropdown: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.borde,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: c.fondo,
    },
    dropdownTexto: {
      fontSize: 14,
      color: c.textoP,
      flex: 1,
    },
    dropdownLista: {
      borderWidth: 1,
      borderColor: c.borde,
      borderRadius: 8,
      backgroundColor: c.tarjeta,
      maxHeight: 180,
      marginTop: 2,
    },
    dropdownItem: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.borde,
    },
    dropdownItemActivo: {
      backgroundColor: c.fondo,
    },
    dropdownItemTexto: {
      fontSize: 14,
      color: c.textoS,
    },
    dropdownItemTextoActivo: {
      fontWeight: "600",
      color: c.textoP,
    },
    input: {
      borderWidth: 1,
      borderColor: c.borde,
      borderRadius: 8,
      padding: 10,
      fontSize: 14,
      color: c.textoP,
      backgroundColor: c.fondo,
    },
    botones: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 8,
    },
    botonCancelar: {
      padding: 10,
    },
    textoCancelar: {
      color: c.textoS,
      fontWeight: "600",
    },
    botonGuardar: {
      backgroundColor: c.accion,
      padding: 10,
      borderRadius: 8,
      paddingHorizontal: 20,
    },
    textoGuardar: {
      color: c.accionTexto,
      fontWeight: "600",
    },
  });
