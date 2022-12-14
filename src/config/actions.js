import { LogBox } from 'react-native';
import { firebase } from './fb'

const db = firebase.firestore();

export const isUserLogged = async() =>{
    const result = {statusResponse : false,isLogged: false, rol:null}
    firebase.auth().onAuthStateChanged(async(user) =>{
        if(user !== null){
            result.statusResponse=true
            result.rol = await getRol(user.uid)
            result.isLogged = true
        }
    })
    return result;
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: false, error: null, id:null, rol:null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password).
        then( async(userCredentials) => {
          const user = userCredentials.user;
          const id = user.uid;
          const tiprol = await getRol(id);
          result.id = id;
          result.rol = tiprol;
          result.statusResponse = true
        }).catch(error => result.error = error.message )

    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser.uid
}

export const getRol = async (id) =>{
    const response = await db.collection("usuarios/").doc(id).get()
    return response.data().tipoUsuario;
}

export const getCollection = async(tabla)=>{
    const result = {statusResponse : false, data: null, error:null}
    try {
        const data = await db.collection(tabla).get() 
        const arrayData = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
        result.statusResponse=true
        result.data=arrayData
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const addCollectionUser = async(data, id)=>{
    const result = {statusResponse : false, data: null, error:null}
    try {
        const response = await db.collection("usuarios").doc(id).set(data);
        result.statusResponse=true
        result.data= response
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const createUser = async(data) =>{
    const result = {statusResponse : false, data: null, error:null}
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.correo,data.contrasena)
        result.statusResponse=true
        result.data= {id : response.user.uid}
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const addDocument = async(tabla,data) =>{
    const result = {statusResponse : true, data: null, error:null}
    try {
        await db.collection(tabla).add(data);
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const getDocuments = async(tabla,limit) =>{
    const result = {statusResponse : true, error:null, data: [], startdata:null}
    try {
        const response = await db.collection(tabla).where("estado","==", 1).orderBy("nombre").limit(limit).get()
        if(response.docs.length>0){
            result.startdata = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) =>{
            const info = doc.data()
            info.id = doc.id
            result.data.push(info)
        })
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const getDocumentsS = async(tabla,limit) =>{
    const result = {statusResponse : true, error:null, data: [], startdata:null}
    try {
        firebase.auth().onAuthStateChanged(async(user) =>{
            const response = await db.collection(tabla).where("usuarioAdopcion.userId","==", user.uid).orderBy("fechaSolicitud").limit(limit).get()
            if(response.docs.length>0){
                result.startdata = response.docs[response.docs.length - 1]
            }
            response.forEach((doc) =>{
                const info = doc.data()
                info.id = doc.id
                result.data.push(info)
            })
        })
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const getMoreDocumentsS = async(tabla,limit,start) =>{
    const result = {statusResponse : true, error:null, data: [], startdata:null}
    try {
        const response = await db
        .collection(tabla)
        .orderBy("fechaSolicitud",'asc')
        .startAfter(start.data().nombre)
        .limit(limit)
        .get();
        if(response.docs.length>0){
            result.startdata = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) =>{
            const info = doc.data()
            info.id = doc.id
            result.data.push(info)
        })
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const getCollectionCombo = async(tabla)=>{
    const result = {statusResponse : true, data: [], error:null}
    try {
        const response = await db.collection(tabla).get() 
        response.forEach((doc) =>{
            const info = doc.data()
            info.id = doc.id
            result.data.push({label:info.nombre, value:info.id})
        })
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const getCollectionComboDependiente = async(tabla, data)=>{
    const result = {statusResponse : true, data: [], error:null}
    try {
        const response = await db.collection(tabla).where("categoria.nombreCategoria","==", data).orderBy("nombre").get()
        response.forEach((doc) =>{
            const info = doc.data()
            info.id = doc.id
            result.data.push({label:info.nombre, value:info.id})
        })
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const getMoreDocuments = async(tabla,limit,start) =>{
    const result = {statusResponse : true, error:null, data: [], startdata:null}
    try {
        const response = await db
        .collection(tabla)
        .orderBy("nombre",'asc')
        .startAfter(start.data().nombre)
        .limit(limit)
        .get();
        if(response.docs.length>0){
            result.startdata = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) =>{
            const info = doc.data()
            info.id = doc.id
            result.data.push(info)
        })
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const uploadImage = async(image,path,name) => {
    const result = {statusResponse : false, url: null, error:null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)
    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse=true
        result.url = url
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const fileToBlob = async(path) =>{
    const file = await fetch(path)
    const blob = await file.blob()
    return blob;
}

export const getDocumentById = async(tabla,id) =>{
    const result = {statusResponse : true, data: null, error:null}
    try {
       const response = await db.collection(tabla).doc(id).get()
       result.data = response.data()
       result.data.id = response.id
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}

export const updateCollection = async(tabla, data,id) =>{
    const result = {statusResponse : true, data: null, error:null}
    try {
       const response = await db.collection(tabla).doc(id).update(data)
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
    //db.collection("users").doc(doc.id).update({foo: "bar"});
}

export const updateCollectionStatus = async(tabla, id) =>{
    const result = {statusResponse : true, data: null, error:null}
    try {
       const response = await db.collection(tabla).doc(id).update({estado:0})
    } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
    //db.collection("users").doc(doc.id).update({foo: "bar"});
}

/*export const getDocumentsSolicitud = async(tabla) =>{
    const result = {statusResponse : true, error:null, data: [], startdata:null}
    const orderData = [];
    try {
        const response = await db.collection(tabla).where("estado","==", 1).orderBy("fechaSolicitud").get()
        response.forEach((doc) =>{
            const info = doc.data()
            result.data.push(info)
        })

        /*response.forEach(doc => orderData.push(doc.data().mascota.mascotaId))
        console.log("orderData ----------->",orderData);
        let grouped = mapValues(groupBy(orderData, 'orderDate'),
        clist => clist.map(car => omit(car, 'orderDate'))
        );
        console.log(grouped);*/

    /*    orders.forEach(order => orderData.push(order.data()))
    let grouped = mapValues(groupBy(orderData, 'orderDate'),
        clist => clist.map(car => omit(car, 'orderDate'))
    );
    console.log(grouped);*/


       /* const response2 = await db.collection("mascotas").where("id","in", id).orderBy("nombre").get()
        console.log("response 2 ------------->", response2);*/
   /* } catch (error) {
        result.error = error;
        result.statusResponse=false;
    }
    return result;
}*/