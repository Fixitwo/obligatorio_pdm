import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyText from '../../components/MyText';
import MyInputText from '../../components/MyInputText';
import MySingleButton from '../../components/MySingleButton';

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteZone = () => {
  const [site, setSite] = useState("");
  const navigation = useNavigation();

  const deleteZone = () => {
    if(!site && !site.length && site === ""){
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE site = site = ?',
        [site],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "Lugar borrado correctamente", [
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
            Alert.alert("Error", "El lugsr no existe", [
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

  const handleSite = (site) => {
    setSite(site);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Busqueda de Lugar" textStyle={styles.textStyle}/>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Lugar"
                onChangeText={handleSite}
                value={site}
                styles={styles.inputStyle}
              />
              <MySingleButton
                title="Borrar"
                onPress={deleteZone}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteZone

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