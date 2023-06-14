import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
  const [ciUsuario, setCiUsuario] = useState("");
  const navigation = useNavigation();

  const deleteUser = () => {
    if(!ciUsuario && !ciUsuario.length && ciUsuario === ""){
      Alert.alert("Error", "Debe ingresar una cédula de identidad");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM usuarios WHERE ciUsuario = ?',
        [ciUsuario],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "Usuario borrado correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMUsers"),
              }
            ],
            {
              cancelable: false
            }
            );
          } else {
            Alert.alert("Error", "El usuario no existe", [
              {
                text: "Ok",
              }
            ],
            {
              cancelable: false
            }
            )
          }
        }
      );
    });

  }

  const handleCiUsuario = (ciUsuario) => {
    setCiUsuario(ciUsuario);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Usuario" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Cédula de identidad"
                onChangeText={handleCiUsuario}
                value={ciUsuario}
                styles={styles.inputStyle}
                keyboardType='numeric'
              />
              <MySingleButton
                title="Borrar"
                onPress={deleteUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  generalView: {
    flex: 1,
  },
  inputStyle: {
    padding: 10,
  },
  textStyle: {
    padding: 10,
    marginLeft: 25,
    color: 'black',
  },
})