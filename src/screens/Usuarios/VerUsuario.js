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
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  console.log("### user ###", user)

  const handleUserName = (username) => {
    setUserName(username);
  };

  const getUser = () => {
    if(!userName && !userName.length && userName === ""){
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    console.log("### userName ###", userName);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE userName=?",
        [userName],
        (tx, results) => {
          console.log("Results", results.rows);
          if(results.rows.length > 0){
            console.log('seteo usuario')
            setUser(results.rows._array[0]);
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyText text="Filtrar usuario" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                style={styles.input}
                value={userName}
              />
              <MySingleButton title="Buscar" onPress={getUser} />

              <View style={styles.presenterView}>
                {user ? (
                  <>
                    <MyText textValue="id" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.id.toString()} textStyle={styles.presenterText}/>
                    <MyText textValue="Nombre de usuario" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.userName} textStyle={styles.presenterText}/>
                    <MyText textValue="Email" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.email} textStyle={styles.presenterText}/>
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
