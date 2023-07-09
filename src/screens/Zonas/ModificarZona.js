import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../database/db-connection";
import { Picker } from "@react-native-picker/picker";

const db = DatabaseConnection.getConnection();

const EditZona = (UbicacionMapa) => {
  // estados
  const [lugarSearch, setLugarSearch] = useState("");
  const [nombreLugar, setNombreLugar] = useState("");
  const [tipoLugar, setTipoLugar] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [trabajador, setTrabajador] = useState("");
  const navigation = useNavigation();
  const rut = UbicacionMapa.route.params;

  const [latitud, setLatitud] = useState(rut?.lat);
  const [longitud, setLongitud] = useState(rut?.long);

  //cada vez que se agrega un dato a UbicacionMapa se asignan esos datos a los useState latitud y longitud
  useEffect(() => {
    setLatitud(rut?.lat);
    setLongitud(rut?.long);
  }, [UbicacionMapa]);
  // metodo para setear los estados
  const handleLugarSearch = (Lugar) => {
    console.log("### handleLugarSearch ###", Lugar);
    setLugarSearch(Lugar);
  };

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

  const handlelongitud = (longitud) => {
    setLongitud(longitud);
  };

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };
  // metodo validar datos
  const validateData = () => {
    if (
      !nombreLugar &&
      !nombreLugar.length &&
      nombreLugar === "" &&
      !nombreLugar.trim()
    ) {
      Alert.alert("Error", "El nombre del lugar es obligatorio");
      return false;
    }
    if (
      !tipoLugar &&
      !tipoLugar.length &&
      tipoLugar === "" &&
      !tipoLugar.trim()
    ) {
      Alert.alert("Error", "El tipo de lugar es obligatorio");
      return false;
    }
    if (
      !departamento &&
      !departamento.length &&
      departamento === "" &&
      !departamento.trim()
    ) {
      Alert.alert("Error", "El departamento es obligatoria");
      return false;
    }

    if (!trabajador && !trabajador.length && !trabajador.trim()) {
      Alert.alert("Error", "El N° de trabajadores es obligatorio");
      return false;
    }

    if (longitud == undefined || latitud == undefined)  {
      Alert.alert("Error", "La ubicación es obligatoria");
      return false;
    }
    return true;
  };

  const clearZonaSearch = () => {
    setLugarSearch("");
  };

  //  clear de los datos
  const clearData = () => {
    setNombreLugar("");
    setTipoLugar("");
    setDepartamento("");
    setTrabajador("");
    setLongitud("");
    setLatitud("");
  };

  const editZona = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE zonas set nombreLugar=?, tipoLugar=?, departamento=?, numTrabajadores=?, longitud=?, latitud=? WHERE nombreLugar=?",
          [
            nombreLugar,
            tipoLugar,
            departamento,
            trabajador,
            longitud,
            latitud,
            lugarSearch,
          ],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Zona actualizada correctamente", [
                {
                  onPress: () => navigation.navigate("ABMZonas"),
                },
                {
                  cancelable: false,
                },
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar la zona");
            }
          }
        );
      });
    }
  };

  const searchLugar = () => {
    if (!lugarSearch.trim() && lugarSearch === "") {
      Alert.alert("Error", "El nombre del lugar es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zonas WHERE nombreLugar = ?",
        [lugarSearch],
        (_, results) => {
          if (results.rows.length > 0) {
            const zona = results.rows.item(0);
            setNombreLugar(zona.nombreLugar);
            setTipoLugar(zona.tipoLugar);
            setDepartamento(zona.departamento);
            setTrabajador(zona.numTrabajadores);
            setLongitud(zona.longitud);
            setLatitud(zona.latitud);
          } else {
            Alert.alert("Error", "Zona no encontrada");
            clearZonaSearch();
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText textValue="Buscar zona" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese el nombre del lugar"
                onChangeText={handleLugarSearch}
                styles={styles.input}
                value={lugarSearch}
              />
              <MySingleButton
                title="Buscar"
                onPress={searchLugar}
                btnColor="green"
              />

              <MyInputText
                placeholder="Nombre del lugar"
                value={nombreLugar}
                onChangeText={handleNombreLugar}
              />

              <View style={styles.containerPicker}>
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

              <View style={styles.containerPicker}>
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
                placeholder="N° trabajadores"
                value={trabajador.toString()}
                onChangeText={handleTrabajador}
                keyboardType="numeric"
              />
              <MySingleButton
                title="Seleccionar ubicación"
                btnColor="green"
                onPress={() =>
                  navigation.navigate("MapaZona", { cameFrom: "ModificarZona" })
                }
              />
              {latitud == undefined && longitud == undefined ? (
                <Text style={styles.TextUbicacion}>
                  Por favor seleccione Ubicacion
                </Text>
              ) : (
                <Text style={styles.TextUbicacion}>
                  {latitud + " " + longitud}
                </Text>
              )}

              <MySingleButton
                title="Editar"
                onPress={() => editZona()}
                btnColor="orange"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditZona;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPicker: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 10,
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
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  TextUbicacion: {
    color: "black",
    display: "flex",
    marginLeft: 30,
  },
});
