import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Alumno } from '../type/types';

type FormAlumnoProps = {
  visible: boolean;
  alumnoEditar?: Alumno;
  onGuardar: (nombre: string, precioPorHora: number, horasPendientes?: number) => void;
  onCancelar: () => void;
};

export default function FormularioAlumno({ visible, alumnoEditar, onGuardar, onCancelar }: FormAlumnoProps) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [horas, setHoras] = useState('');

  useEffect(() => {
    // Siempre vaciamos los campos al abrir el modal, tanto para crear como para editar
    setNombre('');
    setPrecio('');
    setHoras('');
  }, [alumnoEditar, visible]);

  const handleGuardar = () => {
    // Si el usuario no escribe nada, usamos el valor que ya tenía el alumno
    const nombreFinal = nombre.trim() !== '' ? nombre : (alumnoEditar ? alumnoEditar.nombre : '');
    const precioFinal = precio.trim() !== '' ? parseFloat(precio) : (alumnoEditar ? alumnoEditar.precioPorHora : NaN);
    const horasFinal = horas.trim() !== '' ? parseFloat(horas) : (alumnoEditar ? alumnoEditar.horasPendientes : undefined);

    // Validamos: si es un alumno nuevo, exigimos nombre y precio. Si es edición, permitimos que queden como estaban.
    if (!alumnoEditar && (!nombreFinal || isNaN(precioFinal))) return;

    onGuardar(nombreFinal, precioFinal, horasFinal);
    
    // Limpiamos al salir
    setNombre('');
    setPrecio('');
    setHoras('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.fondo}>
        <View style={styles.formulario}>

          <Text style={styles.titulo}>
            {alumnoEditar ? 'Editar alumno' : 'Nuevo alumno'}
          </Text>

          <TextInput
            style={styles.input}
            // Muestra el nombre actual en el placeholder si estamos editando
            placeholder={alumnoEditar ? `Nombre: ${alumnoEditar.nombre} (opcional)` : "Nombre"}
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder={alumnoEditar ? `Precio: ${alumnoEditar.precioPorHora}€ (opcional)` : "Precio por hora (€)"}
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />
          
          {alumnoEditar && (
            <TextInput
              style={styles.input}
              placeholder={`Horas pendientes: ${alumnoEditar.horasPendientes} (opcional)`}
              value={horas}
              onChangeText={setHoras}
              keyboardType="numeric"
            />
          )}

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
              <Text style={styles.textoGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formulario: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    gap: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  botonCancelar: {
    padding: 10,
  },
  textoCancelar: {
    color: '#666',
    fontWeight: '600',
  },
  botonGuardar: {
    backgroundColor: '#111827', // Le pongo tu color pizarra oscuro para que quede más elegante
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  textoGuardar: {
    color: '#fff',
    fontWeight: '600',
  },
});