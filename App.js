import * as React from 'react';
import { View, Text } from 'react-native';
import { loginScreen } from './src/screen/login';
import { Newregister } from './src/screen/register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function navigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={loginScreen} options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="Registro" component={Newregister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
