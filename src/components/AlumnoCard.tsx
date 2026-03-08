import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Alumno } from '../type/types';

import { AntDesign } from '@expo/vector-icons';

type AlumnoCardProps = {
  alumno: Alumno;
  onCobrar: (alumno: Alumno) => void;
  onAddHoras: (alumno: Alumno, horas: number) => void;
  onEliminar: (alumno: Alumno) => void;
  onEditar: (alumno: Alumno) => void;
};

export default function AlumnoCard({ alumno, onCobrar, onAddHoras, onEliminar, onEditar }: AlumnoCardProps) {
  const deudaTotal = alumno.horasPendientes * alumno.precioPorHora;

  const confirmarEliminacion = () => {
    if (Platform.OS === 'web') {
      const confirmado = window.confirm(`¿Estás seguro de que quieres eliminar a ${alumno.nombre}?`);
      if (confirmado) onEliminar(alumno);
    } else {
      Alert.alert(
        "Confirmar eliminación",
        `¿Eliminar a ${alumno.nombre}?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Eliminar", style: "destructive", onPress: () => onEliminar(alumno) }
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
          <Text style={styles.tarifa}>{alumno.precioPorHora}€/h</Text>
          <TouchableOpacity onPress={confirmarEliminacion} style={styles.botonEliminar}>
            <AntDesign name="delete" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PANEL DE DATOS */}
      <View style={styles.panelDatos}>
        <View style={styles.cajaDato}>
          <Text style={styles.numeroGrande}>{alumno.horasPendientes}<Text style={styles.unidades}>h</Text></Text>
          <Text style={styles.etiquetaDato}>Pendientes</Text>
        </View>
        <View style={styles.divisor} />
        <View style={styles.cajaDato}>
          <Text style={[styles.numeroGrande, deudaTotal > 0 && styles.textoDeuda]}>
            {deudaTotal}<Text style={styles.unidades}>€</Text>
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
            <AntDesign name="edit" size={20} color="#374151" />
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: '5%',
    width: '90%',
    // Sombras súper sutiles para un look limpio
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 1, // Android
    shadowColor: '#000', // iOS
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
    color: '#111827',
  },
  tarifa: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  botonEliminar: {
    padding: 4,
  },
  // textoBotonEliminar: {
  //   color: '#D1D5DB',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  panelDatos: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
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
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  numeroGrande: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  unidades: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  textoDeuda: {
    color: '#EF4444', // Un rojo más mate/profesional
  },
  etiquetaDato: {
    fontSize: 11,
    color: '#9CA3AF',
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
    backgroundColor: '#F3F4F6', // Sin bordes, solo un fondo gris suave
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  textoBotonSecundario: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 14,
  },
  botonPrincipal: {
    backgroundColor: '#111827', // Negro pizarra, súper elegante
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  botonDesactivado: {
    backgroundColor: '#E5E7EB', // Si no hay deuda, se pone gris
  }
});