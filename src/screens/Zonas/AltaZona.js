import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import DatabaseConnection from "../../database/db-connection";
import { useNavigation } from "@react-navigation/native";
import MapaZona from "./MapaZona";
const db = DatabaseConnection.getConnection();

const AddZona = () => {
  // estados para los campos del formulario
  const [lugar, setLugar] = useState("");
  const [departamento, setDepartamento] = useState();
  const [trabajador, setTrabajador] = useState("");
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);


  const navigation = useNavigation();

  // metodo para setear los estados
  const handleLugar = (lugar) => {
    setLugar(lugar);
  };

  const handleDepartamento = (departamento) => {
    setDepartamento(departamento);
  };

  const handleTrabajador = (trabajador) => {
    setTrabajador(trabajador);
  };

  const handleLocationsSelected = (selectedLocations) => {
    setSelectedLocations(selectedLocations);
    setLongitud(selectedLocations[0].coords.longitude)
    setLatitud(selectedLocations[0].coords.latitude)
  };
  
  
  // ...
    
  // metodo guarde el formulario
  const addZona = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar

    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO zonas (lugar, departamento, numTrabajadores, longitud, latitud) VALUES (?, ?, ?, ?, ?)",
          [lugar, departamento, trabajador, longitud, latitud],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Exito",
                "Zona registrado correctamente",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("ABMZonas"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
              clearData();
            } else {
              Alert.alert("Error", "Error al registrar la zona");
            }
          }
        );
      });
    }
  };

  // metodo validar datos
  const validateData = () => {
    if (lugar === "" && !lugar.trim()) {
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    if (departamento === "" && !departamento.trim()) {
      Alert.alert("Error", "El departamento es obligatorio");
      return false;
    }

    if (trabajador === "" && !trabajador.trim()) {
      Alert.alert("Error", "El N° de trabajadores es obligatorio");
      return false;
    }

    if (longitud === "" && !longitud.trim()) {
      Alert.alert("Error", "La longitud es obligatoria");
      return false;
    }

    if (latitud === "" && !latitud.trim()) {
      Alert.alert("Error", "La latitud es obligatoria");
      return false;
    }
    return true;
  };

  //  clear de los datos
  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setTrabajador("");
    setLongitud("");
    setLatitud("");
  };
  // Formulario de registro de usuario
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                styles={styles.inputLugar}
                placeholder="Nombre de Lugar"
                onChangeText={handleLugar}
                value={lugar}
              />
              <View style={styles.container}>
                <Picker
                  placeholder="Nombre del Departamento"
                  selectedValue={departamento}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleDepartamento(itemValue)}
                  prompt="Departamento"
                >
                  <Picker.Item label="Artigas" value="Artigas" />
                  <Picker.Item label="Canelones" value="Canelones" />
                  <Picker.Item label="Cerro Largo" value="Cerro Largo" />
                  <Picker.Item label="Colonia" value="Colonia" />
                  <Picker.Item label="Durazno" value="Durazno" />
                  <Picker.Item label="Flores" value="Flores" />
                  <Picker.Item label="Florida" value="Florida" />
                  <Picker.Item label="Lavalleja" value="Lavalleja" />
                  <Picker.Item label="Maldonado" value="Maldonado" />
                  <Picker.Item label="Montevideo" value="Montevideo" />
                  <Picker.Item label="Paysandú" value="Paysandú" />
                  <Picker.Item label="Río Negro" value="Río Negro" />
                  <Picker.Item label="Rivera" value="Rivera" />
                  <Picker.Item label="Rocha" value="Rocha" />
                  <Picker.Item label="Salto" value="Salto" />
                  <Picker.Item label="San José" value="San José" />
                  <Picker.Item label="Soriano" value="Soriano" />
                  <Picker.Item label="Tacuarembó" value="Tacuarembó" />
                  <Picker.Item label="Treinta y Tres" value="Treinta y Tres" />
                </Picker>
              </View>
              <MyInputText
                styles={styles.inputTrabajador}
                placeholder="N° trabajadores"
                onChangeText={handleTrabajador}
                value={trabajador}
                keyboardType="numeric"
              />

              <MySingleButton
                title="Seleccionar ubicación"
                btnColor="green"
                onPress={()=>navigation.navigate("MapaZona", { onLocationsSelected: handleLocationsSelected })}
              />
              <MySingleButton
                title="Registrar Zona"
                btnColor="green"
                onPress={addZona}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddZona;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 10,
  },
  inputLugar: {},
  inputDepartamento: {},
  inputTrabajador: {},
  inputLongitud: {},
  inputLatitud: {},
});
