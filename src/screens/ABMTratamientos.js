import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const ABMTratamientos = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientos'", [],
        (_, results) => {
          if(results.rows.length == 0){
          } else {
            console.log("Table already exists");
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
                title="Alta Tratamiento"
                btnColor="green"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("AltaTratamiento", {})}
              />
              <MyButton
                title="Baja Tratamiento"
                btnColor="red"
                btnIcon="user-times"
                onPress={() => navigation.navigate("BajaTratamiento")}
              />

              <MyButton
                title="Ver todos los Tratamientos"
                btnColor="purple"
                btnIcon="users"
                onPress={() => navigation.navigate("VerTodosLosTratamientos")}
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

export default ABMTratamientos;
