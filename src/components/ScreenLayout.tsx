import React from 'react';
import { StyleSheet, ScrollView, Animated, ViewStyle, StyleProp, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';

interface ScreenLayoutProps {
  title?: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  floatingContent?: React.ReactNode;
  showGradient?: boolean;
  scrollable?: boolean;
  scrollY?: Animated.Value;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onScroll?: any;
  scrollEventThrottle?: number;
}

export default function ScreenLayout({
  title,
  children,
  headerContent,
  floatingContent,
  showGradient = true,
  scrollable = true,
  scrollY,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle,
}: ScreenLayoutProps) {
  const c = useTheme();
  const styles = React.useMemo(() => makeStyles(c), [c]);

  return (
    <SafeAreaView style={styles.container}>
      {title && <Header title={title} scrollY={scrollY} />}
      
      {headerContent}

      {scrollable ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={scrollEventThrottle}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.scroll}>
            {children}
        </View>
      )}

      {showGradient && (
        <LinearGradient
          colors={[`${c.fondo}00`, c.fondo]}
          style={styles.gradientBottom}
          pointerEvents="none"
        />
      )}

      {floatingContent}
    </SafeAreaView>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.fondo,
    width: '100%',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
});
