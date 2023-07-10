import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const ABMObservaciones = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='observaciones'", [],
        (_, results) => {
          if(results.rows.length == 0){
          } else {
            console.log("Table already exists");
            // TODO:descomentar si quiero volver a borrar y recrear la tabla
            dropDb(txn);
            createDb(txn);
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
                title="Alta Observacion"
                btnColor="green"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("AltaObservacion")}
              />

              <MyButton
                title="Modificar Observacion"
                btnColor="orange"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("ModificarOservacion")}
              />

              <MyButton
                title="Baja Observacion"
                btnColor="red"
                btnIcon="user-times"
                onPress={() => navigation.navigate("BajaObservacion")}
              />

              <MyButton
                title="Ver Observacion"
                btnColor="blue"
                btnIcon="user-circle-o"
                onPress={() => navigation.navigate("VerObservacion")}
              />

              <MyButton
                title="Ver todas las observaciones"
                btnColor="purple"
                btnIcon="users"
                onPress={() => navigation.navigate("VerTodasLasObservaciones")}
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

export default ABMObservaciones;
