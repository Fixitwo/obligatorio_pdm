import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const BajaTratamiento = () => {
  const [idTratamiento, setIdTratamiento] = useState("");
  const navigation = useNavigation();

  const bajaTratamiento = () => {
    if(!idTratamiento && !idTratamiento.length && idTratamiento === ""){
      Alert.alert("Error", "Debe ingresar una identificador");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tratamientos WHERE idTratamiento = ?',
        [idTratamiento],
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

  const handleIdTratamiento = (idTratamiento) => {
    setIdTratamiento(idTratamiento);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Tratamiento" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Id de tratamiento"
                onChangeText={handleIdTratamiento}
                value={idTratamiento}
                styles={styles.inputStyle}
                keyboardType='numeric'
              />
              <MySingleButton
                title="Borrar"
                onPress={bajaTratamiento}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BajaTratamiento

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