import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteZona = () => {
  const [lugar, setLugar] = useState("");
  const navigation = useNavigation();

  const DeleteZona = () => {
    if(!lugar && !lugar.length && lugar === ""){
      Alert.alert("Error", "El nombre de lugar es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE lugar = ?',
        [lugar],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "El lugar fue borrado correctamente", [
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
            Alert.alert("Error", "El lugar no existe", [
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

  const handleLugar = (lugar) => {
    setLugar(lugar);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Zona" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Nombre de lugar"
                onChangeText={handleLugar}
                value={lugar}
                styles={styles.inputStyle}
              />
              <MySingleButton
                title="Borrar"
                onPress={DeleteZona}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteZona

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