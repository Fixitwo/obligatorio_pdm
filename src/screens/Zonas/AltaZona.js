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

const AddZona = () => {
  // estados para los campos del formulario
  const [lugar, setLugar] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [trabajador, setTrabajador] = useState("");
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleLugar = (lugar) => {
    setLugar(lugar);
  }

  const handleDepartamento = (departamento) => {
    setDepartamento(departamento);
  }

  const handleTrabajador = (trabajador) => {
    setTranajador(trabajador);
  }

  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  }

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  }
  // metodo guarde el formulario
  const AddZona = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    console.log("### add user ###");

    if(validateData()){
      console.log("### save user ###");
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO zonas (lugar, departamento, trabajador, longitud, latitud) VALUES (?, ?, ?)',
          [lugar , departamento, trabajador, longitud, latitud],
          (tx, results) => {
            if(results.rowsAffected > 0){
              Alert.alert("Exito", "Zona registrado correctamente", [
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
              Alert.alert("Error", "Error al registrar la zona");
            }
          }
        )
      });
    }
  }

  // metodo validar datos
  const validateData = () => {
    if(lugar === "" && !lugar.trim()){
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    if(departamento === "" && !departamento.trim()){
      Alert.alert("Error", "El departamento es obligatorio");
      return false;
    }

    if(trabajador === "" && !trabajador.trim()){
      Alert.alert("Error", "El N° de trabajadores es obligatorio");
      return false;
    }

    if(longitud === "" && !longitud.trim()){
      Alert.alert("Error", "La longitud es obligatorio");
      return false;
    }

    if(latitud === "" && !latitud.trim()){
      Alert.alert("Error", "La latitud es obligatorio");
      return false;
    }
    return true;
  }

  //  clear de los datos
  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setTrabajador("");
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
                styles={styles.inputLugar}
                placeholder="Nombre de Lugar"
                onChangeText={handleLugar}
                value={lugar}
                />

              <MyInputText 
                styles={styles.inputDepartamento}
                placeholder="Nombre del Departamento"
                onChangeText={handleDepartamento}
                value={departamento}
                />

              <MyInputText
                styles={styles.inputTrabajador}
                placeholder="N° trabajadores"
                onChangeText={handleTrabajador}
                value={trabajador}
              />

              <MyInputText
                styles={styles.inputLongitud}
                placeholder="Longituid"
                onChangeText={handleLongitud}
                value={longitud}
              />

              <MyInputText
                styles={styles.inputLatitud}
                placeholder="Latitud"
                onChangeText={handleLatitud}
                value={latitud}
              />

              <MySingleButton
                title="Registrar Zona"
                btnColor="green"
                onPress={AddZona}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddZona;

const styles = StyleSheet.create({
  container: {},
  inputLugar:{},
  inputDepartamento:{},
  inputTrabajador:{},
  inputLongitud:{},
  inputLatitud:{}
});