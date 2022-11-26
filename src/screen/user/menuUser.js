import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardU } from "./dashboardUser";
import { MenuBotton } from '../../components/MenuBotton';
import { firebase } from '../../config/fb';
import { Adopcion } from "./AdopcionMascotas/adopcion";
import  InfoMascota  from "./AdopcionMascotas/infoMascota";
import  SolicitudApcion  from "./AdopcionMascotas/solicitudAdopcion";
import "react-native-gesture-handler";

const Menu = createDrawerNavigator();

export const DashboardUser = ({navigation}) =>{

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
          <MenuBotton image={imagesList['home']} text="Inicio" onPress = { () => navigation.navigate('InicioU')}/>
          <MenuBotton image={imagesList['pets']} text="Adopción de Mascotas" onPress = { () => navigation.navigate('Adopcion')}/>
          <MenuBotton image={imagesList['logout']} text="Cerrar Sesión" onPress = {handleSignOut}/>
      </DrawerContentScrollView>
    );

  }

    return (
      
      <NavigationContainer independent={true}>
        <Menu.Navigator drawerContent = { (props) => <MenuItems { ...props } />}>
        <Menu.Screen
          name="InicioU"
          options={{
            headerTitle: "",
          }}
          component={DashboardU}
        />
        <Menu.Screen name="Adopcion" component={Adopcion} />
        <Menu.Screen name="infoMascota" component={InfoMascota} options={{headerTitle: "",}}/>
        <Menu.Screen name="solicitudAdop" component={SolicitudApcion} options={{headerTitle: "",}}/>
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