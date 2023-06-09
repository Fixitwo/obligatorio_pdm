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

const ViewSite = () => {
  const [Site, setSite] = useState("");
  const [site, setsite] = useState(null);
  const navigation = useNavigation();

  console.log("### user ###", site)

  const handleSite = (site) => {
    setSite(site);
  };

  const getSite = () => {
    if(!Site && !Site.length && Site === ""){
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    console.log("### Sitio ###", Site);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sites WHERE Site=?",
        [Site],
        (tx, results) => {
          console.log("Results", results.rows);
          if(results.rows.length > 0){
            console.log('seteo lugar')
            setUser(results.rows._array[0]);
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
              <MyText text="Filtrar lugar" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de lugar"
                onChangeText={handleSite}
                style={styles.input}
                value={site}
              />
              <MySingleButton title="Buscar" onPress={getSite} />

              <View style={styles.presenterView}>
                {site ? (
                  <>
                    <MyText textValue="id" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={site.id.toString()} textStyle={styles.presenterText}/>
                    <MyText textValue="Nombre de lugar" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={site.Site} textStyle={styles.presenterText}/>
                    <MyText textValue="Departamento" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={site.departament} textStyle={styles.presenterText}/>
                  </>
                ) : (
                  <Text style={styles.presenterText}>No hay usuario</Text>
                )}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewSite;

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