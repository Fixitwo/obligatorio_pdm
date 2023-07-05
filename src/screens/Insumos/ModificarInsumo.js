import React, {useState} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../database/db-connection";

const db = DatabaseConnection.getConnection();

const EditInsumo = () => {
  // estados
  const [nomInsSearch, setnomInsSearch] = useState("");
  const [nomIns, setnomIns] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();

  // metodo para setear los estados
  const handlenomInsSearch = (nomInsSearch) => {
    console.log("### handlenomInsSearch ###", nomInsSearch);
    setnomInsSearch(nomInsSearch);
  };

  const handleCantidad = (cantidad) => {
    setCantidad(cantidad);
  };

  const handlenomIns = (nomIns) => {
    setnomIns(nomIns);
  };
  // metodo validar datos
  const validateData = () => {
    if (!nomIns && !nomIns.length && !nomIns.trim()) {
      Alert.alert("Error", "El nombre del insumo es obligatorio");
      return false;
    }
    if (!cantidad && !cantidad.length && !cantidad.trim()) {
      Alert.alert("Error", "La cantidad es obligatoria");
      return false;
    }
    return true;
  };

  const clearnomInsSearch = () => {
    setnomInsSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setnomIns("");
    setnomInsSearch("");
    setCantidad("");
  };

  const editInsumo = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE insumos set nomIns=?, cantidad=? WHERE nomIns=?",
          [nomIns, cantidad, nomInsSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Insumo actualizado correctamente", [
                {
                  onPress: () => navigation.navigate("ABMInsumos"),
                },
                {
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar el insumo");
            }
          }
        )
      })
    }
  };

  const searchInsumo = () => {
    if(!nomInsSearch.trim() && nomInsSearch === ""){
      Alert.alert("Error", "El nombre del insumo es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos WHERE nomIns = ?",
        [nomInsSearch],
        (_, results) => {
          if(results.rows.length > 0) {
            const insumo = results.rows.item(0);
            setCantidad(insumo.cantidad);
            setnomIns(insumo.nomIns)
          }else {
            Alert.alert("Error", "Usuario no encontrado");
            clearnomInsSearch();
          }
        }
      )
    });

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText textValue="Buscar insumo" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese el nombre del insumo"
                onChangeText={handlenomInsSearch}
                styles={styles.input}
                value={nomInsSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchInsumo} 
                btnColor='green'
              />

            <MyInputText 
              placeholder="Nombre"
              value={nomIns}
              onChangeText={handlenomIns}
              />

            <MyInputText 
              placeholder="Cantidad"
              keyboardType="numeric"
              value={cantidad.toString()}
              onChangeText={handleCantidad}
            />

            <MySingleButton 
              title="Editar" onPress={() => editInsumo()} 
              btnColor='orange'
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditInsumo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  }, 
  textStyle: {
    padding: 10,
    marginLeft: 20,
    color: "black",
  },
  input: {
    padding: 15
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  }
});
