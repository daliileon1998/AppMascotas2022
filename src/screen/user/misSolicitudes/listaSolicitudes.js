import React from 'react'
import { ActivityIndicator,FlatList,StyleSheet,Text,View} from 'react-native'
import { Image, ListItem } from 'react-native-elements'

export default function ListSolicitudes({ solicitudes, navigation }) {

    const Estado = [
        { label : "Activo",  value:"1"},
        { label : "Rechazado",  value:"2"},
        { label : "Aprobado",  value:"3"}
    ]

    function SolicitudesU({item})  {

        console.log("item -------------->",item);
        const {id,images,nombre,edad,raza,tamaño,descripcion,peso} = item
        const imageMascota = item.mascota.mascotafoto;
        console.log("imageMascota ------------>",imageMascota);
   
        const goDetailsSolicitud = () =>{
            //navigation.navigate("infoMascota", { id, nombre})
        }
    
        return(
            <ListItem onPress={goDetailsSolicitud}>
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
                    <Text style={styles.MascotaInformation}>Nombre Mascota : {item.mascota.mascotaName}</Text>
                    <Text style={styles.MascotaInformation}>Estado : {Estado[item.estado - 1]["label"]}</Text>
                </View>
                </View>
            </ListItem>
        )
    }

    return(
        <View>
            <FlatList
                data={solicitudes}
                renderItem={SolicitudesU}
                onEndReachedThreshold={0.5}
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