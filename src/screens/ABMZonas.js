import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const ABMZonas = ({ navigation }) => {

  const dropDb = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS Zonas', []);
  }

  const createDb = (tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Zonas (idZona INTEGER PRIMARY KEY AUTOINCREMENT, lugar VARCHAR(11) check(lugar in ('Estancia', 'Quinta', 'Plantación')), departamento VARCHAR(30) check(departamento in ('Colonia', 'San José', 'Soriano', 'Canelones', 'Montevideo', 'Río Negro','Payandú','Salto','Artigas','Rivera','Tacuarembó','Durazno','Flores','Florida','Cerro Largo','Lavalleja','Maldonado','Rocha','Treinta y Tres')), numTrabajadores integer",
      []
    );
  }

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Zonas'", [],
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
                title="Alta de Zona"
                btnColor="green"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("AltaZona")}
              />

              <MyButton
                title="Modificar Zona"
                btnColor="orange"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("ModificarZona")}
              />

              <MyButton
                title="Baja de Zona"
                btnColor="red"
                btnIcon="user-times"
                onPress={() => navigation.navigate("BajaZona")}
              />

              <MyButton
                title="Ver Zona"
                btnColor="blue"
                btnIcon="user-circle-o"
                onPress={() => navigation.navigate("VerZona")}
              />

              <MyButton
                title="Ver todas las Zonas"
                btnColor="purple"
                btnIcon="users"
                onPress={() => navigation.navigate("VerTodasLasZonas")}
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

export default ABMZonas;
