import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import DatabaseConnection from "../../database/db-connection";
import { useNavigation } from "@react-navigation/native";
import ImagenPicker from "../../components/SelectorImagen";


const db = DatabaseConnection.getConnection();

const AddObservacion = (UbicacionMapa) => {
  // estados para los campos del formulario
  const [id ,setId]=useState("");
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState(null);
  const [longitud,setLongitud]=useState("");
  const [latitud,setLatitud]=useState("");
  const rut = UbicacionMapa.route.params;
  
  useEffect(()=>{
    setLatitud(rut?.lat);
    setLongitud(rut?.long)
  },[UbicacionMapa])

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleId= (id) => {
    setId(id);
  }

  const handleTitulo= (titulo) => {
    setTitulo(titulo);
  }

  const handleImagen  = (imagen) => {
    setImagen(imagen);
  }

  // metodo guarde el formulario
  const addObservacion = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    console.log("### add Observacion ###");

    if(validateData()){
      console.log("### save observacion ###");
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO observaciones (idObservacion,titulo, imagen, longitud, latitud) VALUES (?, ?, ?, ?, ?)',
          [id,titulo, imagen, longitud, latitud],
          (tx, result) => {
            console.log("### save observacion 2 ###");
            if(result.rowsAffected > 0){
              Alert.alert("Exito", "Observacion registrada correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("ABMObservaciones"),
                }
              ],
              {
                cancelable: false
              } );
              clearData();
            }else{
              Alert.alert("Error", "Error al registrar la observacion");
            }
          },(_, error)=>{
            console.log("### observacion Error ###",error);
          }
        )
      });
    }
  }

  // metodo validar datos

  
  const validateData = () => {
    if(id === "" && !id.trim()){
      Alert.alert("Error", "El id de la observacion es obligatorio");
      return false;
    }

    if(titulo === "" && !titulo.trim()){
      Alert.alert("Error", "El titulo de la observacion es obligatoria");
      return false;
    }

    if(imagen === "" && !imagen.trim()){
      Alert.alert("Error", "La imagen de la observacion es obligatoria");
      return false;
    }
    
    return true;
  }

  //  clear de los datos
  const clearData = () => {
    setId("");
    setTitulo("");
    setImagen("");
    setLongitud("");
    setLatitud("");
  }
  // Formulario de registro de usuario
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
            <MyInputText
                  styles={styles.inputUser}
                  placeholder="Id de la Observacion"
                  onChangeText={handleId}
                  value={id}
                  keyboardType="numeric"
                />
            <View style={styles.container}>
                <Picker
                  placeholder="Titulo"
                  selectedValue={titulo}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleTitulo(itemValue)}
                  prompt="Titulo"
                >
                  <Picker.Item label="Plaga Detectada" value="Plaga Detectada" />
                  <Picker.Item label=" Planta en mal estado" value=" Planta en mal estado" />
                  <Picker.Item label="Falta de riego" value="Falta de riego" />

                </Picker>
            </View>
                <MySingleButton
                title="Seleccionar ubicación"
                btnColor="green"
                onPress={() => navigation.navigate("MapaZona",{cameFrom:"AltaObservacion"})}
                />
                <Text style={styles.TextUbicacion}>{latitud} {longitud}</Text>
                
                <ImagenPicker callback = {handleImagen}/>
                {console.log("#####Imagen",imagen)}
                {imagen !== null && <Image source={{uri: imagen}} style= {{width: 100,height:100, marginLeft:155, marginTop:10}}/>}
              
              <MySingleButton
                title="Registrar Observacion"
                btnColor="green"
                onPress={addObservacion}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddObservacion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        padding: 10,
      },
      
  inputNomIns:{},
  inputCantidad:{},

  TextUbicacion:{
    color:'black',
    display:'flex',
    marginLeft:30
  }
});