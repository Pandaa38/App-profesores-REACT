import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {AjustesProvider} from "./src/context/AjustesContext";
import {CalendarioProvider} from "./src/context/CalendarioContext";
import TabNavigator from "./src/navigation/TabNavigator";
import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

import "./src/i18n/i18n";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AjustesProvider>
          <CalendarioProvider>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </CalendarioProvider>
        </AjustesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
