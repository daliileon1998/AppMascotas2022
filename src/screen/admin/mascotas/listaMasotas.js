import React from 'react'
import { ActivityIndicator,FlatList,StyleSheet,Text,View} from 'react-native'
import { Image, ListItem } from 'react-native-elements'

export default function ListMascotas({ productos, navigation,handleLoadMore }) {

    function Product({item, handleLoadMore})  {

        const {id,images,nombre,edad,raza,tamaño,descripcion,peso} = item
        const imageMascota = item.imagenes[0]
    
        const goDetailsMascota = () =>{
            navigation.navigate("UpdateMascota", { id, nombre})
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
                    <Text style={styles.MascotaInformation}>Edad : {item.edad}</Text>
                    <Text style={styles.MascotaInformation}>Raza : {item.raza.razaName}</Text>
                    <Text style={styles.MascotaInformation}>Tamaño : {item.tamaño}</Text>
                    <Text style={styles.MascotaInformation}>Peso : {item.peso}</Text>
                </View>
                </View>
            </ListItem>
        )
    }

    return(
        <View>
            <FlatList
                data={productos}
                renderItem={Product}
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