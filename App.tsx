import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AjustesProvider } from './src/context/AjustesContext';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AjustesProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </AjustesProvider>
    </SafeAreaProvider>
  );
}