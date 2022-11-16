import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';

export const SolicitudesAdopcion = () =>{
    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>SOLICITUDES ADOPCION</Text>
    
        </View>
        </ScrollView>
        
    );
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
});