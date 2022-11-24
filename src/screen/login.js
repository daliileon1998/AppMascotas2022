import React, {useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { firebase } from '../config/fb';
import { getRol, isUserLogged } from '../config/actions';
import { Loading } from '../components/Loading';

const {height, width} = Dimensions.get('window');

export default function LoginScreen ({navigation}) {

  const modelo = {correo:'',  contrasena:''}
  const [newUser,setNewUser] = useState(modelo);
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

  const onLogin = async() =>{
    if(newUser.correo == ""){
      alert("Debe ingresar el correo del usuario");
    }else if(newUser.contrasena == ""){
      alert("Debe ingresar la contraseña");
    }else{
      setLoading(true)
      navigation.navigate("DashboardAdmin")
      setLoading(false)
      /*await firebase.auth().signInWithEmailAndPassword(newUser.correo,newUser.contrasena).
      then( async(userCredentials) => {
        const user = userCredentials.user;
        const id = user.uid;
        const tiprol = await getRol(id);
        setLogin(true);
        setRol(tiprol)
        if(rol == "Admin"){
          navigation.navigate("DashboardAdmin")
        }else if(rol == "User"){
          navigation.navigate("DashboardU")
        }
        setLoading(false)
      }).catch(error => alert(error.message))*/
    }  
  }

  if(login == null){
  return (
      <View style={styles.container}>
        <View style={styles.panel}>
        <Image style={styles.foto} source={require('../../assets/perrito.png')}></Image>
        <Image style={styles.foto2} source={require('../../assets/gatito.png')}></Image>
        </View>
        <Text style={styles.titulo}>App Mascotas</Text>
        <Text style={styles.subTitulo}>Inicia Sesión en tu Cuenta</Text>
        <TextInput onChangeText={(text) => setNewUser({...newUser, correo:text})} style={styles.textInput} placeholder='nombre de usuario'></TextInput>
        <TextInput onChangeText={(text) => setNewUser({...newUser, contrasena:text})} style={styles.textInput} secureTextEntry={true}  placeholder='Contraseña'></TextInput>
        <Text style={styles.forgotPassword} >¿Perdiste Tu Contraseña?</Text>
        <TouchableOpacity onPress={() => onLogin()} style={styles.button}><Text style={styles.textButton}>INICIAR SESIÓN</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}><Text style={styles.forgotPassword}>¿No Tienes Una Cuenta? Registrate</Text></TouchableOpacity>
        <StatusBar style="auto" />
        <Loading isVisible={loading} text="    CARGANDO    " />
      </View>
    )
  }else{
    if(rol == "Admin"){
      navigation.navigate("DashboardAdmin")
    }else if(rol == "User"){
      navigation.navigate("DashboardU")
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel:{
  flexDirection: 'row',
  justifyContent:'center'
  },
  titulo: {
    fontSize: 55,
    color: 'black',
    fontWeight: 'bold',
  },
  subTitulo: {
    fontSize: 20,
    color: 'gray',
  },
  textInput:{
    borderWidth:1,
    borderColor: 'gray',
    marginTop:10,
    padding:10,
    width: '80%',
    borderRadius: 30,
    height:50,
    backgroundColor: 'white',
    paddingStart: 30,
  },
  foto:{
    width:140,
    height:140, 
    alignSelf: 'flex-start',
  },
  foto2:{
    width:150,
    height:150,
    alignSelf: 'flex-end',
  },
  forgotPassword:{
      fontSize: 14,
      color: 'gray',
      marginTop: 20,
  },
  button : {
    marginTop:20,
    backgroundColor: "#6495ed",
    width: '80%',
    fontSize:20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    paddingVertical: 15,
  },
  textButton: {
    fontWeight: "bold"
  }

});