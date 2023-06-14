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

const EditUser = () => {
  // estados
  const [ciSearch, setCiSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ci, setCi] = useState("");
  const navigation = useNavigation();

  // metodo para setear los estados
  const handleCiSearch = (ciSearch) => {
    console.log("### handleCISearch ###", ciSearch);
    setCiSearch(ciSearch);
  };

  const handleNombre = (nombre) => {
    setNombre(nombre);
  };

  const handleApellido = (apellido) => {
    setApellido(apellido);
  };

  const handleCi = (ci) => {
    setCi(ci);
  };
  // metodo validar datos
  const validateData = () => {
    if (!nombre && !nombre.length && nombre === "" && !nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return false;
    }

    if (!apellido && !apellido.length && apellido === "" && !apellido.trim()) {
      Alert.alert("Error", "El apellido es obligatorio");
      return false;
    }

    if (!ci && !ci.length && !ci.trim()) {
      Alert.alert("Error", "La cédula de identidad es obligatoria");
      return false;
    }
    if (ci.length != 8) {
      Alert.alert("Error", "La cédula de identidad debe tener 8 caracteres");
      return false;
    }

    return true;
  };

  const clearCiSearch = () => {
    setCiSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setNombre("");
    setApellido("");
    setCi("");
  };

  const editUser = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE usuarios set nombreUsuario=?, ApellidoUsuario=?, ciUsuario=? WHERE ciUsuario=?",
          [nombre, apellido, ci, ciSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Usuario actualizado correctamente", [
                {
                  onPress: () => navigation.navigate("ABMUsers"),
                },
                {
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar el usuario");
            }
          }
        )
      })
    }
  };

  const searchUser = () => {
    if(!ciSearch.trim() && ciSearch === ""){
      Alert.alert("Error", "La cédula de identidad es requerida");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM usuarios WHERE ciUsuario = ?",
        [ciSearch],
        (_, results) => {
          if(results.rows.length > 0) {
            const user = results.rows.item(0);
            setNombre(user.nombreUsuario);
            setApellido(user.apellidoUsuario);
            setCi(user.ciUsuario);
          }else {
            Alert.alert("Error", "Usuario no encontrado");
            clearCiSearch();
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
              <MyText textValue="Buscar usuario" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese la cédula de identitad"
                onChangeText={handleCiSearch}
                styles={styles.input}
                keyboardType="numeric"
                value={ciSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchUser} 
                btnColor='green'
              />

            <MyInputText 
              placeholder="Nombre"
              value={nombre}
              onChangeText={handleNombre}
              />

            <MyInputText 
              placeholder="Apellido"
              value={apellido}
              onChangeText={handleApellido}
            />

            <MyInputText 
              placeholder="Cédula de identidad"
              value={ci.toString()}
              onChangeText={handleCi}
            />

            <MySingleButton 
              title="Editar" onPress={() => editUser()} 
              btnColor='orange'
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditUser;

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
