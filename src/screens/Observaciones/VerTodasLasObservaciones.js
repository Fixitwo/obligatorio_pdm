import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Image } from "react-native";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";
import ImagenPicker from "../../components/SelectorImagen";

const VerTodasLasObservaciones = () => {
  // definir un estado local, para guardar los usuarios
  const [observaciones, setObservaciones] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar los usuarios
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM observaciones`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setObservaciones(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Observaciones!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ABMObservaciones"),
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
        <MyText textValue="id Observacion" textStyle={styles.textStyle} />
        <MyText textValue={item.idObservacion} textStyle={styles.textStyle} />
        <MyText textValue="Titulo de la Observacion" textStyle={styles.textStyle} />
        <MyText textValue={item.titulo} textStyle={styles.textStyle} />
        <MyText textValue="Imagen de la Observacion" textStyle={styles.textStyle} />
          {item.imagen !== null && <Image source={{uri: item.imagen}} style= {{width: 100,height:100, margin:10}}/>}

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
            data={observaciones}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerTodasLasObservaciones;

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
