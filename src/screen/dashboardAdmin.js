import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView } from 'react-native';

export const DashboardAdmin = () =>{
    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.titulo}>DASHBOARD ADMIN</Text>
    
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