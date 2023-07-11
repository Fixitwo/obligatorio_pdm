import React, { useState } from "react";
import {
  StyleSheet,
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

const AñadirUsuario = () => {
  // estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleNombre = (nombre) => {
    setNombre(nombre);
  };

  const handleApellido = (apellido) => {
    setApellido(apellido);
  };

  const handleCedula = (cedula) => {
    setCedula(cedula);
  };
  // metodo guarde el formulario
  const añadirUsuario = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    if (validateData()) {
      console.log("### save user ###");
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO usuarios(nombre, apellido, cedula) VALUES (?, ?, ?)',
          [nombre, apellido, cedula],
          (tx,results) => {
              if(results.rowsAffected > 0){
                Alert.alert("Exito", "Usuario registrado correctamente", [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("VerTodosLosUsuarios"),
                  }
                ],
                {
                  cancelable: false
                } );
                clearData();
              }else{
                Alert.alert("Error", "Error al registrar el usuario");
              }
            }
        );
      });
    }
  };

  // metodo validar datos
  const validateData = () => {
    if (nombre === "" && !nombre.trim()) {
      Alert.alert("Error", "El nombre del usuario es obligatorio");
      return false;
    }

    if (apellido === "" && !apellido.trim()) {
      Alert.alert("Error", "El apellido es obligatorio");
      return false;
    }
    if (!cedula.trim()) {
      Alert.alert("Error", "La cédula de identidad es obligatoria");
      return false;
    }
    if (cedula.length != 8) {
      Alert.alert("Error", "La cédula de identidad debe tener 8 caracteres");
      return false;
    }

    return true;
  };

  //  clear de los datos
  const clearData = () => {
    setNombre("");
    setApellido("");
    setCedula("");
  };
  // Formulario de registro de usuario
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                styles={styles.inputUser}
                placeholder="Nombre"
                onChangeText={handleNombre}
                value={nombre}
              />

              <MyInputText
                styles={styles.inputUser}
                placeholder="Apellido"
                onChangeText={handleApellido}
                value={apellido}
              />

              <MyInputText
                styles={styles.inputUser}
                placeholder="Cédula de identidad"
                keyboardType="numeric"
                onChangeText={handleCedula}
                value={cedula}
              />

              <MySingleButton
                title="Registrar Usuario"
                btnColor="green"
                onPress={añadirUsuario}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AñadirUsuario;

const styles = StyleSheet.create({
  container: {},
  inputUser: {},
  inputPassword: {},
});
