import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteObservacion = () => {
  const [id, setId] = useState("");
  const navigation = useNavigation();

  const deleteObservacion = () => {
    if(!id && !lugar.length && id === ""){
      Alert.alert("Error", "El id de la observacion es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM observaciones WHERE idObservacion = ?',
        [id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "La observacion fue eliminada correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMObservaciones"),
              }
            ],
            {
              cancelable: false
            }
            );
          } else {
            Alert.alert("Error", "La observacion no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMObservaciones"),
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

  const handleId= (id) => {
    setId(id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Obligatorio" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Id observacion"
                onChangeText={handleId}
                value={id}
                styles={styles.inputStyle}
              />
              <MySingleButton
                title="Borrar"
                onPress={deleteObservacion}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteObservacion

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