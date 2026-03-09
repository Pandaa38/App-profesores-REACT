import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useMemo } from 'react';
import { Alumno } from '../type/types';
import { AntDesign } from '@expo/vector-icons';
import { useAjustesContext } from '../context/AjustesContext';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';

type AlumnoCardProps = {
  alumno: Alumno;
  onCobrar: (alumno: Alumno) => void;
  onAddHoras: (alumno: Alumno, horas: number) => void;
  onEliminar: (alumno: Alumno) => void;
  onEditar: (alumno: Alumno) => void;
};

export default function AlumnoCard({ alumno, onCobrar, onAddHoras, onEliminar, onEditar }: AlumnoCardProps) {
  const deudaTotal = alumno.horasPendientes * alumno.precioPorHora;
  const { ajustes } = useAjustesContext();
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const confirmarEliminacion = () => {
    if (Platform.OS === 'web') {
      const confirmado = window.confirm(`¿Estás seguro de que quieres eliminar a ${alumno.nombre}?`);
      if (confirmado) onEliminar(alumno);
    } else {
      Alert.alert(
        'Confirmar eliminación',
        `¿Eliminar a ${alumno.nombre}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: () => onEliminar(alumno) }
        ]
      );
    }
  };

  return (
    <View style={styles.card}>

      {/* CABECERA */}
      <View style={styles.cabecera}>
        <Text style={styles.nombre}>{alumno.nombre}</Text>
        <View style={styles.contenedorDerecha}>
          <Text style={styles.tarifa}>{alumno.precioPorHora}{ajustes.moneda}/h</Text>
          <TouchableOpacity onPress={confirmarEliminacion} style={styles.botonEliminar}>
            <AntDesign name="delete" size={20} color={c.textoT} />
          </TouchableOpacity>
        </View>
      </View>

      {/* PANEL DE DATOS */}
      <View style={styles.panelDatos}>
        <View style={styles.cajaDato}>
          <Text style={styles.numeroGrande}>
            {alumno.horasPendientes}<Text style={styles.unidades}>h</Text>
          </Text>
          <Text style={styles.etiquetaDato}>Pendientes</Text>
        </View>
        <View style={styles.divisor} />
        <View style={styles.cajaDato}>
          <Text style={[styles.numeroGrande, deudaTotal > 0 && styles.textoDeuda]}>
            {deudaTotal}<Text style={styles.unidades}>{ajustes.moneda}</Text>
          </Text>
          <Text style={styles.etiquetaDato}>Deuda</Text>
        </View>
      </View>

      {/* BOTONERA */}
      <View style={styles.filaBotones}>
        <View style={styles.grupoBotonesHoras}>
          <TouchableOpacity style={styles.botonSecundario} onPress={() => onAddHoras(alumno, 0.5)}>
            <Text style={styles.textoBotonSecundario}>+0.5h</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonSecundario} onPress={() => onAddHoras(alumno, 1)}>
            <Text style={styles.textoBotonSecundario}>+1h</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonSecundario} onPress={() => onEditar(alumno)}>
            <AntDesign name="edit" size={20} color={c.textoS} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.botonPrincipal, deudaTotal === 0 && styles.botonDesactivado]}
          onPress={() => onCobrar(alumno)}
          disabled={deudaTotal === 0}
        >
          <Text style={styles.textoBotonPrincipal}>Cobrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  card: {
    backgroundColor: c.tarjeta,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: '5%',
    width: '90%',
    borderWidth: 1,
    borderColor: c.borde,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contenedorDerecha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: c.textoP,
  },
  tarifa: {
    fontSize: 13,
    color: c.textoS,
    fontWeight: '600',
    backgroundColor: c.fondo,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  botonEliminar: {
    padding: 4,
  },
  panelDatos: {
    flexDirection: 'row',
    backgroundColor: c.fondo,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  cajaDato: {
    flex: 1,
    alignItems: 'center',
  },
  divisor: {
    width: 1,
    backgroundColor: c.borde,
    marginVertical: 4,
  },
  numeroGrande: {
    fontSize: 28,
    fontWeight: '800',
    color: c.textoP,
  },
  unidades: {
    fontSize: 16,
    fontWeight: '600',
    color: c.textoT,
  },
  textoDeuda: {
    color: c.deuda,
  },
  etiquetaDato: {
    fontSize: 11,
    color: c.textoT,
    textTransform: 'uppercase',
    marginTop: 4,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grupoBotonesHoras: {
    flexDirection: 'row',
    gap: 8,
  },
  botonSecundario: {
    backgroundColor: c.fondo,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  textoBotonSecundario: {
    color: c.textoS,
    fontWeight: '700',
    fontSize: 14,
  },
  botonPrincipal: {
    backgroundColor: c.accion,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textoBotonPrincipal: {
    color: c.accionTexto,
    fontWeight: '700',
    fontSize: 14,
  },
  botonDesactivado: {
    backgroundColor: c.borde,
  },
});