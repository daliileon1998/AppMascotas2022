import React, {useState,useEffect, useCallback} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { getCurrentUser, getDocumentById, } from '../../../config/actions';
import { Loading } from '../../../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import CarouselImages from '../../../components/carrouselImages'

const widthScreen = Dimensions.get("window").width

export default function InfoMascota  ({ navigation, route}) {

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
    }
  });