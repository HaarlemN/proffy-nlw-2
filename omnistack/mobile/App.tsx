import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/routes/AppStack';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded) {
    // AppLoading from expo return exception
    return <View />;
  } else {
    return (
      <React.Fragment>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
        <StatusBar style="light" backgroundColor="#8257E5" />
      </React.Fragment>
    );
  }  
}
