import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";

const ViewAllUsers = () => {
  // definir un estado local, para guardar los usuarios
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar los usuarios
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM users`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setUsers(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeScreen"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Nombre de Usuario" textStyle={styles.textStyle} />
        <MyText textValue={item.userName} textStyle={styles.textStyle} />

        <MyText textValue="Email" textStyle={styles.textStyle} />
        <MyText textValue={item.email} textStyle={styles.textStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});
