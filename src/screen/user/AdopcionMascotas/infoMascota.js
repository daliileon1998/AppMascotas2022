import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { getCurrentUser, getDocumentById, } from '../../../config/actions';
import { Loading } from '../../../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import CarouselImages from '../../../components/carrouselImages'
import { Icon, ListItem } from 'react-native-elements';
import { map } from 'lodash';

const widthScreen = Dimensions.get("window").width

export default function InfoMascota  ({ navigation, route}) {

  const TamanioMascota =[
    { label:"Grande", value:1},
    { label:"Mediano", value:2},
    { label:"Pequeño", value:3}
  ]

  const genero =[
    { label:"Hembra", value:1},
    { label:"Macho", value:2}
  ]

  const [mascota, setMascotaE] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [idMascota, setIdMascota] = useState('')
  const [idUser, setIdUser] = useState('')

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setMascotaE(null)
        setLoading(true)
        setIdUser(getCurrentUser())
         const responseData = await getDocumentById("mascotas",route.params.id)
         if(responseData.statusResponse){
           setMascotaE({...responseData.data})
           setImageSelected(responseData.data.imagenes)
           setIdMascota(responseData.data.id)
         }else{
           setMascotaE({})
           Alert.alert("Ocurrió un problema cargando la información de la mascota, intente más tarde");
         }
         setLoading(false)
      }
      fetchData();
    }, [route.params.id])
  )
  
  if(!mascota){
    return <Loading isVisible={true} text="    CARGANDO    " />
  }

    return (
        <ScrollView style={styles.container}>
        <CarouselImages
                images={mascota.imagenes}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
        <TitleRestaurant
                name={mascota.nombre}
                description={mascota.descripcion}
            />

        <RestaurantInfo
                edad={mascota.edad}
                raza={mascota.raza.razaName}
                tamanio={TamanioMascota[mascota.tamaño - 1]["label"]}
                peso={mascota.peso}
                genero={genero[mascota.genero - 1]["label"]}
            />

        <View style={styles.view}> 
        <TouchableOpacity onPress={() => navigation.navigate('solicitudAdop', { idMascota, idUser })} style={styles.button}><Text style={styles.textButton}>ADOPTAME</Text></TouchableOpacity>
        </View>
        <Loading isVisible={false} text="    CARGANDO    " />
        </ScrollView>
    );
}

function TitleRestaurant({ name, description }) {
    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}> {name}</Text>
            </View>
            <Text style={styles.descriptionRestaurant}>  {description}</Text>
        </View>
    )
}

function RestaurantInfo({ edad, raza, tamanio, peso, genero, }) {

  const listInfo = [
      { type: "addres", text: edad, image: require('../../../../assets/edad.png') },
      { type: "phone", text: raza, image: require('../../../../assets/raza.png') },
      { type: "email", text: tamanio, image: require('../../../../assets/sizePet.png') },
      { type: "email", text: peso + ' ' + 'KG' , image: require('../../../../assets/peso.png') },
      { type: "email", text: genero, image: require('../../../../assets/genero.png') },
  ]

  return (
      <View style={styles.viewRestaurantInfo}>
          <Text style={styles.restaurantInfoTitle}>
              INFORMACIÓN SOBRE LA MASCOTA
          </Text>
          {
              map(listInfo, (item, index) => (
                  <ListItem
                      key={index}
                      style={styles.containerListItem}
                      containerStyle={{backgroundColor:"whiite"}}
                  >
                      <Image source={ item.image } style={styles.foto}
                          
                      />
                      <ListItem.Content>
                          <ListItem.Title>{item.text}</ListItem.Title>
                      </ListItem.Content>
                  </ListItem>
              ))
          }
      </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titulo: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
    },
    nameRestaurant: {
        fontWeight: "bold",
        fontSize:30
    },
    descriptionRestaurant: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    viewRestaurantContainer: {
        flexDirection: "row"
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
    view:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    foto:{
      width:25,
      height:25, 
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
},
restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
},
containerListItem: {
  borderBottomColor: "black",
  borderBottomWidth: 1
},
  });