import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardAdmin } from "./dashboardAdmin";

import { SolicitudesAdopcion } from "./solicitudes/solicitudesAdopcion";

import { Productos } from "./productos/productos";
import { AddProduct } from './productos/addProducto';
import  UpdateProduct from './productos/UpdateProducto';

import { Mascotas } from "./mascotas/mascotas";
import { AddMascotas } from './mascotas/addMascotas';
import  UpdateMascota  from './mascotas/UpdateMascotas';

import { MenuBotton } from '../../components/MenuBotton';
import { firebase } from '../../config/fb';
import "react-native-gesture-handler";

const Menu = createDrawerNavigator();


export const Dashboard = ({navigation}) =>{

  const imagesList = {
    home: require('../../../assets/home.png'),
    pets: require('../../../assets/pets.png'),
    productos: require('../../../assets/productos.png'),
    solicitud: require('../../../assets/solicitud.png'),
    logout: require('../../../assets/logout.png')
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        navigation.navigate("Home")
      })
      .catch(error => alert(error.message))
  }

  const MenuItems = ({ navigation }) => {

    return (
      <DrawerContentScrollView style ={styles.container}>
        <Image style={styles.foto} source={require('../../../assets/user_register.png')}></Image>
        <Text style={styles.nombre}>nombre user</Text>
          <MenuBotton image={imagesList['home']} text="Inicio" onPress = { () => navigation.navigate('Inicio')}/>
          <MenuBotton image={imagesList['pets']} text="Mascotas" onPress = { () => navigation.navigate('Mascotas')}/>
          <MenuBotton image={imagesList['productos']} text="Productos" onPress = { () => navigation.navigate('Productos')}/>
          <MenuBotton image={imagesList['solicitud']} text="Solicitudes de Adopci??n" onPress = { () => navigation.navigate('Solicitudes')}/>
          <MenuBotton image={imagesList['logout']} text="Cerrar Sesi??n" onPress = {() =>handleSignOut()}/>
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
          component={DashboardAdmin}
        />
         <Menu.Screen name="Mascotas" component={Mascotas} />
         <Menu.Screen name="Productos" component={Productos} />
         <Menu.Screen name="Solicitudes" component={SolicitudesAdopcion} />
         <Menu.Screen name="AddProducto" component={AddProduct} options={{headerTitle: "",}} />
         <Menu.Screen name="UpdateProducto" component={UpdateProduct} options={{headerTitle: "",}} />
         <Menu.Screen name="AddMascotas" component={AddMascotas} options={{headerTitle: "",}} />
         <Menu.Screen name="UpdateMascota" component={UpdateMascota} options={{headerTitle: "",}} />
        </Menu.Navigator>
      </NavigationContainer>
    );
  }//

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