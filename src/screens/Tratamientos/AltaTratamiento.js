import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
  Button,
} from "react-native";

import MyInputText from "../../components/MyInputText";
import DatabaseConnection from "../../database/db-connection";
import DateTimePicker from "@react-native-community/datetimepicker";
import FilePicker from "../../components/SelectorDocumentos";
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
  const [fechaInicio, setFechaInicio] = useState(new Date(1598051730000));
  const [fechaFin, setFechaFin] = useState(new Date(1598051730000));
  const [tiempo, setTiempo] = useState("");
  const [orden, setOrden] = useState(null);
  const [insumo, setInsumo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  //estados del selector de fechas
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

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
  const handleFechaInicio = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setFechaInicio(currentDate);
  };
  const handleFechaFin = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setFechaFin(currentDate);
  };
  const handleOrden = (orden) => {
    setOrden(orden);
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
                <Picker
                  placeholder="Zona del tratamiento"
                  selectedValue={zona}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleZona(itemValue)}
                >
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
                <Picker
                  placeholder="Usuario"
                  selectedValue={usuario}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleUsuario(itemValue)}
                >
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
              <View style={styles.inputDate}>
                <Button
                  onPress={showDatepicker}
                  title="Seleccionar fecha de inicio"
                />
                <Text>{fechaInicio.toLocaleDateString()}</Text>
                {show && (
                  <DateTimePicker
                    testID="fechaInicioPicker"
                    value={fechaInicio}
                    mode={mode}
                    is24Hour={true}
                    onChange={handleFechaInicio}
                  />
                )}
                <Button
                  onPress={showDatepicker}
                  title="Seleccionar fecha de fin"
                />
                <Text>{fechaFin.toLocaleDateString()}</Text>
                {show && (
                  <DateTimePicker
                    testID="fechaFinPicker"
                    value={fechaFin}
                    mode={mode}
                    is24Hour={true}
                    onChange={handleFechaFin}
                  />
                )}
              </View>
                <MyInputText
                  styles={styles.inputUser}
                  placeholder="Tiempo (Horas de ejecución)"
                  onChangeText={handleTiempo}
                  value={tiempo}
                  keyboardType="numeric"
                />
              <View style={styles.inputDate}>
                <FilePicker callback={handleOrden} />
              </View>
              <View style={styles.containerPicker}>
                <Picker
                  placeholder="Insumo"
                  selectedValue={insumo}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleInsumo(itemValue)}
                >
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
  inputDate: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
});
