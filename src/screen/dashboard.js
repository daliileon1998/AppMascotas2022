import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

const Menu = createDrawerNavigator();

export const dashboard = () =>{
    return (
      <NavigationContainer independent={true}>
        <Menu.Navigator>
          <Menu.Screen name="Inicio"/>
          <Menu.Screen name="Contacto" />
          <Menu.Screen name="Acercade" />
        </Menu.Navigator>
      </NavigationContainer>
    );
  }