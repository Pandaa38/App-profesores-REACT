import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111827', // A juego con el botón "Cobrar"
    width: 64,  // Un poco más grande para ser el centro de atención
    height: 64,
    borderRadius: 32, // Perfectamente redondo
    alignItems: 'center',
    justifyContent: 'center',
    
    // Sombra para que flote
    elevation: 8,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300', // Un 'más' fino queda más moderno que uno en negrita
    lineHeight: 34,
    marginTop: -2, // Centrado visual fino
  },
});