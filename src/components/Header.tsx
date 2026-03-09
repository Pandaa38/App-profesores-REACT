import { StyleSheet, Text, View } from 'react-native';
import { ReactNode, useMemo } from 'react';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';

interface HeaderProps {
  title: string;
  rightActions?: ReactNode;
}

export default function Header({ title, rightActions }: HeaderProps) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {rightActions && (
        <View style={styles.rightActions}>
          {rightActions}
        </View>
      )}
    </View>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: c.fondo,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerTitle: {
    color: c.textoP,
    fontSize: 18,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    right: 16,
  },
});