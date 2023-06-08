import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const ABMUsuarios = ({ navigation }) => {

  const dropDb = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS usuarios', []);
  }

  const createDb = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS usuarios (idUsuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreUsuario VARCHAR(60), apellidoUsuario VARCHAR(60), ciUsuario numeric(8))',
      []
    );
  }

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'", [],
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
                title="Alta de Usuario"
                btnColor="green"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("AltaUsuario")}
              />

              <MyButton
                title="Modificar Usuario"
                btnColor="orange"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("ModificarUsuario")}
              />

              <MyButton
                title="Baja de Usuario"
                btnColor="red"
                btnIcon="user-times"
                onPress={() => navigation.navigate("BajaUsuario")}
              />

              <MyButton
                title="Ver Usuario"
                btnColor="blue"
                btnIcon="user-circle-o"
                onPress={() => navigation.navigate("VerUsuario")}
              />

              <MyButton
                title="Ver todos los Usuarios"
                btnColor="purple"
                btnIcon="users"
                onPress={() => navigation.navigate("VerTodosLosUsuarios")}
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

export default ABMUsuarios;
