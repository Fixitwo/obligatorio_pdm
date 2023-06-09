import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import DatabaseConnection from "../../database/db-connection";
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();

const AddZone = () => {
    // estados para los campos del formulario
    const [site, setSite] = useState("");
    const [departament, setDepartament] = useState("");
    const [workers, setWorkers] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
  
    const navigation = useNavigation();
  
    // metodo para setear los estados
    const handleSite = (site) => {
      setSite(site);
    }
  
    const handleDepartament = (departament) => {
      setDepartament(departament);
    }

    const handleWorkers = (workers) => {
        setWorkers(workers);
      }
  
    const handleLatitude = (latitude) => {
      setLatitude(latitude);
    }
    const handleLongitude = (longitude) => {
        setLongitude(longitude);
    }
    
    // metodo guarde el formulario
    const AddZone = () => {
      // llamar a la validacion de datos
      // si la validacion es correcta
      // llamar al metodo de guardar
      console.log("### add zone ###");
  
      if(validateData()){
        console.log("### save zone ###");
        // llamar a la db y guarar los datos
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO sites (site, departament, workers, latitude, longitude) VALUES (?, ?, ?)',
            [site, departament,workers, longitude, latitude],
            (tx, results) => {
              if(results.rowsAffected > 0){
                Alert.alert("Exito", "La zona se ah registrado correctamente", [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("HomeScreen"),
                  }
                ],
                {
                  cancelable: false
                } );
                clearData();
              }else{
                Alert.alert("Error", "Error la zona no se ah registrado correctamente");
              }
            }
          )
        });
      }
    }
  
    // metodo validar datos
    const validateData = () => {
      if(site === "" && !site.trim()){
        Alert.alert("Error", "El lugar es obligatorio");
        return false;
      }
  
      if(departament === "" && !departament.trim()){
        Alert.alert("Error", "El departamento es obligatoria");
        return false;
      }
  
      if(!workers.trim()){
        Alert.alert("Error", "El numero de trabajadores es obligatorio");
        return false;
      }

      if(!latitude.trim()){
        Alert.alert("Error", "La latitud es obligatoria");
        return false;
      }

      if(!longitude.trim()){
        Alert.alert("Error", "La longitud es obligatoria");
        return false;
      }
      return true;
    }
  
    //  clear de los datos
    const clearData = () => {
      setSite("");
      setDepartament("");
      setWorkers("");
      setLatitude("");
      setLongitude("");
    }
    // Formulario de registro de Zona
    return (
      <SafeAreaView>
        <View>
          <View>
            <ScrollView>
              <KeyboardAvoidingView>
                <MyInputText 
                  styles={styles.inputSite}
                  placeholder="Nombre de Lugar"
                  onChangeText={handleSite}
                  value={site}
                  />
  
                <MyInputText
                  styles={styles.inputSite}
                  placeholder="Departamento"
                  onChangeText={handleDepartament}
                  value={departament}
                />
  
                <MyInputText
                  styles={styles.inputWorkers}
                  placeholder="N° Trabajadores"
                  onChangeText={handleWorkers}
                  value={workers}
                />
                <MyInputText
                  styles={styles.inputLatitude}
                  placeholder="Latitud"
                  onChangeText={handleLatitude}
                  value={latitude}
                />
                <MyInputText
                  styles={styles.inputLongitude}
                  placeholder="Longitud"
                  onChangeText={handleLongitude}
                  value={longitude}
                />
                <MySingleButton
                  title="Registrar Zona"
                  btnColor="green"
                  onPress={AddZone}
                />
  
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default AddZone;
  
  const styles = StyleSheet.create({
    container: {},
    inputSite:{},
    inputDepartament:{},
    inputWorkers:{},
    inputLatitude:{},
    inputLongitude:{}
  });