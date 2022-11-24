import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';
import { addDocument, uploadImage } from '../../../config/actions';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'random-uuid-v4'


export const AddProduct = ({navigation}) =>{

  const modelo = {codigo:'',  nombre:'',  cantidad:0,  precio:0,  descripcion: 'User', estado:1, foto:'', fechaCreacion: new Date()}
  const [newProduct,setnewProduct ] = useState(modelo);
  const [image,setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSend = async() =>{
    if(newProduct.codigo ==""){
      alert("Debe ingresar el código del producto");
    }else if(newProduct.nombre == ""){
      alert("Debe ingresar el nombre del producto");
    }else if(newProduct.cantidad == ""){
      alert("Debe ingresar la cantidad del producto");
    }else if(newProduct.precio == ""){
      alert("Debe ingresar el precio del producto");
    }else if(newProduct.descripcion == ""){
      alert("Debe ingresar la descripción del producto");
    }else{
      const responseImage = await uploadImagen();
      newProduct.foto = responseImage;
      const responseProduct = await addDocument("productos", newProduct)
      if(!responseProduct.statusResponse){
        alert("Error, no se ha agregado el producto")
      }else{
        alert("El producto se ha agregado exitosamente")
        navigation.navigate('Productos')
      }
    }  
  }

  const uploadImagen = async () =>{
    const imageUrl = [];
    if(image == null) return;
    const response = await uploadImage(image, 'Products', uuid())
    if(response.statusResponse){
      imageUrl.push(response.url)
    }
    return imageUrl;

  }

    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>Añadir Producto</Text>
        {image && <Image source={{ uri: image }} style={{ width: 230, height: 230, marginTop:10 }} />}
        <TouchableOpacity onPress={() =>pickImage()} style={styles.button}><Text style={styles.textButton}>Seleccionar Imagen</Text></TouchableOpacity>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, codigo:text})} style={styles.textInput} placeholder='Código'></TextInput>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, nombre:text})} style={styles.textInput} placeholder='Nombre'></TextInput>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, cantidad:text})} style={styles.textInput} placeholder='Cantidad' keyboardType='numeric'></TextInput>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, precio:text})} style={styles.textInput} placeholder='Precio' keyboardType='numeric'></TextInput>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, descripcion:text})} style={styles.textInput} placeholder='Descripción'></TextInput>
        <TouchableOpacity onPress={() =>onSend()} style={styles.button}><Text style={styles.textButton}>GUARDAR</Text></TouchableOpacity>
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
      fontSize: 30,
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
    previewImage: {
      width: '300',
      height: '300'
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