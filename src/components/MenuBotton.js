import React from 'react';
import { StyleSheet,Text, View,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';


export const MenuBotton = ({ text, onPress,image}) =>{
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={ onPress }>
        <Image style={styles.foto} source={ image }></Image>
        <Text style={styles.text}> {text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        alignItems:'center',
    
        marginBottom:15,
        padding:15,
        borderRadius:10,
        flexDirection:'row'
    },
    foto:{
        width:25,
        height:25, 
    },
    text:{
        fontWeight:'bold',
        marginStart:30,
        fontSize:15,
        color:'gray'
    }
});