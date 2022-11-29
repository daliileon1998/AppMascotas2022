import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CarouselImagesD from '../../components/carrouselImagesD';

const widthScreen = Dimensions.get("window").width

export const DashboardAdmin = () =>{

  const [activeSlide, setActiveSlide] = useState(0)

  const Imagenes = [
    {label : require('../../../assets/petsA.png')},
    {label : require('../../../assets/solicitudes.png')}
    ];

    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>BIENVENIDO ADMINISTRADOR</Text>
        <CarouselImagesD
                images={Imagenes}
                height={500}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
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
      marginBottom:20,
      marginTop:130
    },
    carrusel:{
      marginTop:40
    }
});