import React, {useState,useEffect, useCallback} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { addDocument, getCollectionCombo, getCollectionComboDependiente, getDocumentById, updateCollection, updateCollectionStatus, uploadImage } from '../../../config/actions';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'random-uuid-v4'
import { Loading } from '../../../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const {height, width} = Dimensions.get('window');

export default function UpdateProduct  ({ navigation, route}) {

  const [producto, setProductoE] = useState(null)
  const [image,setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])
  const [isFocus, setIsFocus] = useState(false);
  const [categorie, setCategorie] = useState(null);
  const [subcategoriaId, setSubcategoriaId] = useState(null);
  const [subcategorias, setSubcategorias] = useState([]);
  

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setProductoE(null)
        setLoading(true)
         const responseData = await getDocumentById("productos",route.params.id)
         if(responseData.statusResponse){
           //cargar la información de categoria y subcategoria
           const responseCategoria = await getCollectionCombo("categoriaProducto");
           const responseSubCategoria = await getCollectionComboDependiente("subCategoriaProducto", responseData.data.categoria.categoriaName);
           setCategory(responseCategoria.data)
           setSubcategorias(responseSubCategoria.data)
           setProductoE({...responseData.data})
           setImage(...responseData.data.foto[0])
           setCategorie(responseData.data.categoria.categoriaId)
           setSubcategoriaId(responseData.data.subcategoria.subcategoriaId)
         }else{
           setProductoE({})
           Alert.alert("Ocurrió un problema cargando la información del producto, intente más tarde");
         }
         setLoading(false)
      }
      fetchData();
    }, [route.params.id])
  )

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

  const onSendEdit = async() =>{
    if(producto.codigo ==""){
      alert("Debe ingresar el código del producto");
    }else if(producto.nombre == ""){
      alert("Debe ingresar el nombre del producto");
    }else if(producto.cantidad == ""){
      alert("Debe ingresar la cantidad del producto");
    }else if(producto.precio == ""){
      alert("Debe ingresar el precio del producto");
    }else if(producto.descripcion == ""){
      alert("Debe ingresar la descripción del producto");
    }else{
      /*const responseImage = await uploadImagen();
      producto.foto = responseImage;*/
      const responseProduct = await updateCollection("productos", producto, producto.id)
      if(!responseProduct.statusResponse){
        alert("Error, no se ha modificado el producto")
      }else{
        alert("El producto se ha modificado el producto exitosamente")
        navigation.navigate('Productos')
      }
    }  
  }

  const onSendDelete = async() =>{
    const responseProduct = await updateCollectionStatus("productos", producto.id)
    if(!responseProduct.statusResponse){
      alert("Error, no se ha eliminar el producto")
    }else{
      alert("El producto se ha eliminado el producto exitosamente")
      navigation.navigate('Productos')
    }
  }

  const confirmationDelete = async() =>{

    Alert.alert("Eliminar Producto", "¿ Estas seguro de eliminar el producto ?", [
      {text:'Si', onPress:() => onSendDelete()},
      {text: 'No'}
    ])

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

  const subCategoria = async (name) => {
    const response = await getCollectionComboDependiente("subCategoriaProducto", name);
    setSubcategorias(response.data)
  }
  
  if(!producto){
    return <Loading isVisible={true} text="    CARGANDO    " />
  }

    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>Editar Producto</Text>
        <Image source={{ uri: producto.foto[0] }} style={{ width: 250, height: 180, marginTop:10 }} />
        <TouchableOpacity onPress={pickImage} style={styles.button}><Text style={styles.textButton}>Seleccionar Imagen</Text></TouchableOpacity>
        <TextInput onChangeText={(text) => setProductoE({...producto, codigo:text})} style={styles.textInput} placeholder='Código' value={producto.codigo}></TextInput>
        <TextInput onChangeText={(text) => setProductoE({...producto, nombre:text})} style={styles.textInput} placeholder='Nombre' value={producto.nombre}></TextInput>
        <Dropdown
          style={[styles.textInput]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={category}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccione una categoria' : '...'}
          searchPlaceholder="Search..."
          value={categorie}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            subCategoria(item.label);
            setIsFocus(false);
            producto.categoria = {categoriaId: item.value, categoriaName: item.label}
            //setCategoriaId(item.value);
            //setCategoriaName(item.label);
          }}
        />
        <Dropdown
          style={[styles.textInput]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={subcategorias}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccione la subcategoria' : '...'}
          searchPlaceholder="Search..."
          value={subcategoriaId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            producto.subcategoria = {subcategoriaId: item.value, subcategoriaName: item.label}
            //setSubcategoriaId(item.value);
            //setSubcategorieName(item.label);
            setIsFocus(false);
          }}
        />
        <TextInput onChangeText={(text) => setProductoE({...producto, cantidad:text})} style={styles.textInput} placeholder='Cantidad' keyboardType='numeric' value={producto.cantidad}></TextInput>
        <TextInput onChangeText={(text) => setProductoE({...producto, precio:text})} style={styles.textInput} placeholder='Precio' keyboardType='numeric' value={producto.precio}></TextInput>
        <TextInput onChangeText={(text) => setProductoE({...producto, descripcion:text})} style={styles.textInput} placeholder='Descripción' value={producto.descripcion}></TextInput>
        <TouchableOpacity onPress={() =>onSendEdit()} style={styles.buttonEdit}><Text style={styles.textButton}>EDITAR</Text></TouchableOpacity>
        <TouchableOpacity onPress={() =>confirmationDelete()} style={styles.buttonDelete}><Text style={styles.textButton}>ELIMINAR</Text></TouchableOpacity>
        <Loading isVisible={false} text="    CARGANDO    " />
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
    buttonEdit : {
      marginTop:20,
      backgroundColor: "#00A216",
      width: '80%',
      fontSize:20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:10,
      paddingVertical: 15,
    },
    buttonDelete : {
        marginTop:20,
        backgroundColor: "#D30505",
        width: '80%',
        fontSize:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        paddingVertical: 15,
      },
    textButton: {
      fontWeight: "bold"
    },
     icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color:'gray'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  
  });