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

const ViewZona = () => {
  const [lugar, setLugar] = useState("");
  const [zona, setZona] = useState(null);
  const navigation = useNavigation();

  console.log("### zona ###", zona)

  const handleLugar = (Lugar) => {
    setLugar(Lugar);
  };

  const getZona = () => {
    if(!lugar && !lugar.length && lugar === ""){
      Alert.alert("Error", "El nombre del lugar es obligatorio");
      return false;
    }

    console.log("### Lugar ###", lugar);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zonas WHERE lugar=?",
        [lugar],
        (tx, results) => {
          console.log("Results", results.rows);
          if(results.rows.length > 0){
            console.log('seteo zona')
            setZona(results.rows._array[0]);
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyText text="Filtrar zona" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de lugar"
                onChangeText={handleLugar}
                style={styles.input}
                value={lugar}
              />
              <MySingleButton title="Buscar" onPress={getZona} />

              <View style={styles.presenterView}>
                {zona ? (
                  <>
                    <MyText textValue="id" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={zona.id.toString()} textStyle={styles.presenterText}/>
                    <MyText textValue="Nombre del lugar" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={zona.lugar} textStyle={styles.presenterText}/>
                    <MyText textValue="Departamento" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={zona.departamento} textStyle={styles.presenterText}/>
                    <MyText textValue="Trabajador" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={zona.trabajador} textStyle={styles.presenterText}/>
                    <MyText textValue="Longitud" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={zona.longitud} textStyle={styles.presenterText}/>
                    <MyText textValue="Latitud" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={zona.latitud} textStyle={styles.presenterText}/>
                  </>
                ) : (
                  <Text style={styles.presenterText}>No hay zonas</Text>
                )}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewZona;

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
    justifyContent: "center",
    alignItems: "center",
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