import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";

import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  const [ciTratamiento, setCiTratamiento] = useState("");
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  console.log("### user ###", user)

  const handleCiTratamiento = (ciTratamiento) => {
    setCiTratamiento(ciTratamiento);
  };

  const getUser = () => {
    if(!ciTratamiento && !ciTratamiento.length && ciTratamiento === ""){
      Alert.alert("Error", "Debe ingresar una cédula de identidad");
      return false;
    }

    console.log("### ciTratamiento ###", ciTratamiento);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tratamientos WHERE cedula=?",
        [ciTratamiento],
        (tx, results) => {
          console.log("Results", results.rows);
          if(results.rows.length > 0){
            console.log('seteo tratamiento')
            setUser(results.rows._array[0]);
          } else {
            Alert.alert("Error", "El tratamiento no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMTratamientos"),
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyText text="Filtrar tratamiento" style={styles.text}/>
              <MyInputText
                placeholder="Cédula de identidad"
                onChangeText={handleCiTratamiento}
                style={styles.input}
                value={ciTratamiento}
                keyboardType="numeric"
              />
              <MySingleButton title="Buscar" onPress={getUser} />

              <View style={styles.presenterView}>
                {user ? (
                  <>
                    <MyText textValue="Nombre" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.nombre + " " + user.apellido} textStyle={styles.presenterText}/>
                    <MyText textValue="Cédula de identidad" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.cedula} textStyle={styles.presenterText}/>
                  </>
                ) : (
                  <Text style={styles.presenterText}>No hay tratamiento</Text>
                )}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text:{
    padding: 10,
    marginLeft: 20,
    color: 'black'
  },
  input:{
    padding: 10,
    margin: 10,
    color: 'black'
  },
  presenterView: {
    flex: 1,

    marginTop: 20,
    alignContent: "center",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  presenterText: {
    fontSize: 18,
    color: "black",
  },
  presenterTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  }
});
