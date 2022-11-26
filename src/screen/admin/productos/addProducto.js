import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, LogBox, Dimensions } from 'react-native';
import { addDocument, getCollectionCombo, getCollectionComboDependiente, uploadImage } from '../../../config/actions';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'random-uuid-v4'
import {Dropdown} from 'react-native-element-dropdown';

const {height, width} = Dimensions.get('window');

export const AddProduct = ({navigation}) =>{

  const modelo = {codigo:'',  nombre:'',  cantidad:0,  precio:0,  descripcion: 'User', estado:1, foto:'', categoria:[], subcategoria:[], fechaCreacion: new Date()}
  const [newProduct,setnewProduct ] = useState(modelo);
  const [image,setImage] = useState(null);
  const [category, setCategory] = useState([])
  const [categorie, setCategorie] = useState(null);
  const [categoriaId, setCategoriaId] = useState(null);
  const [categoriaName, setCategoriaName] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [subcategoriaId, setSubcategoriaId] = useState(null);
  const [subcategorieName, setSubcategorieName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      const response = await getCollectionCombo("categoriaProducto");
      setCategory(response.data)
    }
    fetchData();
  }, [])

  const subCategoria = async (name) => {
    const response = await getCollectionComboDependiente("subCategoriaProducto", name);
    setSubcategorias(response.data)
  }

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
    }else if(newProduct.categoria.length == 0){
      alert("Debe ingresar la categoria del producto");
    }else if(newProduct.subcategoria.length == 0){
      alert("Debe ingresar la subCategoria del producto");
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
        {image && <Image source={{ uri: image }} style={{ width: 250, height: 180, marginTop:10 }} />}
        <TouchableOpacity onPress={() =>pickImage()} style={styles.button}><Text style={styles.textButton}>Seleccionar Imagen</Text></TouchableOpacity>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, codigo:text})} style={styles.textInput2} placeholder='Código'></TextInput>
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, nombre:text})} style={styles.textInput} placeholder='Nombre'></TextInput>
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
            newProduct.categoria = {categoriaId: item.value, categoriaName: item.label}
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
            newProduct.subcategoria = {subcategoriaId: item.value, subcategoriaName: item.label}
            //setSubcategoriaId(item.value);
            //setSubcategorieName(item.label);
            setIsFocus(false);
          }}
        />
        <TextInput onChangeText={(text) => setnewProduct({...newProduct, cantidad:text})} style={styles.textInput2} placeholder='Cantidad' keyboardType='numeric'></TextInput>
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
      marginBottom:10,
      padding:10,
      width: '80%',
      borderRadius: 30,
      height:50,
      backgroundColor: 'white',
      paddingStart: 30,
    },
    textInput2:{
      borderWidth:1,
      borderColor: 'gray',
      marginBottom:10,
      marginTop:10,
      padding:10,
      width: '80%',
      borderRadius: 30,
      height:50,
      backgroundColor: 'white',
      paddingStart: 30,
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