import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import DatabaseConnection from "../../database/db-connection";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../../../AppContext";
const db = DatabaseConnection.getConnection();

const AñadirTratamiento = (Zonas, Usuarios, Insumos, Observaciones) => {
  // estados para los campos del formulario
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [zona, setZona] = useState("");
  const [usuario, setUsuario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [insumo, setInsumo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const { listaUsuarios, listaZonas, listaInsumos, listaObservaciones } =
    useContext(AppContext);

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleId = (id) => {
    setId(id);
  };
  const handleNombre = (nombre) => {
    setNombre(nombre);
  };
  const handleZona = (zona) => {
    setZona(zona);
  };
  const handleUsuario = (usuario) => {
    setUsuario(usuario);
  };
  const handleFechaInicio = (fechaInicio) => {
    setFechaInicio(fechaInicio);
  };
  const handleFechaFin = (fechaFin) => {
    setFechaFin(fechaFin);
  };
  const handleTiempo = (tiempo) => {
    setTiempo(tiempo);
  };
  const handleInsumo = (insumo) => {
    setInsumo(insumo);
  };
  const handleObservaciones = (observaciones) => {
    setObservaciones(observaciones);
  };

  // metodo guarde el formulario
  const añadirTratamiento = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    if (validateData()) {
      // llamar a la db y guarar los datos
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO tratamientos(idTratamiento, nomTratamiento, zonaTratamiento,usuarioTratamiento, fechaInicio, fechaFin, tiempo, insumoTratamiento, observacionesTratamiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            id,
            nombre,
            zona,
            usuario,
            fechaInicio,
            fechaFin,
            tiempo,
            insumo,
            observaciones,
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Exito",
                "Tratamiento registrado correctamente",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("ABMTratamientos"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
              clearData();
            } else {
              Alert.alert("Error", "Error al registrar el tratamiento");
            }
          }
        );
      });
    }
  };

  // metodo validar datos
  const validateData = () => {
    if (nombre === "" && !nombre.trim()) {
      Alert.alert("Error", "El nombre del tratamiento es obligatorio");
      return false;
    }
    if (id === "" && !id.trim()) {
      Alert.alert("Error", "El identificador del tratamiento es obligatorio");
      return false;
    }
    if (zona == undefined) {
      Alert.alert("Error", "La zona del tratamiento es obligatoria");
      return false;
    }
    if (usuario == undefined) {
      Alert.alert("Error", "El usuario es obligatorio");
      return false;
    }
    if (fechaInicio === "" && !fechaInicio.trim()) {
      Alert.alert("Error", "La fecha de inicio del tratamiento es obligatoria");
      return false;
    }
    if (fechaFin === "" && !fechaFin.trim()) {
      Alert.alert("Error", "La fecha final del tratamiento es obligatoria");
      return false;
    }
    if (tiempo === "" && !tiempo.trim()) {
      Alert.alert("Error", "El tiempo del tratamiento es obligatorio");
      return false;
    }
    if (insumo == undefined) {
      Alert.alert("Error", "El insumo es obligatorio");
      return false;
    }
    if (observaciones == undefined) {
      Alert.alert("Error", "Las observaciones son obligatorias");
      return false;
    }

    return true;
  };

  //  clear de los datos
  const clearData = () => {
    setId("");
    setNombre("");
    setZona("");
    setUsuario("");
    setFechaInicio("");
    setFechaFin("");
    setTiempo("");
    setInsumo("");
    setObservaciones("");
  };
  // Formulario de registro de tratamiento
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                styles={styles.inputUser}
                placeholder="Identificación"
                onChangeText={handleId}
                value={id}
              />
              <MyInputText
                styles={styles.inputUser}
                placeholder="Nombre"
                onChangeText={handleNombre}
                value={nombre}
              />
              <View style={styles.containerPicker}>
                <Picker>
                <Picker.Item label="Seleccione una zona" value="" />
                  {listaZonas.map((zona) => (
                    <Picker.Item
                      key={zona.idZona}
                      label={zona.nombreLugar}
                      value={zona.idZona}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.containerPicker}>
                <Picker>
                <Picker.Item label="Seleccione un usuario" value="" />
                  {listaUsuarios.map((user) => (
                    <Picker.Item
                      key={user.idUsuario}
                      label={user.nombre}
                      value={user.idUsuario}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.containerPicker}>
                <Picker>
                <Picker.Item label="Seleccione un insumo" value="" />
                  {listaInsumos.map((insumo) => (
                    <Picker.Item
                      key={insumo.idInsumo}
                      label={insumo.nomIns}
                      value={insumo.idInsumo}
                    />
                  ))}
                </Picker>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AñadirTratamiento;

const styles = StyleSheet.create({
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
  inputUser: {},
  inputPassword: {},
});
