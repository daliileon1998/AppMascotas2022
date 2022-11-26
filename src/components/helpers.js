import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {Alert} from 'react-native'




export const loadImageFromGallery = async() =>{

    const response = {status:false, image:null}
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    if(result.canceled){
        return response
    }
    response.status=true
    response.image = result.assets[0].uri
    return response
}
/*const result = await ImagePicker.launchImageLibraryAsync({      
        allowsEditing: true,
        aspect: array
    })
    if (result.cancelled) {
        return response
    }
    response.status = true
    response.image = result.uri
    return response*/