import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { DashboardAdmin } from "../screen/dashboardAdmin";
import { Mascotas } from "../screen/mascotas";
import { Productos } from "../screen/productos";
import { SolicitudesAdopcion } from "../screen/solicitudesAdopcion";
import { MenuBotton } from '../components/MenuBotton';


const Menu = createDrawerNavigator();

export const Dashboard = () =>{
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
        </Menu.Navigator>
      </NavigationContainer>
    );
  }

  const imagesList = {
    home: require('../../assets/home.png'),
    pets: require('../../assets/pets.png'),
    productos: require('../../assets/productos.png'),
    solicitud: require('../../assets/solicitud.png')
  }

  const MenuItems = ({ navigation }) => {

    return (
      <DrawerContentScrollView style ={styles.container}>
        <Image style={styles.foto} source={require('../../assets/user_register.png')}></Image>
        <Text style={styles.nombre}>nombre user</Text>
          <MenuBotton image={imagesList['home']} text="Inicio" onPress = { () => navigation.navigate('Inicio')}/>
          <MenuBotton image={imagesList['pets']} text="Mascotas" onPress = { () => navigation.navigate('Mascotas')}/>
          <MenuBotton image={imagesList['productos']} text="Productos" onPress = { () => navigation.navigate('Productos')}/>
          <MenuBotton image={imagesList['solicitud']} text="Solicitudes de Adopción" onPress = { () => navigation.navigate('Solicitudes')}/>
      </DrawerContentScrollView>
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