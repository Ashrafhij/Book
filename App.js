import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/Screens/HomePage';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Providers from './src/Screens/Providers';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName='HomePage' 
            screenOptions={{ headerShown: false }}

>
    <Stack.Screen name="HomePage" component={HomePage}
        options={{title:'Book'}}
    />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Providers" component={Providers} />
    </Stack.Navigator>
  </NavigationContainer>

 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
