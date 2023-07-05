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

const ViewInsumo = () => {
  const [nomIns, setNomIns] = useState("");
  const [ins, setIns] = useState(null);
  const navigation = useNavigation();

  console.log("### ins ###", ins)

  const handleNomIns = (nomIns) => {
    setNomIns(nomIns);
  };

  const getIns = () => {
    if(!nomIns && !nomIns.length && nomIns === ""){
      Alert.alert("Error", "Debe ingresar un nombre de un insumo");
      return false;
    }

    console.log("### nomIns ###", nomIns);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos WHERE nomIns=?",
        [nomIns],
        (tx, results) => {
          console.log("Results", results.rows);
          if(results.rows.length > 0){
            console.log('seteo insumo')
            setIns(results.rows._array[0]);
          } else {
            Alert.alert("Error", "El insumo no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMInsumos"),
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
              <MyText text="Filtrar insumo" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de Insumo"
                onChangeText={handleNomIns}
                style={styles.input}
                value={nomIns}

              />
              <MySingleButton title="Buscar" onPress={getIns} />

              <View style={styles.presenterView}>
                {ins ? (
                  <>
                    <MyText textValue="Nombre" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={ins.nomIns } textStyle={styles.presenterText}/>
                    <MyText textValue="Cantidad" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={ins.cantidad} textStyle={styles.presenterText}/>
                  </>
                ) : (
                  <Text style={styles.presenterText}>No hay insumo</Text>
                )}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewInsumo;

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
