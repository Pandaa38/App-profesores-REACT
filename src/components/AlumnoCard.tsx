import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useMemo } from 'react';
import { Alumno } from '../type/types';
import { AntDesign } from '@expo/vector-icons';
import { useAjustesContext } from '../context/AjustesContext';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Fonts } from '../theme/fonts';
import { useTranslation } from 'react-i18next';

import { 
  notificationAsync, 
  NotificationFeedbackType, 
  impactAsync, 
  ImpactFeedbackStyle 
} from 'expo-haptics';;

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
  const { t } = useTranslation();
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const confirmarEliminacion = () => {
    notificationAsync(NotificationFeedbackType.Warning);
    Alert.alert(
      t('alumnos.confirmarEliminarTitulo'),
      t('alumnos.confirmarEliminarMsg', { nombre: alumno.nombre }),
      [
        { text: t('alumnos.cancelar'), style: 'cancel' },
        { text: t('alumnos.eliminar'), style: 'destructive', onPress: () => onEliminar(alumno) }
      ]
    );
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
          <Text style={styles.etiquetaDato}>{t('alumnos.pendientes', { count: alumno.horasPendientes })}</Text>
        </View>
        <View style={styles.divisor} />
        <View style={styles.cajaDato}>
          <Text style={[styles.numeroGrande, deudaTotal > 0 && styles.textoDeuda]}>
            {deudaTotal}<Text style={styles.unidades}>{ajustes.moneda}</Text>
          </Text>
          <Text style={styles.etiquetaDato}>{t('alumnos.deuda')}</Text>
        </View>
      </View>

      {/* BOTONERA */}
      <View style={styles.filaBotones}>
        <View style={styles.grupoBotonesHoras}>

          <TouchableOpacity 
          style={styles.botonSecundario} 
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Light);
            onAddHoras(alumno, 0.5);
          }}>
            <Text style={styles.textoBotonSecundario}>+0.5h</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonSecundario} onPress={() => {
            impactAsync(ImpactFeedbackStyle.Light);
            onAddHoras(alumno, 1);
          }}>
            <Text style={styles.textoBotonSecundario}>+1h</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonSecundario} onPress={() => onEditar(alumno)}>
            <AntDesign name="edit" size={20} color={c.textoS} />
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={[styles.botonPrincipal, deudaTotal === 0 && styles.botonDesactivado]}
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Medium);
            onCobrar(alumno);
          }}
          disabled={deudaTotal === 0}
        >
          <Text style={styles.textoBotonPrincipal}>{t('alumnos.cobrar')}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  card: {
    backgroundColor: c.tarjeta,
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: '5%',
    width: '90%',
    borderWidth: 1,
    borderColor: c.borde,
    elevation: 3,
    shadowColor: '#2563EB',   // azul Slate, en vez de negro puro
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contenedorDerecha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nombre: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: c.textoP,
  },
  tarifa: {
    fontSize: 13,
    color: c.textoS,
    fontFamily: Fonts.semibold,
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
    paddingVertical: 10,
    marginBottom: 10,
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
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: c.textoP,
  },
  unidades: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
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
    fontFamily: Fonts.bold,
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
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  textoBotonSecundario: {
    color: c.textoS,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  botonPrincipal: {
    minWidth: 90,
    backgroundColor: c.accion,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonPrincipal: {
    color: c.accionTexto,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  botonDesactivado: {
    backgroundColor: c.borde,
  },
});