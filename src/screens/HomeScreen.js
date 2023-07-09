import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
   
  const dropDbUsuario = async(tx) => {
    try{
    console.log("Elimino usuario");
    tx.executeSql('DROP TABLE IF EXISTS usuarios', []);
    }
    catch(e){
      console.log("No se ah podido eliminar el usuario");
    }
  };

  const dropDbZona = async(tx) => {
    try{
    console.log("Elimino zona");
    tx.executeSql('DROP TABLE IF EXISTS zonas', []);
    }
    catch(e){
      console.log("No se ah podido eliminar la zona",e)
    }
  };

  const dropDbInsumo = async(tx) => {
    try{
    console.log("Elimino Insumo");
    tx.executeSql('DROP TABLE IF EXISTS insumos', []);
    }
    catch(e){
      console.log("No se ah podido eliminar el insumo",e);
    }
  };

 
  const createDbUsuario = async(tx) => {
    try{
    console.log("Creo usuario");
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS usuarios (idUsuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), apellido VARCHAR(50), cedula INTEGER)', [],
      
    );
    }
    catch (e){
        console.log("Error al crear la tabla usuarios", e)
    }
  };

  const createDbZona=async(tx)=>{
    try{
      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS zonas (idZona INTEGER PRIMARY KEY AUTOINCREMENT, nombreLugar VARCHAR(50),tipoLugar VARCHAR(10), departamento VARCHAR(30), numTrabajadores INTEGER, longitud FLOAT, latitud FLOAT)', [],
      );
    }
    catch (e) {
      console.log("error a crear tabla zonas", e)
    }
    
  }

  const createDbInsumo =async (tx) => {
    try{
    console.log("Creo insumo");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS insumos (idInsumo INTEGER PRIMARY KEY AUTOINCREMENT, nomIns VARCHAR(50), cantidad INTEGER)", [],
      
    );
    }
    catch (e){
        console.log("Eror al crear la tabla insumo", e);
    }
  };
  
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'", [],
        (_, results) => {
          if (results.rows.length === 0) {
            dropDbUsuario(txn);
            createDbUsuario(txn);
            console.log("Creo usuario");
          } else {
            console.log("Table already exists");
            // TODO: Descomentar si quieres volver a borrar y recrear la tabla
            dropDbUsuario(txn);
            createDbUsuario(txn);
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='zonas'", [],
        (_, results) => {
          if (results.rows.length === 0) {
            dropDbZona(txn);
            createDbZona(txn);
            console.log("Creo zona");
          } else {
            console.log("Table already exists");
            // TODO: Descomentar si quieres volver a borrar y recrear la tabla
            dropDbZona(txn);
            createDbZona(txn);
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='insumos'", [],
        (_, results) => {
          if (results.rows.length === 0) {
            dropDbInsumo(txn);
            createDbInsumo(txn);
            console.log("Creo Insumo");
          } else {
            console.log("Table already exists");
            // TODO: Descomentar si quieres volver a borrar y recrear la tabla
            dropDbZona(txn);
            createDbZona(txn);
          }
        },
      );
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
              onPress={() => navigation.navigate("ABMUsuarios")}
            />

            <MyButton
              title="ABM Zonas"
              btnColor="orange"
              btnIcon="user-circle"
              onPress={() => navigation.navigate("ABMZonas")}
            />

            <MyButton
              title="ABM Insumos"
              btnColor="orange"
              btnIcon="user-circle"
              onPress={() => navigation.navigate("ABMInsumos")}
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