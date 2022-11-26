import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet,Text,View, TextInput,TouchableOpacity,ScrollView, Switch, Dimensions} from 'react-native'
import { addDocument, getDocumentById } from '../../../config/actions'
import {Dropdown} from 'react-native-element-dropdown';
import { Loading } from '../../../components/Loading';

const {width,height} = Dimensions.get("window")

export default function SolicitudApcion({ navigation, route}) {

const modelo = {fechaSolicitud: new Date(), usuarioAdopcion: "", datosAdoptante:[], DatosInteres:[], grupoFamiliar:[], estado:1, mascota:[]  }
const [newSolicitud,setnewSolicitud ] = useState(modelo);

const [datosAdopcion,setdatosAdopcion ] = useState();
const [datosinteres,setdatosinteres ] = useState();
const [grupoFamiliar,setgrupoFamiliar ] = useState( {recursos:0,familia:0, conformidad:0});
const [isEnable,setIsEnable] = useState(false)
const [isEnable2,setIsEnable2] = useState(false)
const [isEnable3,setIsEnable3] = useState(false)
const [loading, setLoading] = useState(false)
const [isFocus, setIsFocus] = useState(false);
const [usuario, setUser] = useState(null)
const [estadoCivi, setestadoCivi] = useState(null);
const [estratoS, setestratoS] = useState(null);
const [nivelEscolaridad, setnivelEscolaridad] = useState(null);

const estadoCivil =[
    { label:"Casado", value:1},
    { label:"Divorciado", value:2},
    { label:"Soltero", value:3},
    { label:"Union Libre", value:4},
    { label:"Viudo", value:5},
  ]

  const estrato =[
    { label:"1", value:1},
    { label:"2", value:2},
    { label:"3", value:3},
    { label:"4", value:4},
    { label:"5", value:5},
    { label:"6", value:6},
  ]

  const nivelEsco =[
    { label:"Ninguno", value:1},
    { label:"Bachillerato", value:2},
    { label:"Postgrado", value:3},
    { label:"Pregrado", value:4},
    { label:"Primaria", value:5},
    { label:"Técnico", value:6},
  ]

  useFocusEffect(
    useCallback(() => {
    const fetchData = async () => {
    setLoading(true)
    const responseData = await getDocumentById("usuarios",route.params.idUser)
    if(responseData.statusResponse){
        setUser({...responseData.data})
        let nombresU = responseData.data.nombres + ' ' + responseData.data.apellidos
        setdatosAdopcion({...datosAdopcion, nombres: nombresU})
        setdatosAdopcion({...datosAdopcion, correo: responseData.data.correo})
        newSolicitud.usuarioAdopcion = {userId: route.params.idUser, userName: responseData.data.nombres }
        const responseDataM = await getDocumentById("mascotas",route.params.idMascota)
        if(responseDataM.statusResponse){
            newSolicitud.mascota = {mascotaId: route.params.idMascota, mascotaName: responseDataM.data.nombre }
        }
    }else{
        setUser({})
        setmascota({})
        Alert.alert("Ocurrió un problema cargando la información, intente más tarde");
      }
    setLoading(false)
    }
    fetchData();
}, [route.params])
  )

const toggleSwitch = () =>{
    if(isEnable){
        setgrupoFamiliar({...grupoFamiliar, recursos :0})
    }else{
        setgrupoFamiliar({...grupoFamiliar, recursos :1})
    }
    setIsEnable(previousState => !previousState)
}
const toggleSwitch2 = () =>{
    if(isEnable2){
        setgrupoFamiliar({...grupoFamiliar, familia :0})
    }else{
        setgrupoFamiliar({...grupoFamiliar, familia :1})
    }
    setIsEnable2(previousState => !previousState)
}
const toggleSwitch3 = () =>{
    if(isEnable3){
        setgrupoFamiliar({...grupoFamiliar, conformidad :0})
    }else{
        setgrupoFamiliar({...grupoFamiliar, conformidad :1})
    }
    setIsEnable3(previousState => !previousState)
}

const GuardarSolicitud = async () =>{

    if(datosAdopcion.nombres == ""){
        alert("Debe ingresar el nombre");
    }else if(datosAdopcion.cedula ==""){
        alert("Debe ingresar el número de la Cédula");
    }else if(datosAdopcion.celular ==""){
        alert("Debe ingresar el número de celular");
    }else if(datosAdopcion.fijo ==""){
        alert("Debe ingresar el número del telefono fijo");
    }else if(datosAdopcion.correo ==""){
        alert("Debe ingresar el correo");
    }else if(datosAdopcion.direccion ==""){
        alert("Debe ingresar la dirección");
    }else if(datosAdopcion.ocupacion ==""){
        alert("Debe ingresar la ocupación");
    }else if(datosAdopcion.estadoCivil ==""){
        alert("Debe ingresar su estado civil");
    }else if(datosAdopcion.estrato ==""){
        alert("Debe ingresar su estrato");
    }else if(datosAdopcion.ocupacion ==""){
        alert("Debe ingresar su ocupación");
    }else if(datosinteres.razonAdopcion ==""){
        alert("Debe ingresar la razon de la adopción");
    }else if(datosinteres.importancia ==""){
        alert("Debe ingresar la importancia de la compañia del animal");
    }else{

        setLoading(true);
        newSolicitud.datosAdoptante = datosAdopcion
        newSolicitud.DatosInteres = datosinteres
        newSolicitud.grupoFamiliar = grupoFamiliar
        const responseProduct = await addDocument("solicitud", newSolicitud)
        setLoading(false);
        if(!responseProduct.statusResponse){
            
          alert("Error, no se ha agregado la solicitud")
        }else{
          alert("La solicitud se ha agregado exitosamente")
          navigation.navigate('Adopcion')
        }
    }
}

if(!usuario){
    return <Loading isVisible={true} text="    CARGANDO    " />
  }

    return(
        <ScrollView >
           <Text style={styles.MascotaTitle}>DATOS DEL ADOPTANTE</Text>

           <View style={styles.container}>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, nombres :text})} style={styles.textInput} placeholder='Nombres y Apellidos' value={usuario.nombres + ' '+ usuario.apellidos } ></TextInput>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, cedula :text})} style={styles.textInput} placeholder='Cédula'></TextInput>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, celular :text})} style={styles.textInput} placeholder='Celular'></TextInput>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, fijo :text})} style={styles.textInput} placeholder='Telefono Fijo'></TextInput>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, correo :text})} style={styles.textInput} placeholder='Email' value={usuario.correo} ></TextInput>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, direccion :text})} style={styles.textInput} placeholder='Dirección de Residencia'></TextInput>
           <TextInput onChangeText={(text) => setdatosAdopcion({...datosAdopcion, ocupacion :text})} style={styles.textInput} placeholder='Ocupación'></TextInput>
           <Dropdown
            style={[styles.textInput]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={estadoCivil}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccione Su Estado Civil ' : '...'}
          searchPlaceholder="Buscando..."
          value={estadoCivi}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setIsFocus(false);
            setestadoCivi(item.value)
            datosAdopcion.estadoCivil = item.value
            }}
            />
            <Dropdown
            style={[styles.textInput]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={estrato}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Seleccione Su Estrato ' : '...'}
                    searchPlaceholder="Buscando..."
                    value={estratoS}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setIsFocus(false);
                        setestratoS(item.value)
                        datosAdopcion.estrato = item.value
            }}
            />
            <Dropdown
            style={[styles.textInput]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={nivelEsco}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Seleccione Su Nivel de Escolaridad ' : '...'}
                    searchPlaceholder="Buscando..."
                    value={nivelEscolaridad}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setIsFocus(false);
                        setnivelEscolaridad(item.value)
                        datosAdopcion.escolaridad = item.value
            }}
            />
            </View>
           <Text style={styles.MascotaTitle} >DATOS DE INTERES</Text>
           <View style={styles.container}>
           <Text> ¿Por qué quiere adoptar un animal de compañia?</Text>
           <TextInput onChangeText={(text) => setdatosinteres({...datosinteres, razonAdopcion :text})} multiline={true} numberOfLines={3} style={styles.textArea} placeholder=''></TextInput>
           <Text>¿Cual es la importancia de tener un animal de compañia?</Text>
           <TextInput onChangeText={(text) => setdatosinteres({...datosinteres, importancia :text})} multiline={true} numberOfLines={3} style={styles.textArea} placeholder=''></TextInput>
           </View>

           <Text style={styles.MascotaTitle}>GRUPO FAMILIAR</Text>
           
           <View style={styles.container}>
           <Text>1. ¿Cuenta con los recursos para la manutención del animal ?</Text>
           <Switch trackColor={{false:'grey', true:'steelblue'}}
           thumbColor={isEnable ? '#f4f3f4' : '#f4f3f4'}
           ios_backgroundColor='grey'
           onValueChange={toggleSwitch}
           value={isEnable} />
           <Text> 2. ¿Toda la familia esta enterada de la llegada del animal?</Text>
           <Switch trackColor={{false:'grey', true:'steelblue'}}
           thumbColor={isEnable2 ? '#f4f3f4' : '#f4f3f4'}
           ios_backgroundColor='grey'
           onValueChange={toggleSwitch2}
           value={isEnable2} />
           <Text>3.¿Todos estan de acuerdo?</Text>
           <Switch trackColor={{false:'grey', true:'steelblue'}}
           thumbColor={isEnable3 ? '#f4f3f4' : '#f4f3f4'}
           ios_backgroundColor='grey'
           onValueChange={toggleSwitch3}
           value={isEnable3} />
           <TouchableOpacity onPress={()=> GuardarSolicitud()} style={styles.button}><Text style={styles.textButton}>REGISTRAR SOLICITUD</Text></TouchableOpacity>
           </View>
           return <Loading isVisible={true} text="    CARGANDO    " />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:width
      },
    viewMascota:{
        flexDirection:"row",
        margin:10
    },
    viewImageMascota:{
        marginRight:15
    },
    imageMascota:{
        width:110,
        height:110,
    },
    MascotaTitle:{
        marginTop:20,
        fontWeight:"bold",
        textAlign: 'left',
        fontSize:25,
        marginBottom:15,
        
    },
    MascotaInformation:{
        paddingTop:2,
        color:"grey"
    },
    Mascotadescripcion:{
        paddingTop:2,
        color:"grey",
        width:"75%"
    },
    textInput:{
        borderWidth:1,
        borderColor: 'gray',
        marginTop:10,
        padding:10,
        width: '80%',
        borderRadius: 30,
        height:50,
        backgroundColor: 'white',
        paddingStart: 30,
        textAlign: 'center'
      },
      textButton: {
        fontWeight: "bold"
      },
      button : {
        marginTop:20,
        backgroundColor: "#6495ed",
        width: '80%',
        fontSize:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        paddingVertical: 15,
        marginBottom:15,
      },
      textArea:{
        borderWidth:1,
        borderColor: 'gray',
        marginTop:10,
        marginBottom:10,
        padding:10,
        width: '80%',
        borderRadius: 30,
        backgroundColor: 'white',
        paddingStart: 30,
        textAlignVertical:'top'
  
      },
})