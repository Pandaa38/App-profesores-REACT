import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ecc71',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 34,
  },
});