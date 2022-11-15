import * as React from 'react';
import { View, Text } from 'react-native';
import { loginScreen } from './src/screen/login';
import { Newregister } from './src/screen/register';
import { dashboard } from './src/screen/dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function navigation(){
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={loginScreen} options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="Registro" component={Newregister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
