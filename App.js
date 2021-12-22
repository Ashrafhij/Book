import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {authentication} from './Firebase/firebase-config';

import HomePage from './src/Screens/HomePage';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Providers from './src/Screens/Providers';
import ProvideSite from './src/Screens/ProvideSite';
import AppointmentDetails from './src/Screens/AppointmentDetails';
import OrganizationSite from './src/Screens/OrganizationSite';
import OrganizationAdminPanel from './src/Screens/OrganizationAdminPanel';



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
    <Stack.Screen name="ProvideSite" component={ProvideSite} />
    <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
    <Stack.Screen name="OrganizationSite" component={OrganizationSite} />
    <Stack.Screen name="OrganizationAdminPanel" component={OrganizationAdminPanel} />
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
