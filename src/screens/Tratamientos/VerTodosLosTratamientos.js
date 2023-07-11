import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";

const VerTodosLosTratamientos = () => {
  // definir un estado local, para guardar los tratamientos
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar los tratamientos
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tratamientos`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setUsers(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay tratamientos",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMTratamientos"),
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
      <View key={item.idTratamiento} style={styles.listItemView}>
        <MyText textValue="Nombre" textStyle={styles.textStyle} />
        <MyText textValue={item.nomTratamiento} textStyle={styles.textStyle} />

        <MyText textValue="Id de zona" textStyle={styles.textStyle} />
        <MyText textValue={item.zonaTratamiento} textStyle={styles.textStyle} />

        <MyText textValue="Fecha de inicio" textStyle={styles.textStyle} />
        <MyText textValue={item.fechaInicio} textStyle={styles.textStyle} />

        <MyText textValue="Fecha de fin" textStyle={styles.textStyle} />
        <MyText textValue={item.fechaFin} textStyle={styles.textStyle} />

        <MyText textValue="Tiempo" textStyle={styles.textStyle} />
        <MyText textValue={item.tiempo + " horas"} textStyle={styles.textStyle} />

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={users}
            keyExtractor={(item) => item.idTratamiento.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerTodosLosTratamientos;

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
