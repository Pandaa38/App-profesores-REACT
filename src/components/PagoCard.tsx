import { View, Text, StyleSheet } from 'react-native';
import { PagoRegistro } from '../type/types';

type PagoCardProps = {
  pago: PagoRegistro;
};

const formatearFecha = (fecha: string) => {
  const hoy = new Date();
  const fechaPago = new Date(fecha);

  const esHoy = hoy.toDateString() === fechaPago.toDateString();
  if (esHoy) return 'Hoy';

  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);
  const esAyer = ayer.toDateString() === fechaPago.toDateString();
  if (esAyer) return 'Ayer';

  const [date] = fecha.split(' ');
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

export default function PagoCard({ pago }: PagoCardProps) {
  return (
    <View style={styles.card}>

      <View style={styles.izquierda}>
        <Text style={styles.nombre}>{pago.alumnoNombre}</Text>
        <Text style={styles.horas}>{pago.horasCobradas}h cobradas</Text>
      </View>

      <View style={styles.derecha}>
        <Text style={styles.monto}>{pago.montoCobrado.toFixed(2)}€</Text>
        <Text style={styles.fecha}>{formatearFecha(pago.fecha)}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
    borderRadius: 10,
    marginVertical: 4,
    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    // Sombra Android
    elevation: 2,
  },
  izquierda: {
    flex: 1,
    gap: 4,
  },
  derecha: {
    alignItems: 'flex-end',
    gap: 4,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  horas: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  monto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  fecha: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});