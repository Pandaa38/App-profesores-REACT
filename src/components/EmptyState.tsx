import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useMemo } from 'react';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { useTranslation } from 'react-i18next';

export default function EmptyState() {
  const c = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <View style={styles.container}>
      <AntDesign name="user-add" size={72} color={c.textoT} />
      <Text style={styles.titulo}>{t('emptyState.titulo')}</Text>
      <Text style={styles.subtitulo}>
        {t('emptyState.subtituloAntes')}<Text style={styles.destacado}>+</Text>{t('emptyState.subtituloDespues')}
      </Text>
    </View>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
    gap: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: c.textoS,
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: c.textoT,
    textAlign: 'center',
    lineHeight: 22,
  },
  destacado: {
    fontWeight: '800',
    color: c.accion,
  },
});