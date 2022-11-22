import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

export const Loading = ({ isVisible, text}) => {
  return (
    <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,0.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay} >
        <View style={styles.view}>
            <ActivityIndicator/>
            {
                text && <Text style={styles.text}>{text}</Text>
            }
        </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay:{
      height:100,
      width:200,
      backgroundColor: "#fff",
      borderColor: "white",
      borderWidth:2,
      borderRadius:10
    },
    view:{
     flex:1,
     alignItems:"center",
     justifyContent:"center"
     
    },
    text:{
      paddingTop:12,
      textAlign:"center",
    }
})