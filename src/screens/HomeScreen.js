import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {

  const dropDb = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS usuarios', []);
    tx.executeSql('DROP TABLE IF EXISTS zonas', []);
  }

  const createDb = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombreUsuario VARCHAR(60), apellidoUsuario VARCHAR(60), ciUsuario NUMERIC(8))',
      'CREATE TABLE IF NOT EXISTS zonas (id INTEGER PRIMARY KEY AUTOINCREMENT, lugar VARCHAR(60), departamento VARCHAR(20), trabajador INTEGER, longitud INTEGER, latitud INTEGER)',
      []
    );
  }

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'", [],
        "SELECT name FROM sqlite_master WHERE type='table' AND name='zonas'", [],
        (_, results) => {
          if(results.rows.length == 0){
            dropDb(txn);
            createDb(txn);
          } else {
            console.log("Table already exists");
            // TODO:descomentar si quiero volver a borrar y recrear la tabla
            //dropDb(txn);
            //createDb(txn);
          }
        }
      )
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalContainer}>
          <ScrollView>
            <View>
              <MyButton
                title="ABM Usuarios"
                btnColor="green"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("ABMUsers")}
              />

              <MyButton
                title="ABM Zonas"
                btnColor="orange"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("ABMZonas")}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer: {
    flex:1,
    backgroundColor: '#312D2D',
  },
  generalContainer: {
    flex: 1,
    justifyContent: "center",
  },

  // lista en 2 columnas
  viewContainer2: {
    flexDirection: "column",
  },
  viewContainerFirstColumn: {
    flexDirection: "row",
    height: 100,
  },
  viewContainerSecondColumn: {
    flexDirection: "row",
    height: 100,
  },
});

export default HomeScreen;
