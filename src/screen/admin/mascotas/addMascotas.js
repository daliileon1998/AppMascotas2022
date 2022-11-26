import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { addDocument, getCollectionCombo, uploadImage } from '../../../config/actions';
import { Avatar, Icon } from 'react-native-elements';
import {size, map, filter} from 'lodash'
import CountryPicker from 'react-native-country-picker-modal'
import uuid from 'random-uuid-v4'
import { loadImageFromGallery } from '../../../components/helpers';
import { Loading } from '../../../components/Loading';
import {Dropdown} from 'react-native-element-dropdown';

const widthScreen = Dimensions.get("window").width

export const AddMascotas = ({navigation}) =>{

  const modelo = {nombre:'',  edad:0, raza:[], descripcion:'', tamaño:'',  peso: 0, estado:1, imagenes:'', fechaCreacion: new Date()}
  const [newMascota,setnewMascota ] = useState(modelo);
  const [image,setImage] = useState(null);
  const [imageSelected, setImageSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [isFocus, setIsFocus] = useState(false);
  const [raza, setraza] = useState([]);
  const [razaId, setrazaId] = useState(null);
  const [tamanioMa, settamanioMa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      const response = await getCollectionCombo("razaMascotas");
      setraza(response.data)
    }
    fetchData();
  }, [])

  const TamanioMascota =[
    { label:"Grande", value:1},
    { label:"Mediano", value:2},
    { label:"Pequeño", value:3}
  ]
  
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

  const uploadImagenMascota = async () =>{
    const imageUrl = [];
    await Promise.all(
      map(imageSelected, async(image) =>{
        const response = await uploadImage(image, 'Pets', uuid())
        if(response.statusResponse){
          imageUrl.push(response.url)
        }
      })
    )
    return imageUrl   
  }

  function ImageMascota({ imagePet }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 150, width:280}}
                source={
                  imagePet
                        ? { uri: imagePet}
                        : require("../../../../assets/no-image.png")
                }
            />
        </View>
    )
}

  const onSendMascotas = async() =>{
    if(newMascota.nombre ==""){
      alert("Debe ingresar el nombre de la mascota");
    }else if(newMascota.edad == ""){
      alert("Debe ingresar la edad de la mascota");
    }else if(newMascota.raza.length == 0){
      alert("Debe ingresar la raza de la mascota");
    }else if(newMascota.tamaño == ""){
      alert("Debe ingresar el tamaño de la mascota");
    }else if(newMascota.peso == ""){
      alert("Debe ingresar el peso de la mascota");
    }else if(newMascota.descripcion == ""){
      alert("Debe ingresar la descripción del producto");
    }else{
      setLoading(true)
      const responseImage = await uploadImagenMascota();
      console.log("responseImage ----------->",responseImage);
      newMascota.imagenes = responseImage;
      const responseProduct = await addDocument("mascotas", newMascota)
      if(!responseProduct.statusResponse){
        setLoading(false)
        alert("Error, no se ha agregado la mascota")
      }else{
        setLoading(false)
        alert("La mascota se ha agregado exitosamente")
        navigation.navigate('Mascotas')
      }
    }  
  }

// <TextInput onChangeText={(text) => setnewMascota({...newMascota, raza:text})} style={styles.textInput} placeholder='Raza'></TextInput>
    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>Añadir Mascota</Text>
        <ImageMascota imagePet={imageSelected[0]}/>
        <TextInput onChangeText={(text) => setnewMascota({...newMascota, nombre:text})} style={styles.textInput} placeholder='Nombre'></TextInput>
        <TextInput onChangeText={(text) => setnewMascota({...newMascota, edad:text})} style={styles.textInput} placeholder='Edad' keyboardType='numeric'></TextInput>
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
          searchPlaceholder="Search..."
          value={razaId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            newMascota.raza = {razaId: item.value, razaName: item.label}
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
          searchPlaceholder="Search..."
          value={tamanioMa}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            newMascota.tamaño =item.value
          }}
        />
        <TextInput onChangeText={(text) => setnewMascota({...newMascota, peso:text})} style={styles.textInput} placeholder='Peso' keyboardType='numeric'></TextInput>
        <TextInput multiline={true} numberOfLines={3} onChangeText={(text) => setnewMascota({...newMascota, descripcion:text})} style={styles.textArea} placeholder='Descripción'></TextInput>
        <UploadImageMascota imageSelected={imageSelected} setImageSelected={setImageSelected}/>
        <TouchableOpacity onPress={() => onSendMascotas()} style={styles.button}><Text style={styles.textButton}>GUARDAR</Text></TouchableOpacity>
        <Loading isVisible={loading} text="    CARGANDO    " />
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
      height: 150,
      marginBottom: 20
    },
    textArea:{
      borderWidth:1,
      borderColor: 'gray',
      marginTop:10,
      padding:10,
      width: '80%',
      borderRadius: 30,
      backgroundColor: 'white',
      paddingStart: 30,
      textAlignVertical:'top'

    },
  });