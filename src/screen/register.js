import * as React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView,Dimensions } from 'react-native';
import { Loading } from '../components/Loading';
import { addCollectionUser, getCollection,createUser } from '../config/actions';

export const Newregister = () =>{

  const modelo = {nombres:'',  apellidos:'',  correo:'',  contrasena:'',  tipoUsuario: 'User',  fechaCreacion: new Date()}
  const [newUser,setNewUser] = React.useState(modelo)
  const [loading, setLoading] = React.useState(false)
  const {height, width} = Dimensions.get('window');

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
      setLoading(true);
      const result = await createUser(newUser)
      if(!result.statusResponse){
        setLoading(false)
        alert("El usuario no se ha podido crear");
      }else{
        console.log(result.data);
        const result2 = await addCollectionUser(newUser,result.data.id)
        console.log(result);
        if(!result2.statusResponse){
          setLoading(false)
          alert("error");
        }else{
          setLoading(false)
          alert("El usuario ha sido creado exitosamente");
        }
      }
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
        <Loading isVisible={loading} text="    CARGANDO    " />
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