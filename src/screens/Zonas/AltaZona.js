import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import DatabaseConnection from "../../database/db-connection";
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();


//AddZona recibe como parametro un objeto que contiene la latitud y la longitud de la pagina MapaZona
const AddZona = (UbicacionMapa) => {
  // estados para los campos del formulario
  const rut = UbicacionMapa.route.params;
  const [nombreLugar, setNombreLugar] = useState("");
  const [tipoLugar, setTipoLugar] = useState("");
  const [departamento, setDepartamento] = useState();
  const [trabajador, setTrabajador] = useState("");

  const [latitud, setLatitud] = useState(rut?.lat);
  const [longitud, setLongitud] = useState(rut?.long);

  //cada vez que se agrega un dato a UbicacionMapa se asignan esos datos a los useState latitud y longitud
  useEffect(()=>{
    setLatitud(rut?.lat);
    setLongitud(rut?.long)
  },[UbicacionMapa])

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleNombreLugar = (nombreLugar) => {
    setNombreLugar(nombreLugar);
  };
  const handleTipoLugar = (tipoLugar) => {
    setTipoLugar(tipoLugar);
  };

  const handleDepartamento = (departamento) => {
    setDepartamento(departamento);
  };

  const handleTrabajador = (trabajador) => {
    setTrabajador(trabajador);
  };

  // metodo guarde el formulario
  const addZona = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar

    if (validateData()) {
      console.log(longitud);
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO zonas (nombreLugar,tipoLugar, departamento, numTrabajadores, longitud, latitud) VALUES (?, ?, ?, ?, ?, ?)",
          [nombreLugar,tipoLugar, departamento, trabajador, longitud, latitud],
          (tx, results) => {
            console.log("validateData");
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Exito",
                "Zona registrada correctamente",
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
    if (nombreLugar === "" && !nombreLugar.trim()) {
      Alert.alert("Error", "El nombre del lugar es obligatorio");
      return false;
    }

    if (tipoLugar === "" && !tipoLugar.trim()) {
      Alert.alert("Error", "El tipo de lugar es obligatorio");
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
    return true;
  };

  //  clear de los datos
  const clearData = () => {
    setNombreLugar("");
    setTipoLugar("");
    setDepartamento("");
    setTrabajador("");
    setLatitud("");
    setLongitud("");
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
                onChangeText={handleNombreLugar}
                value={nombreLugar}
              />
            <View style={styles.container}>
                <Picker
                  placeholder="Tipo de Lugar"
                  selectedValue={tipoLugar}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleTipoLugar(itemValue)}
                >
                  <Picker.Item label="Seleccione un lugar" value="" />
                  <Picker.Item label="Estancia" value="Estancia" />
                  <Picker.Item label="Quinta" value="Quinta" />
                  <Picker.Item label="Plantación" value="Plantación" />
                </Picker>
              </View>
              <View style={styles.container}>
                <Picker
                  placeholder="Nombre del Departamento"
                  selectedValue={departamento}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleDepartamento(itemValue)}
                >
                  <Picker.Item label="Seleccione departamento" value="" />
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
                onPress={() => navigation.navigate("MapaZona",{cameFrom:"AltaZona"})}
              />
              {
                //comprueba si la longitud o latitud no esta definida y muestra un texto para que ingrese una Ubicacion
                //en el caso de que ya exista ubicacion mustra la latitud y longitud
                latitud == undefined && longitud == undefined 
                ?<Text style={styles.TextUbicacion}>Por favor seleccione Ubicacion</Text>
                :<Text style={styles.TextUbicacion}>{latitud +' '+longitud}</Text>
              }
              
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
  TextUbicacion:{
    color:'black',
    display:'flex',
    marginLeft:30
  }
});
