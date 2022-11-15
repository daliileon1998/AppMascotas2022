import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';

export const Newregister = () =>{
    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>INFORMACIÓN</Text>
        <Image style={styles.foto} source={require('../../assets/user_register.png')}></Image>
        <TextInput style={styles.textInput} placeholder='Nombres'></TextInput>
        <TextInput style={styles.textInput} placeholder='Apellidos'></TextInput>
        <TextInput style={styles.textInput} placeholder='Correo Electronico'></TextInput>
        <TextInput style={styles.textInput} placeholder='Username'></TextInput>
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Contraseña'></TextInput>
        <TouchableOpacity style={styles.button}><Text style={styles.textButton}>REGISTRARSE</Text></TouchableOpacity>
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