import React, {useState,useEffect, useCallback} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { getCollectionCombo, getDocumentById, updateCollection, updateCollectionStatus, uploadImage } from '../../../config/actions';
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {size, map, filter} from 'lodash'
import uuid from 'random-uuid-v4'
import { Loading } from '../../../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import { loadImageFromGallery } from '../../../components/helpers';

const widthScreen = Dimensions.get("window").width

export default function UpdateMascota  ({ navigation, route}) {

  const [mascota, setMascotaE] = useState(null)
  const [image,setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState([])
  const [isFocus, setIsFocus] = useState(false);
  const [raza, setraza] = useState([]);
  const [razaId, setrazaId] = useState(null);
  const [tamanioMa, settamanioMa] = useState(null);
  const [genero, setgenero] = useState([]);
  const [generoId, setgeneroId] = useState(null);

  const TamanioMascota =[
    { label:"Grande", value:1},
    { label:"Mediano", value:2},
    { label:"Pequeño", value:3}
  ]
  const generoM =[
    { label:"Hembra", value:1},
    { label:"Macho", value:2}
  ]

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setMascotaE(null)
        setLoading(true)
         const responseData = await getDocumentById("mascotas",route.params.id)
         if(responseData.statusResponse){
          const responseraza = await getCollectionCombo("razaMascotas");
           setMascotaE({...responseData.data})
           setImage(...responseData.data.imagenes[0])
           setraza(responseraza.data)
           setrazaId(responseData.data.raza.razaId)
           settamanioMa(responseData.data.tamaño)
           setImageSelected(responseData.data.imagenes)
         }else{
           setMascotaE({})
           Alert.alert("Ocurrió un problema cargando la información de la mascota, intente más tarde");
         }
         setLoading(false)
      }
      fetchData();
    }, [route.params.id])
  )
  function UploadImageMascota({ imageSelected, setImageSelected}){

    const imageSelect = async() =>{
          const response = await loadImageFromGallery([4,3])
          if(!response.status){
              Alert.alert("No has seleccionado ninguna imagen")
              return
          }
          setImageSelected([...imageSelected, response.image])
          // setImagesSelected([...imagesSelected, response.image])
      }

      const removeImage = (image) =>{
        Alert.alert(
          "Eliminar imagen",
          "¿Estas seguro que quiere eliminar la imagen?",
          [
            {
              text: "No",
              style: "cancel"
            },
            {
              text:"Si",
              onPress: () =>{
                setImageSelected(
                  filter(imageSelected, (imageUrl) => imageUrl !== image)
                )
              }
            }
          ],
          { cancelable: true }
        )
      }

    return(
        <ScrollView horizontal style={styles.viewImages}>
            {
                size(imageSelected) < 10 && (
                    <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                    />
                )
            }
            {
                map(imageSelected,(imageMascota, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{uri:imageMascota}}
                        onPress={()=> removeImage(imageMascota)}
                    
                    />
                ))
            }

        </ScrollView>
    )
  }

  const onSendEdit = async() =>{
    if(mascota.nombre ==""){
      alert("Debe ingresar el nombre de la mascota");
    }else if(mascota.edad == ""){
      alert("Debe ingresar la edad de la mascota");
    }else if(mascota.raza.lengt == 0){
      alert("Debe ingresar la raza de la mascota");
    }else if(mascota.tamaño == ""){
      alert("Debe ingresar el tamaño de la mascota");
    }else if(mascota.peso == ""){
      alert("Debe ingresar el peso de la mascota");
    }else if(mascota.descripcion == ""){
      alert("Debe ingresar la descripción del producto");
    }else{
      /*const responseImage = await uploadImagen();
      producto.foto = responseImage;*/
      const responseProduct = await updateCollection("mascotas", mascota, mascota.id)
      if(!responseProduct.statusResponse){
        alert("Error, no se ha modificado el producto")
      }else{
        alert("El producto se ha modificado el producto exitosamente")
        navigation.navigate('Mascotas')
      }
    }  
  }

  const onSendDelete = async() =>{
    const responseProduct = await updateCollectionStatus("mascotas", mascota.id)
    if(!responseProduct.statusResponse){
      alert("Error, no se ha eliminar la mascota")
    }else{
      alert("La mascota se ha eliminado la mascota exitosamente")
      navigation.navigate('Mascotas')
    }
  }

  const confirmationDelete = async() =>{

    Alert.alert("Eliminar Mascota", "¿Estas seguro de eliminar la mascota?", [
      {text:'Si', onPress:() => onSendDelete()},
      {text: 'No'}
    ])

  }

  function ImageMascota({ imagePet }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 120, width:280}}
                source={
                  imagePet
                        ? { uri: imagePet}
                        : require("../../../../assets/no-image.png")
                }
            />
        </View>
    )
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
  
  if(!mascota){
    return <Loading isVisible={true} text="    CARGANDO    " />
  }

    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>Editar Mascota</Text>
        <ImageMascota imagePet={imageSelected[0]}/>
        <TextInput onChangeText={(text) => setMascotaE({...mascota, nombre:text})} style={styles.textInput} placeholder='Nombre' value={mascota.nombre}></TextInput>
        <Dropdown
          style={[styles.textInput]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={genero}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccione el género de la mascota' : '...'}
          searchPlaceholder="Buscando..."
          value={generoId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            mascota.genero = item.value
            setIsFocus(false);
          }}
        />
        <TextInput onChangeText={(text) => setMascotaE({...mascota, edad:text})} style={styles.textInput} placeholder='Edad' keyboardType='numeric' value={mascota.edad}></TextInput>
        <Dropdown
          style={[styles.textInput]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={raza}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccione la raza' : '...'}
          searchPlaceholder="Buscando..."
          value={razaId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            mascota.raza = {razaId: item.value, razaName: item.label}
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.textInput]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={TamanioMascota}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccione el Tamaño ' : '...'}
          searchPlaceholder="Buscando..."
          value={tamanioMa}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            mascota.tamaño =item.value
          }}
        />
        <TextInput onChangeText={(text) => setMascotaE({...mascota, peso:text})} style={styles.textInput} placeholder='Peso' keyboardType='numeric' value={mascota.peso}></TextInput>
        <TextInput onChangeText={(text) => setMascotaE({...mascota, descripcion:text})} style={styles.textInput} placeholder='Descripción' value={mascota.descripcion}></TextInput>
        <UploadImageMascota imageSelected={imageSelected} setImageSelected={setImageSelected}/>
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
    viewImages:{
      flexDirection:"row",
      marginHorizontal:20,
      marginTop:10
  },
  containerIcon:{
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    height:70,
    width:79,
    backgroundColor: "#e3e3e3"
},
miniatureStyle:{
    width:70,
    height:70,
    marginRight:10
},
viewPhoto: {
  alignItems: "center",
  height: 120,
  marginBottom: 20
},
  
  });