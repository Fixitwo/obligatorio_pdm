import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";

const VerTodosLosInsumos = () => {
  // definir un estado local, para guardar los insumos
  const [Insumos, setInsumos] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar los insumos
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM insumos`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setInsumos(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay insumos",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMInsumos"),
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
      <View key={item.idInsumo} style={styles.listItemView}>
        <MyText textValue="Nombre" textStyle={styles.textStyle} />
        <MyText textValue={item.nomIns} textStyle={styles.textStyle} />

        <MyText textValue="Cantidad en litros" textStyle={styles.textStyle} />
        <MyText textValue={item.cantidad} textStyle={styles.textStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={Insumos}
            keyExtractor={(item) => item.idInsumo.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerTodosLosInsumos;

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
