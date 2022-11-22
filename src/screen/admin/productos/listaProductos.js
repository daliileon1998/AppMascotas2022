import React from 'react'
import { ActivityIndicator,FlatList,StyleSheet,Text,View,TouchableOpacity} from 'react-native'
import { Image } from 'react-native-elements'
import {size} from 'lodash'

export default function ListProductos({ productos, navigation,handleLoadMore }) {
  
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

function Product({item})  {
   // const {id,images,codigo,nombre,cantidad,precio,descripcion} = item
    const imageProduct = item.foto[0]

    return(
        <TouchableOpacity>
            <View style={styles.viewProduct}>
                <View style={styles.viewImageProduct}>
                <Image
                    resizeMode='cover'
                    PlaceholderContent={<ActivityIndicator color="#fff"/>}
                    source={{uri: imageProduct}}
                    style={styles.imageProduct}   
                />
                </View>
                <View>
                <Text style={styles.productTitle}>{item.codigo}</Text>
                <Text style={styles.productInformation}>{item.nombre}</Text>
                <Text style={styles.productInformation}>{item.cantidad}</Text>
                <Text style={styles.productInformation}>{item.precio}</Text>
            </View>
            </View>

        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    viewProduct:{
        flexDirection:"row",
        margin:10
    },
    viewImageProduct:{
        marginRight:15
    },
    imageProduct:{
        width:100,
        height:100
    },
    productTitle:{
        fontWeight:"bold"
    },
    productInformation:{
        paddingTop:2,
        color:"grey"
    },
    productdescripcion:{
        paddingTop:2,
        color:"grey",
        width:"75%"
    }
})