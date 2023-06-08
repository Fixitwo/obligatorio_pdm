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
  const [userNameSearch, setUserNameSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  // metodo para setear los estados
  const handleUserNameSearch = (username) => {
    console.log("### handleUserNameSearch ###", username);
    setUserNameSearch(username);
  };

  const handleUserName = (userName) => {
    setUserName(userName);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleEmail = (email) => {
    setEmail(email);
  };
  // metodo validar datos
  const validateData = () => {
    if (!userName && !userName.length && userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    if (!password && !password.length && password === "" && !password.trim()) {
      Alert.alert("Error", "La contraseña es obligatoria");
      return false;
    }

    if (!email && !email.length && !email.trim()) {
      Alert.alert("Error", "El correo electronico es obligatorio");
      return false;
    }

    if (!email && !email.length && !email.includes("@")) {
      Alert.alert("Error", "El correo electronico no es valido");
      return false;
    }

    return true;
  };

  const clearUsernameSearch = () => {
    setUserNameSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setUserName("");
    setPassword("");
    setEmail("");
  };

  const editUser = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE users set userName=?, password=?, email=? WHERE userName=?",
          [userName, password, email, userNameSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Usuario actualizado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
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
    if(!userNameSearch.trim() && userNameSearch === ""){
      Alert.alert("Error", "El nombre de usuario es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE userName = ?",
        [userNameSearch],
        (_, results) => {
          if(results.rows.length > 0) {
            const user = results.rows.item(0);
            setUserName(user.userName);
            setPassword(user.password);
            setEmail(user.email);
          }else {
            Alert.alert("Error", "Usuario no encontrado");
            clearUsernameSearch();
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
                placeholder="Ingrese el nombre de usuario"
                onChangeText={handleUserNameSearch}
                styles={styles.input}
                value={userNameSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchUser} 
                btnColor='green'
              />

            <MyInputText 
              placeholder="Nombre de usuario"
              value={userName}
              onChangeText={handleUserName}
              />

            <MyInputText 
              placeholder="Contraseña"
              value={password}
              onChangeText={handlePassword}
            />

            <MyInputText 
              placeholder="Correo electronico"
              value={email}
              onChangeText={handleEmail}
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
