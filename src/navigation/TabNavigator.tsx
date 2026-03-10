import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import AlumnosScreen from '../screens/AlumnosScreen';
import HistorialScreen from '../screens/HistorialScreen';
import AjustesScreen from '../screens/AjustesScreen';
import { useTheme } from '../theme/useTheme';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const c = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: c.accion,
        tabBarInactiveTintColor: c.textoT,
        tabBarStyle: {
          backgroundColor: c.fondo,
          borderTopColor: c.borde,
        },
      }} >
        
      <Tab.Screen
        name="Alumnos"
        component={AlumnosScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" size={focused ? 26 : 23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="history" size={focused ? 26 : 23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={AjustesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="setting" size={focused ? 26 : 23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}