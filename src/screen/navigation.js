import * as React from 'react';
import { LoginScreen } from './login';
import { Newregister } from './register';
import { Dashboard } from './menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function Navigation(){
  const [user, setUser] = React.useState(null);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name="Home" component={LoginScreen} options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="Registro" component={Newregister} />
        <Stack.Screen name="DashboardAdmin" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
