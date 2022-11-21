import React from 'react'
import { ActivityIndicator,FlatList,StyleSheet,Text,View,TouchableOpacity} from 'react-native'
import { Image } from 'react-native-elements'
import {size} from 'lodash'

export default function ListProductos({ products, navigation}){
    return(
        <View>
            <FlatList
                data={products}
                keyExtractor={(item,index) => index.toString()}
                renderItem={(product) =>{
                    <Products product={product} navigation={navigation}/>
                }}
            
            />
        </View>
    )
}

function Products({product, navigation}){
    const {id,images,codigo,nombre,cantidad,precio,descripcion} = product.item
    const imageProduct = images[0]

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
                <Text style={styles.productTitle}>{codigo}</Text>
                <Text style={styles.productInformation}>{nombre}</Text>
                <Text style={styles.productInformation}>{cantidad}</Text>
                <Text style={styles.productInformation}>{precio}</Text>
                <Text style={styles.productdescripcion}>{
                    size(descripcion)>0
                    ? `${descripcion.substr(0,60)}...`
                    : descripcion
                }</Text>
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
        width:90,
        height:90
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