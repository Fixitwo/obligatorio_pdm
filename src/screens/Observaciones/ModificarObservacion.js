import React, {useState,useEffect} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
  Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../database/db-connection";
import ImagenPicker from "../../components/SelectorImagen";

const db = DatabaseConnection.getConnection();

const EditObservacion = (UbicacionMapa) => {
  // estados
  const [idSearch, setIdSearch] = useState("");
  const [id, setId]= useState("");
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState(null);

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
  const handleIdSearch = (id) => {
    console.log("### handleTituloSearch ###", id);
    setIdSearch(id);
  };

  const handleId = (id) => {
    setId(id);
  };
  const handleTitulo = (titulo) => {
    setTitulo(titulo);
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

    if (!titulo && !titulo.length && titulo === "" && !titulo.trim()) {
      Alert.alert("Error", "El titulo de la observacion es obligatoria");
      return false;
    }

    if (!imagen && !imagen.length && imagen === "" && !imagen.trim()) {
      Alert.alert("Error", "El la imagen es obligatoria");
      return false;
    }

    if (!longitud && !longitud.length && !longitud.trim()) {
        Alert.alert("Error", "La longitud es obligatorio");
        return false;
    }
      
    if (!latitud && !latitud.length && !latitud.trim()) {
        Alert.alert("Error", "La latitud es obligatorio");
        return false;
      }
    return true;
  };

  const clearObservacionSearch = () => {
    setIdSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    clearObservacionSearch(); 
    setId("");
    setTitulo("");
    setImagen("");
    setLongitud("");
    setLatitud("");
  };

  const editObservacion = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE observaciones set titulo=?, imagen=?, longitud=?, latitud=? WHERE idObservacion=?",
          [titulo, imagen, longitud, latitud, idSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Observacion actualizada correctamente", [
                {
                 
                  onPress: () => navigation.navigate("ABMObservaciones"),
                },
                {
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar la observacion");
            }
          }
        )
      })
    }
  };

  const searchObservacion = () => {
    if(!idSearch.trim() && idSearch === ""){
      Alert.alert("Error", "El id de la observacion es requerida");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM observaciones WHERE idObservacion = ?",
        [idSearch],
        (_, results) => {
          if(results.rows.length > 0) {
            const observacion = results.rows.item(0);
            setTitulo(observacion.titulo);
            setImagen(observacion.imagen);
            setLongitud(observacion.longitud);
            setLatitud(observacion.latitud);
          }else {
            Alert.alert("Error", "Observacion no encontrada");
            clearObservacionSearch();
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
              <MyText textValue="Buscar Observacion" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese Id"
                onChangeText={handleIdSearch}
                styles={styles.input}
                value={idSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchObservacion} 
                btnColor='green'
              />

                <View style={styles.containerPicker}>
                <Picker
                  placeholder="Titulo"
                  selectedValue={titulo}
                  style={{ maxLength: 40, minLength: 0 }}
                  onValueChange={(itemValue) => handleTitulo(itemValue)}
                  prompt="Titulo"
                >
                  <Picker.Item label="Plaga Detectada" value="Plaga Detectada" />
                  <Picker.Item label=" Planta en mal estado" value=" Planta en mal estado" />
                  <Picker.Item label="Falta de riego" value="Falta de riego" />

                </Picker>
              </View>
              <ImagenPicker callback = {handleImagen}/>
                {console.log("#####Imagen",imagen)}
                {imagen !== null && <Image source={{uri: imagen}} style= {{width: 100,height:100, marginLeft:155, marginTop:10}}/>}

            <MySingleButton
                title="Seleccionar ubicación"
                btnColor="green"
                onPress={() => navigation.navigate("MapaZona", {cameFrom:"ModificarObservacion"})}
            />
              {
                //comprueba si la longitud o latitud no esta definida y muestra un texto para que ingrese una Ubicacion
                //en el caso de que ya exista ubicacion mustra la latitud y longitud
                latitud == undefined && longitud == undefined 
                ?<Text style={styles.TextUbicacion}>Por favor seleccione Ubicacion</Text>
                :<Text style={styles.TextUbicacion}>{latitud +' '+longitud}</Text>
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
    padding: 15
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  TextUbicacion:{
    color:'black',
    display:'flex',
    marginLeft:30
  }
});
