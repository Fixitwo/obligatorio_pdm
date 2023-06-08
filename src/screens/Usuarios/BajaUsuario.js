import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  const deleteUser = () => {
    if(!userName && !userName.length && userName === ""){
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE userName = ?',
        [userName],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "Usuario borrado correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeScreen"),
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
                onPress: () => navigation.navigate("HomeScreen"),
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

  const handleUserName = (username) => {
    setUserName(username);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Usuario" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                value={userName}
                styles={styles.inputStyle}
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