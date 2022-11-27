import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import { StyleSheet, Text, View } from 'react-native';
import { Loading } from '../../../components/Loading';
import { getDocuments, getMoreDocuments } from '../../../config/actions';
import ListSolicitudMascotas from './listaSolicitudMasotas';
import { Icon } from 'react-native-elements';

export const SolicitudesAdopcion = ({navigation}) =>{
  const [start, setStart] = useState(null)
  const [mascotas, setMascotas] = useState([])
  const [loading, setLoading] = useState(false);
  const limit = 7

  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        /*const response = await getDocumentsSolicitud("solicitud");
        console.log("response ---------->", response);*/
        //const response = await getDocuments("mascotas", limit);
        /*if(response.statusResponse){
          setStart(response.startdata);
          setMascotas(response.data);
        
        }*/
        setLoading(false);
      }
      fetchData();
    }, [])
  )

  const handleLoadMore = async() =>{
    if(!start){
      return
    }
    setLoading(true)
    const response = await getMoreDocuments("mascotas", limit,start);
        if(response.statusResponse){
          setStart(response.startdata);
          setProducts([...mascotas, ...response.data]);
        }
    setLoading(false);
  }

    return (
      
      <View style={styles.container}>
      {
        size(mascotas) > 0 ? (
          <ListSolicitudMascotas
              productos={mascotas} 
              navigation={navigation}
              onEndReached={handleLoadMore}/>
        ) : (
          <View style={styles.notFoundView}>
            <Text style={styles.notFoundText}>No hay Mascotas registrados</Text>
          </View>
        )
      }
      <Icon 
      type="material-community"
      name="plus"
      color="#6495ed"
      reverse
      containerStyle={styles.btnContainerM}
      onPress = { () => navigation.navigate('AddMascotas')}/>
      <Loading isVisible={loading} text="    CARGANDO    " />
      </View> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainerM:{
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