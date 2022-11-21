import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native'
import { getDocuments } from '../../../config/actions';
import ListProductos from './listaProductos';
import {size} from 'lodash'

export const Productos = ({ navigation }) =>{

  const [start, setStart] = React.useState(null)
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  //const navigation = useNavigation()
  const limit = 7

 // useFocusEffect(
    React.useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await getDocuments("productos", limit);
        if(response.statusResponse){
          setStart(response.startdata);
          setProducts(response.data);
        }
        setLoading(false);
      }
      fetchData();
        /*setLoading(true);
        const response = await getDocuments("productos", limit);
        if(response.statusResponse){
          setStart(response.startdata);
          setProducts(response.data);
        }
        setLoading(false);*/
    }, [])
  //);

    return (
        <View style={styles.container}>
                  <TouchableOpacity onPress = { () => navigation.navigate('AddProducto')}><Text >Add</Text></TouchableOpacity>

        {
          size(products)>0 ? (
            <ListProductos
              products={products}
              navigation={navigation}/>
          ) : (
            <View style={styles.notFoundView}>
              <Text style={styles.notFoundText}>No hay Productos registrados</Text>
            </View>
          )
        }
        </View>       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 40,
      color: 'black',
      fontWeight: 'bold',
    },
    notFoundView:{
      flex:1,
      justifyContent: "center",
      alignItems: "center"
    },
    notFoundText:{
      fontSize:18,
      fontWeight:"bold"
    }
});