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
  const [nomInsSearch, setNomInsSearch] = useState("");
  const [nomIns, setNomIns] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();

  // metodo para setear los estados
  const handleNomInsSearch = (nomIns) => {
    console.log("### handleNomInsSearch ###", nomIns);
    setNomInsSearch(nomIns);
  };

  const handleNomIns = (nomIns) => {
    setNomIns(nomIns);
  };

  const handleCantidad = (cantidad) => {
    setCantidad(cantidad);
  };

  // metodo validar datos
  const validateData = () => {
    if (!nomIns && !nomIns.length && nomIns === "" && !lugar.trim()) {
      Alert.alert("Error", "El nombre del insumo es obligatorio");
      return false;
    }

    if (!cantidad && !cantidad.length && cantidad === "" && !cantidad.trim()) {
      Alert.alert("Error", "La cantidad es obligatoria");
      return false;
    }

  };

  const clearInsumoSearch = () => {
    setNomInsSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setNomIns("");
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
                  text: "Ok",
                  onPress: () => navigation.navigate("ABMInsumo"),
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

  const searchNomIns = () => {
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
            setNomIns(insumo.nomIns);
            setCantidad(insumo.cantidad);
          }else {
            Alert.alert("Error", "Insumo no encontrado");
            clearInsumoSearch();
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
              <MyText textValue="Buscar Insumo" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese el nombre del insumo"
                onChangeText={handleNomInsSearch}
                styles={styles.input}
                value={nomInsSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchNomIns} 
                btnColor='green'
              />

            <MyInputText 
              placeholder="Nombre del insumo"
              value={nomIns}
              onChangeText={handleNomIns}
              />

            <MyInputText 
              placeholder="Cantidad"
              value={catidad}
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
