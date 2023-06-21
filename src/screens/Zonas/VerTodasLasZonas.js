import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";

const VerTodasLasZonas = () => {
  // definir un estado local, para guardar los usuarios
  const [zonas, setZonas] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar los usuarios
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM zonas`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setUsers(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay zonas!!!",
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
        <MyText textValue="Nombre de lugar" textStyle={styles.textStyle} />
        <MyText textValue={item.lugar} textStyle={styles.textStyle} />

        <MyText textValue="Departamento" textStyle={styles.textStyle} />
        <MyText textValue={item.departamento} textStyle={styles.textStyle} />

        <MyText textValue="N° trabajadores" textStyle={styles.textStyle} />
        <MyText textValue={item.trabajador} textStyle={styles.textStyle} />

        <MyText textValue="Longitud" textStyle={styles.textStyle} />
        <MyText textValue={item.longitud} textStyle={styles.textStyle} />

        <MyText textValue="Latitud" textStyle={styles.textStyle} />
        <MyText textValue={item.latitud} textStyle={styles.textStyle} />

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={zonas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerTodasLasZonas;

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
