import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      {/*<Text style={styles.text}>+</Text> */}
      <AntDesign name="user-add" size={32} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111827', 
    width: 64,  
    height: 64,
    borderRadius: 32, 
    alignItems: 'center',
    justifyContent: 'center',
    
    elevation: 8,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  // text: {
  //   color: '#fff',
  //   fontSize: 32,
  //   fontWeight: '300', // Un 'más' fino queda más moderno que uno en negrita
  //   lineHeight: 34,
  //   marginTop: -2, // Centrado visual fino
  // },
});