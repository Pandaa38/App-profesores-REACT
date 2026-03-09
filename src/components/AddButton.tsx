import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useMemo } from 'react';
import { useTheme } from '../theme/useTheme';
import { Colores } from '../theme/colores';

type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress }: AddButtonProps) {
  const c = useTheme();
  // Usamos el mismo patrón que tienes en las otras pantallas para el tema
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      <AntDesign name="user-add" size={32} color={c.accionTexto} />
    </TouchableOpacity>
  );
}

const makeStyles = (c: Colores) => StyleSheet.create({
  button: {
    backgroundColor: c.accion, // Aquí entra en juego nuestro azul mágico
    width: 64,  
    height: 64,
    borderRadius: 32, 
    alignItems: 'center',
    justifyContent: 'center',
    
    elevation: 8,
    shadowColor: c.accion, // La sombra también es azul, dando un toque "neon" muy sutil
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, // Subí un pelín la opacidad para que resalte más en el fondo oscuro
    shadowRadius: 8,
  },
});