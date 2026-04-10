import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Fonts } from '../theme/fonts';

export interface ChipOption<T> {
  label: string;
  value: T;
}

interface SelectorChipsProps<T> {
  opciones: ChipOption<T>[];
  valorActual: T;
  onSelect: (valor: T) => void;
}

export default function SelectorChips<T>({ opciones, valorActual, onSelect }: SelectorChipsProps<T>) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <View style={styles.chips}>
      {opciones.map((opcion, index) => (
        <TouchableOpacity
          key={String(opcion.value) + index}
          style={[styles.chip, valorActual === opcion.value && styles.chipActivo]}
          onPress={() => onSelect(opcion.value)}
        >
          <Text style={[styles.chipTexto, valorActual === opcion.value && styles.chipTextoActivo]}>
            {opcion.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  chips: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  chip: {
    minWidth: 68,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.borde,
    backgroundColor: c.tarjeta,
    alignItems: 'center',
  },
  chipActivo: {
    backgroundColor: c.accion,
    borderColor: c.accion,
  },
  chipTexto: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: c.textoS,
    textAlign: 'center',
  },
  chipTextoActivo: {
    fontFamily: Fonts.medium,
    color: c.accionTexto,
  },
});