import React , { useState, useEffect }  from 'react'
import { View, Text,Image,TouchableOpacity,ScrollView ,StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TextInput,
    route,
    Pressable} from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({route}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text style={styles.textBook}>{route.params?.orgDetails.name}</Text> */}
        <Text>{JSON.stringify(route)}</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

const Tab = createBottomTabNavigator();

export default function OrganizationSite({navigation,route}) {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Settings') {
                return (
                  <Ionicons
                    name={'ios-list'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarInactiveTintColor: 'tomato',
            tabBarActiveTintColor: 'blue',
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            // options={{ tabBarBadge: 4 }}
            />
          <Tab.Screen 
            name="Settings"
            component={SettingsScreen}
            />
        </Tab.Navigator>
    );
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    pageContainer:{
        flex:1,
        position:'relative',
        alignItems: 'center',
        width:414,
        height:736,
        backgroundColor:'#343434',
    },
    textBook:{
        marginTop:30,
        textAlign:'center',
        alignItems:'center',
        color:'#1877F2',
        fontSize:65,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20
    },
})