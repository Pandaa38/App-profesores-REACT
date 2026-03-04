import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useState } from 'react';

type FormAlumnoProps = {
  visible: boolean;
  onGuardar: (nombre: string, precioPorHora: number) => void;
  onCancelar: () => void;
};

export default function FormularioAlumno({ visible, onGuardar, onCancelar }: FormAlumnoProps) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleGuardar = () => {
    if (!nombre || !precio) return; // no guardar si están vacíos
    onGuardar(nombre, parseFloat(precio));
    setNombre('');  // limpiar formulario
    setPrecio('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.fondo}>
        <View style={styles.formulario}>

          <Text style={styles.titulo}>Nuevo alumno</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Precio por hora (€)"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />

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
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 8,
  },
  textoGuardar: {
    color: '#fff',
    fontWeight: '600',
  },
});