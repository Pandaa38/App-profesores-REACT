import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  rightActions?: ReactNode;
}

export default function Header({ title, rightActions }: HeaderProps) {
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

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 10,
    zIndex: 1,
  },
  headerTitle: {
    color: '#111827',
    //fontWeight: 'bold',
    fontSize: 18,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    right: 16,
  },
});