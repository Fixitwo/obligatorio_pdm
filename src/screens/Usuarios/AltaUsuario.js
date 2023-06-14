import React, { useState } from "react";
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

const AddUser = () => {
  // estados para los campos del formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cedula, setCedula] = useState("");

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleName = (Name) => {
    setName(Name);
  };

  const handleLastName = (lastName) => {
    setLastName(lastName);
  };

  const handleCedula = (cedula) => {
    setCedula(cedula);
  };
  // metodo guarde el formulario
  const addUser = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    if (validateData()) {
      console.log("### save user ###");
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO usuarios(nombreUsuario, apellidoUsuario, ciUsuario) VALUES (?, ?, ?)",
          [name, lastName, cedula],
          (results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Exito",
                "Usuario registrado correctamente",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("ABMUsers"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
              clearData();
            } else {
              Alert.alert(
                "Error",
                "Error al ingresar usuario",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("ABMUsers"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }
          }
        );
      });
    }
  };

  // metodo validar datos
  const validateData = () => {
    if (name === "" && name.trim()) {
      Alert.alert("Error", "El nombre del usuario es obligatorio");
      return false;
    }

    if (lastName === "" && !lastName.trim()) {
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
    setName("");
    setLastName("");
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
                onChangeText={handleName}
                value={name}
              />

              <MyInputText
                styles={styles.inputUser}
                placeholder="Apellido"
                onChangeText={handleLastName}
                value={lastName}
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
                onPress={addUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {},
  inputUser: {},
  inputPassword: {},
});
