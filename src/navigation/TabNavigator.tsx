import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import AlumnosScreen from '../screens/AlumnosScreen';
import HistorialScreen from '../screens/HistorialScreen';
import AjustesScreen from '../screens/AjustesScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#F9FAFB',
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tab.Screen 
        name="Alumnos" 
        component={AlumnosScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>👥</Text> }}
      />
      <Tab.Screen 
        name="Historial" 
        component={HistorialScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>📋</Text> }}
      />
      <Tab.Screen 
        name="Ajustes" 
        component={AjustesScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text> }}
      />
    </Tab.Navigator>
  );
}