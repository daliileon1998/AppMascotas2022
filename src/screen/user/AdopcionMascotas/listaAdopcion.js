import React from 'react'
import { ActivityIndicator,FlatList,StyleSheet,Text,View} from 'react-native'
import { Image, ListItem } from 'react-native-elements'

export default function ListAdopcion({ productos, navigation,handleLoadMore }) {

    function Mascota({item, handleLoadMore})  {

        const {id,images,nombre,edad,raza,tamaño,descripcion,peso} = item
        const imageMascota = item.imagenes[0];

        const TamanioMascota =[
            { label:"Grande", value:1},
            { label:"Mediano", value:2},
            { label:"Pequeño", value:3}
          ]

        const genero =[
            { label:"Hembra", value:1},
            { label:"Macho", value:2}
          ]
    
        const goDetailsMascota = () =>{
            navigation.navigate("infoMascota", { id, nombre})
        }
    
        return(
            <ListItem onPress={goDetailsMascota}>
                <View style={styles.viewMascota}>                   
                <View style={styles.viewImageMascota}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={{uri: imageMascota}}
                        style={styles.imageMascota}   
                    />
                    </View>
                    <View>
                    <Text style={styles.MascotaTitle}>Nombre : {item.nombre}</Text>
                    <Text style={styles.MascotaInformation}>Género : {genero[item.genero - 1]["label"]}</Text>
                    <Text style={styles.MascotaInformation}>Edad : {item.edad}</Text>
                    <Text style={styles.MascotaInformation}>Raza : {item.raza.razaName}</Text>
                    <Text style={styles.MascotaInformation}>Tamaño : {TamanioMascota[item.tamaño - 1]["label"]}</Text>
                </View>
                </View>
            </ListItem>
        )
    }

    return(
        <View>
            <FlatList
                data={productos}
                renderItem={Mascota}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                keyExtractor ={item => String(item.id) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewMascota:{
        flexDirection:"row",
        margin:10
    },
    viewImageMascota:{
        marginRight:15
    },
    imageMascota:{
        width:110,
        height:110,
    },
    MascotaTitle:{
        fontWeight:"bold"
    },
    MascotaInformation:{
        paddingTop:2,
        color:"grey"
    },
    Mascotadescripcion:{
        paddingTop:2,
        color:"grey",
        width:"75%"
    }
})