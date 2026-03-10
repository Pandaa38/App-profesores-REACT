import { StyleSheet, Text, View, Animated } from 'react-native';
import { ReactNode, useMemo, useRef } from 'react';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';
import { Fonts } from '../theme/fonts';

interface HeaderProps {
  title: string;
  rightActions?: ReactNode;
  scrollY?: Animated.Value;
} 

export default function Header({ title, rightActions, scrollY }: HeaderProps) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const fallback = useRef(new Animated.Value(0)).current;
  const sv = scrollY ?? fallback;

  const borderOpacity = sv.interpolate({ inputRange: [0, 30], outputRange: [0, 1], extrapolate: 'clamp' });
  const shadowOpacity = sv.interpolate({ inputRange: [0, 30], outputRange: [0, 0.08], extrapolate: 'clamp' });

  return (
    <Animated.View style={[styles.header, { shadowOpacity }]}>
      <Animated.View style={[styles.border, { opacity: borderOpacity }]} />
      <Text style={styles.headerTitle}>{title}</Text>
      {rightActions && (
        <View style={styles.rightActions}>
          {rightActions}
        </View>
      )}
    </Animated.View>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: c.fondo,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 0,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: c.borde,
  },
  headerTitle: {
    color: c.textoP,
    fontSize: 18,
    fontFamily: Fonts.semibold,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    right: 16,
  },
});