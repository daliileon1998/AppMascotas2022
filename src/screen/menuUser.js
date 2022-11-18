import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardAdmin } from "./dashboardAdmin";
import { Mascotas } from "./mascotas";
import { Productos } from "./productos";
import { SolicitudesAdopcion } from "./solicitudesAdopcion";
import { MenuBotton } from '../components/MenuBotton';
import { database } from '../config/fb';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';
import "react-native-gesture-handler";

const auth = getAuth(database);
const Menu = createDrawerNavigator();


export const DashboardUser = () =>{

  const navigation = useNavigation()

  const imagesList = {
    home: require('../../assets/home.png'),
    pets: require('../../assets/pets.png'),
    productos: require('../../assets/productos.png'),
    solicitud: require('../../assets/solicitud.png'),
    logout: require('../../assets/logout.png')
  }

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }

  const MenuItems = ({ navigation }) => {

    return (
      <DrawerContentScrollView style ={styles.container}>
        <Image style={styles.foto} source={require('../../assets/user_register.png')}></Image>
        <Text style={styles.nombre}>nombre usario</Text>
          <MenuBotton image={imagesList['home']} text="Inicio" onPress = { () => navigation.navigate('Inicio')}/>
          <MenuBotton image={imagesList['pets']} text="Mascotas" onPress = { () => navigation.navigate('Mascotas')}/>
          <MenuBotton image={imagesList['productos']} text="Productos" onPress = { () => navigation.navigate('Productos')}/>
          <MenuBotton image={imagesList['solicitud']} text="Solicitudes de Adopción" onPress = { () => navigation.navigate('Solicitudes')}/>
          <MenuBotton image={imagesList['logout']} text="Cerrar Sesión" onPress = {handleSignOut}/>
      </DrawerContentScrollView>
    );

  }

    return (
      
      <NavigationContainer independent={true}>
        <Menu.Navigator drawerContent = { (props) => <MenuItems { ...props } />}>
        <Menu.Screen
          name="Inicio"
          options={{
            headerTitle: "",
          }}
          component={DashboardUser}
        />
         <Menu.Screen name="Mascotas" component={Mascotas} />
         <Menu.Screen name="Productos" component={Productos} />
         <Menu.Screen name="Solicitudes" component={SolicitudesAdopcion} />
        </Menu.Navigator>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
      container:{
        padding:10,
      },
      title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
        marginTop:10,
      },
      foto:{
        width:100,
        height:100, 
        alignSelf: 'center',
      },
      nombre:{
        alignSelf: 'center',
        marginBottom:20,
        color:'gray'
      }
  });