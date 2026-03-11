import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { Alumno } from '../type/types';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { useAjustesContext } from '../context/AjustesContext';
import { useTranslation } from 'react-i18next';

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

  const c = useTheme();
  const { t } = useTranslation();
  const { ajustes } = useAjustesContext();
  const styles = useMemo(() => makeStyles(c), [c]);

  useEffect(() => {
    setNombre('');
    setPrecio('');
    setHoras('');
  }, [alumnoEditar, visible]);

  const handleGuardar = () => {
    const nombreFinal = nombre.trim() !== '' ? nombre : (alumnoEditar ? alumnoEditar.nombre : '');
    const precioFinal = precio.trim() !== '' ? parseFloat(precio) : (alumnoEditar ? alumnoEditar.precioPorHora : NaN);
    const horasFinal = horas.trim() !== '' ? parseFloat(horas) : (alumnoEditar ? alumnoEditar.horasPendientes : undefined);

    if (!alumnoEditar && (!nombreFinal || isNaN(precioFinal))) return;

    onGuardar(nombreFinal, precioFinal, horasFinal);
    setNombre('');
    setPrecio('');
    setHoras('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.fondo}>
        <View style={styles.formulario}>

          <Text style={styles.titulo}>
            {alumnoEditar ? t('form.editarAlumno') : t('form.nuevoAlumno')}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={alumnoEditar ? t('form.nombreEditarPlaceholder', { nombre: alumnoEditar.nombre }) : t('form.nombrePlaceholder')}
            placeholderTextColor={c.textoT}
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder={alumnoEditar ? t('form.precioEditarPlaceholder', { precio: alumnoEditar.precioPorHora, moneda: ajustes.moneda }) : t('form.precioPlaceholder')}
            placeholderTextColor={c.textoT}
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />

          {alumnoEditar && (
            <TextInput
              style={styles.input}
              placeholder={t('form.horasEditarPlaceholder', { horas: alumnoEditar.horasPendientes })}
              placeholderTextColor={c.textoT}
              value={horas}
              onChangeText={setHoras}
              keyboardType="numeric"
            />
          )}

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>{t('form.cancelar')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
              <Text style={styles.textoGuardar}>{t('form.guardar')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formulario: {
    backgroundColor: c.tarjeta,
    borderRadius: 12,
    padding: 24,
    width: '85%',
    gap: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  botonCancelar: {
    padding: 10,
  },
  textoCancelar: {
    color: c.textoS,
    fontWeight: '600',
  },
  botonGuardar: {
    backgroundColor: c.accion,
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  textoGuardar: {
    color: c.accionTexto,
    fontWeight: '600',
  },
});