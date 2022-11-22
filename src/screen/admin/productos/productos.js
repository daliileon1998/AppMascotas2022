import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { getDocuments, getMoreDocuments } from '../../../config/actions';
import ListProductos from './listaProductos';
import {size} from 'lodash'
import { Icon } from 'react-native-elements';
import { Loading } from '../../../components/Loading';

export const Productos = ({ navigation }) =>{

  const [start, setStart] = React.useState(null)
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const limit = 7

    React.useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await getDocuments("productos", limit);
        if(response.statusResponse){
          setStart(response.startdata);
          setProducts(response.data);
          setLoading(false);
        }
      }
      fetchData();
    }, [])
  
  const handleLoadMore = async() =>{
    if(!start){
      return
    }
    setLoading(true)
    const response = await getMoreDocuments("productos", limit,start);
        if(response.statusResponse){
          setStart(response.startdata);
          setProducts([...products, ...response.data]);
        }
    setLoading(false);
  }

    return (
        <View style={styles.container}>
        {
          size(products) > 0 ? (
            <ListProductos
              productos={products} 
              navigation={navigation}
              handleLoadMore={handleLoadMore}/>
          ) : (
            <View style={styles.notFoundView}>
              <Text style={styles.notFoundText}>No hay Productos registrados</Text>
            </View>
          )
        }
        <Icon 
        type="material-community"
        name="plus"
        color="#6495ed"
        reverse
        containerStyle={styles.btnContainer}
        onPress = { () => navigation.navigate('AddProducto')}/>
        <Loading isVisible={loading} text="    CARGANDO    " />
        </View>       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    btnContainer:{
      position: "absolute",
      bottom:10,
      right:10,
      shadowColor:"black",
      shadowOffset: { width:2,height:2},
      shadowOpacity:0.5
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