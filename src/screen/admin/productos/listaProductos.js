import React from 'react'
import { ActivityIndicator,FlatList,StyleSheet,Text,View} from 'react-native'
import { Image, ListItem } from 'react-native-elements'

export default function ListProductos({ productos, navigation,handleLoadMore }) {

    function Product({item, handleLoadMore})  {

        const {id,images,codigo,nombre,cantidad,precio,descripcion} = item
        const imageProduct = item.foto[0]
    
        const goDetailsProduct = () =>{
            navigation.navigate("UpdateProducto", { id, nombre})
        }
    
        return(
            <ListItem onPress={goDetailsProduct}>
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
                    <Text style={styles.productTitle}>Código : {item.codigo}</Text>
                    <Text style={styles.productInformation}>Nombre : {item.nombre}</Text>
                    <Text style={styles.productInformation}>Cantidad : {item.cantidad}</Text>
                    <Text style={styles.productInformation}>Precio : {item.precio}</Text>
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
    viewProduct:{
        flexDirection:"row",
        margin:10
    },
    viewImageProduct:{
        marginRight:15
    },
    imageProduct:{
        width:100,
        height:100,
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