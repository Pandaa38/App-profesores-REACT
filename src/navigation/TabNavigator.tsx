
// LO QUE HACE QUE TO FUNCIONE
import { useColorScheme, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

// LAS PANTALLAS
import AlumnosScreen from '../screens/AlumnosScreen';
import HistorialScreen from '../screens/HistorialScreen';
import AjustesScreen from '../screens/AjustesScreen';
import CalendarioScreen from '../screens/CalendarioScreen';

// COLORINES
import { useTheme } from '../theme/useTheme';
import { useAjustesContext } from '../context/AjustesContext';

// LOS FCKING ICONOS
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const c = useTheme();
  const { ajustes } = useAjustesContext();
  const sistemaOscuro = useColorScheme() === 'dark';
  const esOscuro = ajustes.tema === 'oscuro' || (ajustes.tema === 'sistema' && sistemaOscuro);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(c.fondo);
      NavigationBar.setButtonStyleAsync(esOscuro ? 'light' : 'dark');
    }
  }, [c.fondo, esOscuro]);

  return (
    <>
      <StatusBar style={esOscuro ? 'light' : 'dark'} backgroundColor={c.fondo} />
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
        name="Calendario"
        component={CalendarioScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="calendar-clear-outline" size={focused ? 26 : 23} color={color} />
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
    </>
  );
}