import React, {useState,useEffect} from 'react';
import { Dimensions } from 'react-native';
import LoginScreen  from './src/screen/login';
import { Newregister } from './src/screen/register'
import { Dashboard } from './src/screen/admin/menuAdmin';
import { DashboardUser } from './src/screen/user/menuUser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { isUserLogged } from './src/config/actions';

const Stack = createNativeStackNavigator();

const {height, width} = Dimensions.get('window');

export default function navigation(){

  const [rol, setRol] = useState('user');
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      const response = await isUserLogged();
      if(response.statusResponse){
        setLogin(response.isLogged);
        setRol(response.rol);
        //setLoading(true);
      }
    }
    fetchData();
  }, [])

if(login == null){
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LoginScreen} options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="Registro" component={Newregister} />
        <Stack.Screen name="DashboardAdmin" component={Dashboard} options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="DashboardU" component={DashboardUser} options={{ headerShown: false, title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

}
