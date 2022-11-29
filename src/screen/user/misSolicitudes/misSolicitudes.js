import React, {useState,useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, ScrollView,Text } from 'react-native';
import {size} from 'lodash'
import { Loading } from '../../../components/Loading';
import { getDocuments, getDocumentsS, getMoreDocumentsS } from '../../../config/actions';
import ListSolicitudes from './listaSolicitudes';

export const MisSolicitudes = ({ navigation }) =>{

  const [start, setStart] = useState(null)
  const [solicitudes, setsolicitud] = useState([])
  const [loading, setLoading] = useState(false);
  const limit = 7


  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const fetchData = async () => {
        const response = await getDocumentsS("solicitud", limit);
        if(response.statusResponse){
          setStart(response.startdata);
          setsolicitud(response.data);
          console.log("solicitud -------------->",solicitudes);
        
        }
      }
      fetchData();
      setLoading(false);
    }, [])
  )

  if(!solicitudes){
    return <Loading isVisible={true} text="    CARGANDO    " />
  }

  const handleLoadMore = async() =>{
    if(!start){
      return
    }
    setLoading(true)
    const response = await getMoreDocumentsS("solicitud", limit,start);
        if(response.statusResponse){
          setStart(response.startdata);
          setProducts([...solicitudes, ...response.data]);
        
        }
    setLoading(false);
  }

    return (
      <View style={styles.container}>
      {
        size(solicitudes) > 0 ? (
          <ListSolicitudes
          solicitudes={solicitudes} 
          navigation={navigation}/>
          
        ) : (
          <View style={styles.notFoundView}>
            <Text style={styles.notFoundText}>No hay Solicitudes registrados</Text>
          </View>
        )
      }
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