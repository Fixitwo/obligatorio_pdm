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

const AddInsumo = () => {
  // estados para los campos del formulario
  const [nomIns, setNomIns] = useState("");
  const [cantidad, setCantidad] = useState("");
  

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleNomIns= (nomIns) => {
    setNomIns(nomIns);
  }

  const handleCantidad  = (cantidad) => {
    setCantidad(cantidad);
  }
  // metodo guarde el formulario
  const addInsumo = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    console.log("### add insumo ###");

    if(validateData()){
      console.log("### save insumo ###");
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO insumos (nomIns, cantidad) VALUES (?, ?)',
          [nomIns, cantidad],
          (tx, results) => {
            if(results.rowsAffected > 0){
              Alert.alert("Exito", "Insumo registrado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("ABMInsumos"),
                }
              ],
              {
                cancelable: false
              } );
              clearData();
            }else{
              Alert.alert("Error", "Error al registrar el insumo");
            }
          }
        )
      });
    }
  }

  // metodo validar datos
  const validateData = () => {
    if(nomIns === "" && !nomIns.trim()){
      Alert.alert("Error", "El nombre del insumo es obligatorio");
      return false;
    }

    if(cantidad === "" && !cantidad.trim()){
      Alert.alert("Error", "La cantidad del insumo es obligatoria");
      return false;
    }
    
    return true;
  }

  //  clear de los datos
  const clearData = () => {
    setNomIns("");
    setCantidad("");
  }
  // Formulario de registro de usuario
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText 
                styles={styles.inputNomIns}
                placeholder="Nombre de insumo"
                onChangeText={handleNomIns}
                value={nomIns}
                />

                <MyInputText 
                styles={styles.inputCantidad}
                placeholder="Cantidad en litros"
                onChangeText={handleCantidad}
                value={cantidad}
                keyboardType="numeric"
                />

              <MySingleButton
                title="Registrar Insumo"
                btnColor="green"
                onPress={addInsumo}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddInsumo;

const styles = StyleSheet.create({
  container: {},
  inputNomIns:{},
  inputCantidad:{}
});