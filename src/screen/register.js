import * as React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';
import { database } from '../config/fb';
import { getFirestore,collection, setDoc,doc  } from 'firebase/firestore';
import {getAuth,createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(database);


export const Newregister = () =>{

  const firestore = getFirestore(database);
  const modelo = {nombres:'',  apellidos:'',  correo:'',  contrasena:'',  tipoUsuario: 'User',  fechaCreacion: new Date()}
  const [newUser,setNewUser] = React.useState(modelo)

  const onSend = async() =>{
    if(newUser.nombres ==""){
      alert("Debe ingresar el nombre del usuario");
    }else if(newUser.apellidos == ""){
      alert("Debe ingresar el apellido del usuario");
    }else if(newUser.correo == ""){
      alert("Debe ingresar el correo del usuario");
    }else if(newUser.contrasena == ""){
      alert("Debe ingresar la contraseña");
    }else{
      const infoUsuario = await createUserWithEmailAndPassword(auth,newUser.correo,newUser.contrasena).then((usuarioFirebase) => {
        return usuarioFirebase;
      }).catch(error => alert("Ya existe un usuario registrado con el mismo correo"))

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
      setDoc(docuRef, { newUser });
      alert("El usuario ha sido creado exitosamente");
    }  
  }

    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>INFORMACIÓN</Text>
        <Image style={styles.foto} source={require('../../assets/user_register.png')}></Image>
        <TextInput onChangeText={(text) => setNewUser({...newUser, nombres:text})} style={styles.textInput} placeholder='Nombres'></TextInput>
        <TextInput onChangeText={(text) => setNewUser({...newUser, apellidos:text})} style={styles.textInput} placeholder='Apellidos'></TextInput>
        <TextInput onChangeText={(text) => setNewUser({...newUser, correo:text})} style={styles.textInput} placeholder='Correo Electronico'></TextInput>
        <TextInput onChangeText={(text) => setNewUser({...newUser, contrasena:text})} style={styles.textInput} secureTextEntry={true} placeholder='Contraseña'></TextInput>
        <TouchableOpacity onPress={onSend} style={styles.button}><Text style={styles.textButton}>REGISTRARSE</Text></TouchableOpacity>
        </View>
        </ScrollView>
        
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 40,
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
      width:200,
      height:200, 
      alignSelf: 'center',
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