import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
  const [ciTratamiento, setCiTratamiento] = useState("");
  const navigation = useNavigation();

  const deleteUser = () => {
    if(!ciTratamiento && !ciTratamiento.length && ciTratamiento === ""){
      Alert.alert("Error", "Debe ingresar una cédula de identidad");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tratamientos WHERE cedula = ?',
        [ciTratamiento],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "Tratamiento borrado correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMTratamientos"),
              }
            ],
            {
              cancelable: false
            }
            );
          } else {
            Alert.alert("Error", "El tratamiento no existe", [
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

  const handleCiTratamiento = (ciTratamiento) => {
    setCiTratamiento(ciTratamiento);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Tratamiento" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Cédula de identidad"
                onChangeText={handleCiTratamiento}
                value={ciTratamiento}
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