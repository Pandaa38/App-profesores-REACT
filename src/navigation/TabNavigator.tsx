import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign } from '@expo/vector-icons';

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
        options={{ 
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} /> 
        }}
      />
      <Tab.Screen 
        name="Historial" 
        component={HistorialScreen}
        options={{ 
          tabBarIcon: ({ color }) => <AntDesign name="history" size={24} color={color} /> 
        }}
      />
      <Tab.Screen 
        name="Ajustes" 
        component={AjustesScreen}
        options={{ 
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} /> 
        }}
      />
    </Tab.Navigator>
  );
}