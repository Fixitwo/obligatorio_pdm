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

import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import DatabaseConnection from "../database/db-connection";
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();

const AddUser = () => {
    // estados para los campos del formulario
    const [userName, setUserName]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    // metodo para setear los estados
    const handleUserName = (userName) => {
      setUserName(userName);
    }
    const handlePassword = (password) => {
        setPassword(password);
    }
    
    const handleEmail = (email) => {
        setEmail(email);
    }

    // metodo guarde el formulario
  const addUser = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    console.log("### add user ###");

    if(validateData()){
      console.log("### save user ###");
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (userName, password, email) VALUES (?, ?, ?)',
          [userName, password, email],
          (tx, results) => {
            if(results.rowsAffected > 0){
              Alert.alert("Exito", "Usuario registrado correctamente", [
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
              Alert.alert("Error", "Error al registrar el usuario");
            }
          }
        )
      });
    }
    // metodo validar datos
  const validateData = () => {
    if(userName === "" && !userName.trim()){
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    if(password === "" && !password.trim()){
      Alert.alert("Error", "La contraseña es obligatoria");
      return false;
    }

    if(!email.trim()){
      Alert.alert("Error", "El correo electronico es obligatorio");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "El correo electronico no es valido");
      return false;
    }
    
    return true;
  }

   //  clear de los datos
   const clearData = () => {
    setUserName("");
    setPassword("");
    setEmail("");
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
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                value={userName}
                />

              <MyInputText
                styles={styles.inputPassword}
                placeholder="Contraseña"
                minLength={8}
                maxLength={16}
                secureTextEntry={true}
                onChangeText={handlePassword}
                value={password}
              />

              <MyInputText
                styles={styles.inputEmail}
                placeholder="Coreo electronico"
                keyboardType="email-address"
                onChangeText={handleEmail}
                value={email}
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
};
export default AddUser;

const styles = StyleSheet.create({
  container: {},
  inputUser:{},
  inputPassword:{}
});



