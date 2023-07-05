import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const ABMInsumos = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='insumos'", [],
        (_, results) => {
          if(results.rows.length == 0){
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
                title="Alta de Insumo"
                btnColor="green"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("AltaInsumo")}
              />

              <MyButton
                title="Modificar Insumo"
                btnColor="orange"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("ModificarInsumo")}
              />

              <MyButton
                title="Baja de Insumo"
                btnColor="red"
                btnIcon="user-times"
                onPress={() => navigation.navigate("BajaInsumo")}
              />

              <MyButton
                title="Ver Insumo"
                btnColor="blue"
                btnIcon="user-circle-o"
                onPress={() => navigation.navigate("VerInsumo")}
              />

              <MyButton
                title="Ver todos los Insumos"
                btnColor="purple"
                btnIcon="users"
                onPress={() => navigation.navigate("VerTodosLosInsumos")}
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

export default ABMInsumos;
