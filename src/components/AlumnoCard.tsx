import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Alumno } from '../type/types';

type AlumnoCardProps = {
  alumno: Alumno;
  onCobrar: (alumno: Alumno) => void;
  onAddHoras: (alumno: Alumno, horas: number) => void;
  onEliminar: (alumno: Alumno) => void;
};

export default function AlumnoCard({ alumno, onCobrar, onAddHoras, onEliminar }: AlumnoCardProps) {
  const deudaTotal = alumno.horasPendientes * alumno.precioPorHora;

  console.log("¿Recibo onEliminar?", typeof onEliminar);

  const confirmarEliminacion = () => {
    // Aquí podrías usar un Alert para confirmar la eliminación
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar a ${alumno.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => onEliminar(alumno) }
      ]
    );
  };

  return (
    <View style={styles.card}>
      
      {/* 1. CABECERA: Nombre y Tarifa */}
      <View style={styles.cabecera}>
        <Text style={styles.nombre}>{alumno.nombre}</Text>
        <Text style={styles.tarifa}>{alumno.precioPorHora}€ / h</Text>
      </View>

      {/* 2. DATOS PRINCIPALES: Panel tipo Dashboard */}
      <View style={styles.panelDatos}>
        <View style={styles.cajaDato}>
          <Text style={styles.numeroGrande}>{alumno.horasPendientes}h</Text>
          <Text style={styles.etiquetaDato}>Pendientes</Text>
        </View>

        {/* Pequeña línea divisoria vertical */}
        <View style={styles.divisor} />

        <View style={styles.cajaDato}>
          <Text style={[styles.numeroGrande, styles.textoDeuda]}>{deudaTotal}€</Text>
          <Text style={styles.etiquetaDato}>Deuda</Text>
        </View>
      </View>

      {/* 3. BOTONERA DE ACCIONES */}
      <View style={styles.filaBotones}>
        {/* Grupo de añadir horas */}
        <View style={styles.grupoBotonesHoras}>
          <TouchableOpacity style={styles.botonSecundario} onPress={() => onAddHoras(alumno, 0.5)}>
            <Text style={styles.textoBotonSecundario}>+0.5h</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.botonSecundario} onPress={() => onAddHoras(alumno, 1)}>
            <Text style={styles.textoBotonSecundario}>+1h</Text>
          </TouchableOpacity>
        </View>

        {/* Botón principal de cobrar */}
        <TouchableOpacity style={styles.botonPrincipal} onPress={() => onCobrar(alumno)}>
          <Text style={styles.textoBotonPrincipal}>Cobrar</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de eliminar */}
      <TouchableOpacity style={styles.botonEliminar} onPress={confirmarEliminacion}>
        <Text style={styles.textoBotonEliminar}>Eliminar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: '5%',
    width: '90%',

    elevation: 4, // Sombra para Android

    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  // --- CABECERA ---
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a', // Negro un poco más suave
  },
  tarifa: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8, // Lo convertimos en una especie de "Etiqueta/Badge"
  },

  // --- PANEL DE DATOS ---
  panelDatos: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa', // Fondo gris muy clarito para agrupar los datos
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  cajaDato: {
    flex: 1, // Ocupa el 50% del espacio
    alignItems: 'center',
  },
  divisor: {
    width: 1,
    backgroundColor: '#e0e0e0', // Línea sutil que separa las horas de la deuda
    marginVertical: 4,
  },
  numeroGrande: {
    fontSize: 24,
    fontWeight: '900',
    color: '#333',
  },
  textoDeuda: {
    color: '#e74c3c', // Rojo para que la deuda salte a la vista
  },
  etiquetaDato: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase', // Queda muy profesional en subtítulos
    marginTop: 2,
    fontWeight: '600',
  },

  // --- BOTONERA ---
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grupoBotonesHoras: {
    flexDirection: 'row',
    gap: 8, // Espacio entre los botones de horas (Solo funciona en RN moderno)
  },
  botonSecundario: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#3498db', // Azul brillante
    marginRight: 8, // Por si el gap no lo pilla tu versión
  },
  textoBotonSecundario: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botonPrincipal: {
    backgroundColor: '#2ecc71', // Verde esmeralda (acción positiva)
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2, // Sombra para el botón
  },
  textoBotonPrincipal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botonEliminar: {
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  textoBotonEliminar: {
    color: '#e74c3c',
    fontSize: 13,
    fontWeight: '600',
  },
});