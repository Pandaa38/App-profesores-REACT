import { useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
  ScrollView, TouchableWithoutFeedback
} from 'react-native';

import { Alumno } from '../type/types';
import { FiltrosHistorial, FILTROS_DEFAULT, Periodo, Orden } from '../database/dataHistorial';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

type FilterModalProps = {
  visible: boolean;
  filtros: FiltrosHistorial;
  alumnos: Alumno[];
  onAplicar: (filtros: FiltrosHistorial) => void;
  onCerrar: () => void;
};

export default function FilterModal({ visible, filtros, alumnos, onAplicar, onCerrar }: FilterModalProps) {
  const [filtrosLocales, setFiltrosLocales] = useState<FiltrosHistorial>(filtros);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  const alumnoSeleccionado = alumnos.find(a => a.id === filtrosLocales.alumnoId);

  const handleAplicar = () => {
    onAplicar(filtrosLocales);
    onCerrar();
  };

  const handleRestablecer = () => {
    setFiltrosLocales(FILTROS_DEFAULT);
    setDropdownAbierto(false);
  };

  const periodos: { label: string; value: Periodo }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Este mes', value: 'esteMes' },
    { label: 'Mes anterior', value: 'mesAnterior' },
    { label: 'Este año', value: 'esteAno' },
  ];

  const ordenes: { label: string; value: Orden }[] = [
    { label: 'Más recientes', value: 'recientes' },
    { label: 'Más antiguos', value: 'antiguos' },
    { label: 'Mayor importe', value: 'mayorImporte' },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onCerrar}>
        <View style={styles.fondo} />
      </TouchableWithoutFeedback>

      <View style={styles.panel}>

        {/* Cabecera */}
        <View style={styles.cabecera}>
          <Text style={styles.titulo}>Filtros</Text>
          <TouchableOpacity onPress={onCerrar}>
            <AntDesign name="close" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* PERÍODO */}
        <View style={styles.seccionHeader}>
          <Ionicons name="calendar-clear-outline" size={18} color="#374151" />
          <Text style={styles.seccionTitulo}>Período</Text>
        </View>
        <View style={styles.chips}>
          {periodos.map(p => (
            <TouchableOpacity
              key={p.value}
              style={[styles.chip, filtrosLocales.periodo === p.value && styles.chipActivo]}
              onPress={() => setFiltrosLocales(f => ({ ...f, periodo: p.value }))}
            >
              <Text style={[styles.chipTexto, filtrosLocales.periodo === p.value && styles.chipTextoActivo]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ALUMNO */}
        <View style={styles.seccionHeader}>
          <AntDesign name="user-switch" size={18} color="#374151" />
          <Text style={styles.seccionTitulo}>Alumno</Text>
        </View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownAbierto(!dropdownAbierto)}
        >
          <Text style={styles.dropdownTexto}>
            {alumnoSeleccionado ? alumnoSeleccionado.nombre : 'Todos los alumnos'}
          </Text>
          <AntDesign
            name={dropdownAbierto ? 'up' : 'down'}
            size={14}
            color="#6B7280"
          />
        </TouchableOpacity>

        {dropdownAbierto && (
          <View style={styles.dropdownLista}>
            <TouchableOpacity
              style={[styles.dropdownItem, filtrosLocales.alumnoId === null && styles.dropdownItemActivo]}
              onPress={() => {
                setFiltrosLocales(f => ({ ...f, alumnoId: null }));
                setDropdownAbierto(false);
              }}
            >
              <Text style={[styles.dropdownItemTexto, filtrosLocales.alumnoId === null && styles.dropdownItemTextoActivo]}>
                Todos los alumnos
              </Text>
            </TouchableOpacity>
            {alumnos.map(alumno => (
              <TouchableOpacity
                key={alumno.id}
                style={[styles.dropdownItem, filtrosLocales.alumnoId === alumno.id && styles.dropdownItemActivo]}
                onPress={() => {
                  setFiltrosLocales(f => ({ ...f, alumnoId: alumno.id }));
                  setDropdownAbierto(false);
                }}
              >
                <Text style={[styles.dropdownItemTexto, filtrosLocales.alumnoId === alumno.id && styles.dropdownItemTextoActivo]}>
                  {alumno.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ORDENAR POR */}
        <View style={styles.seccionHeader}>
          <FontAwesome name="sort" size={18} color="#374151" />
          <Text style={styles.seccionTitulo}>Ordenar por</Text>
        </View>
        {ordenes.map(o => (
          <TouchableOpacity
            key={o.value}
            style={styles.radioFila}
            onPress={() => setFiltrosLocales(f => ({ ...f, orden: o.value }))}
          >
            <View style={styles.radioCirculo}>
              {filtrosLocales.orden === o.value && <View style={styles.radioRelleno} />}
            </View>
            <Text style={styles.radioTexto}>{o.label}</Text>
          </TouchableOpacity>
        ))}

        {/* BOTONES */}
        <View style={styles.botones}>
          <TouchableOpacity style={styles.botonRestablecer} onPress={handleRestablecer}>
            <Text style={styles.textoRestablecer}>Restablecer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonAplicar} onPress={handleAplicar}>
            <Text style={styles.textoAplicar}>Aplicar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  panel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  seccionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  seccionTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  chipActivo: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  chipTexto: {
    fontSize: 13,
    color: '#374151',
  },
  chipTextoActivo: {
    color: '#fff',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownTexto: {
    fontSize: 14,
    color: '#111827',
  },
  dropdownLista: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: -4,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  dropdownItemActivo: {
    backgroundColor: '#F3F4F6',
  },
  dropdownItemTexto: {
    fontSize: 14,
    color: '#374151',
  },
  dropdownItemTextoActivo: {
    fontWeight: '600',
    color: '#111827',
  },
  radioFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  radioCirculo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioRelleno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111827',
  },
  radioTexto: {
    fontSize: 14,
    color: '#374151',
  },
  botones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  botonRestablecer: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  textoRestablecer: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  botonAplicar: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  textoAplicar: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
});