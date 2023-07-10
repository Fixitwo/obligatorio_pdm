import React, {useState,useEffect} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../database/db-connection";

const db = DatabaseConnection.getConnection();

const EditObservacion = (UbicacionMapa) => {
  // estados
  const [tituloSearch, setTituloSearch] = useState("");
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");

  const navigation = useNavigation();
  const rut = UbicacionMapa.route.params;

  const [latitud, setLatitud] = useState(rut?.lat);
  const [longitud, setLongitud] = useState(rut?.long);

  //cada vez que se agrega un dato a UbicacionMapa se asignan esos datos a los useState latitud y longitud
  useEffect(()=>{
    setLatitud(rut?.lat);
    setLongitud(rut?.long)
  },[UbicacionMapa])
  // metodo para setear los estados
  const handleTituloSearch = (Titulo) => {
    console.log("### handleTituloSearch ###", Titulo);
    setTituloSearch(Titulo);
  };

  const handleLugar = (titulo) => {
    setLugar(titulo);
  };

  const handleImagen = (imagen) => {
    setImagen(imagen);
  };

  const handlelongitud = (longitud) => {
    setLongitud(longitud);
  };

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };
  // metodo validar datos
  const validateData = () => {
    if (!lugar && !lugar.length && lugar === "" && !lugar.trim()) {
      Alert.alert("Error", "El nombre del lugar es obligatorio");
      return false;
    }

    if (!departamento && !departamento.length && departamento === "" && !departamento.trim()) {
      Alert.alert("Error", "El departamento es obligatoria");
      return false;
    }

    if (!trabajador && !trabajador.length && !trabajador.trim()) {
      Alert.alert("Error", "El N° de trabajadores es obligatorio");
      return false;
    }

    if (!longitud && !longitud.length && !longitud.trim()) {
        Alert.alert("Error", "La longitud es obligatorio");
        return false;
    }
      
    if (!trabajador && !trabajador.length && !trabajador.trim()) {
        Alert.alert("Error", "La latitud es obligatorio");
        return false;
      }
    return true;
  };

  const clearZonaSearch = () => {
    setLugarSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setTrabajador("");
    setLongitud("");
    setLatitud("");
  };

  const editObservacion = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE zonas set lugar=?, departamento=?, numTrabajadores=?, longitud=?, latitud=? WHERE lugar=?",
          [lugar, departamento, trabajador, longitud, latitud, lugarSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Zona actualizada correctamente", [
                {
                 
                  onPress: () => navigation.navigate("HomeScreen"),
                },
                {
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar la zona");
            }
          }
        )
      })
    }
  };

  const searchLugar = () => {
    if(!lugarSearch.trim() && lugarSearch === ""){
      Alert.alert("Error", "El nombre del lugar es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zonas WHERE lugar = ?",
        [lugarSearch],
        (_, results) => {
          if(results.rows.length > 0) {
            const zona = results.rows.item(0);
            setLugar(zona.lugar);
            setDepartamento(zona.departamento);
            setTrabajador(zona.numTrabajadores);
            setLongitud(zona.longitud);
            setLatitud(zona.latitud);
          }else {
            Alert.alert("Error", "Zona no encontrada");
            clearZonaSearch();
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
                btnColor='green'
              />

            <MyInputText 
              placeholder="Nombre del lugar"
              value={lugar}
              onChangeText={handleLugar}
              />

            <MyInputText 
              placeholder="Departamento"
              value={departamento.toString()}
              onChangeText={handleDepartamento}
            />

            <MyInputText 
              placeholder="N° trabajadores"
              value={trabajador.toString()}
              onChangeText={handleTrabajador}
            />
            <MySingleButton
                title="Seleccionar ubicación"
                btnColor="green"
                onPress={() => navigation.navigate("MapaZona", {cameFrom:"ModificarZona"})}
            />
             {
                <Text style={styles.TextUbicacion}>{latitud +' '+longitud}</Text>
              }

            <MySingleButton 
              title="Editar" onPress={() => editObservacion()} 
              btnColor='orange'
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditObservacion;

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
