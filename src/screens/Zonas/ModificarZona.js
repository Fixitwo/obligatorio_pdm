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

const EditSite = () => {
  // estados
  const [siteSearch, setSiteSearch] = useState("");
  const [site, setSite] = useState("");
  const [departament, setDepartament] = useState("");
  const [workers, setWorkers] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigation = useNavigation();

  // metodo para setear los estados
  const handleSiteSearch = (site) => {
    console.log("### handleSiteSearch ###", site);
    setSiteSearch(site);
  };

  const handleSite = (site) => {
    setSite(site);
  };

  const handleDepartament = (departament) => {
    setDepartament(departament);
  };

  const handleWorkers = (workers) => {
    setWorkers(workers);
  };
  const handleLatitude = (latitude) => {
    setWorkers(latitude);
  };
  const handleLongitude = (longitude) => {
    setWorkers(longitude);
  };
  // metodo validar datos
  const validateData = () => {
    if (!site && !site.length && site === "" && !site.trim()) {
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    if (!departament && !departament.length && departament === "" && !departament.trim()) {
      Alert.alert("Error", "El departamento es obligatoria");
      return false;
    }

    if (!workers && !workers.length && !workers.trim()) {
      Alert.alert("Error", "El N° de trabajadores es obligatorio");
      return false;
    }

    if (!latitude && !latitude.length && !latitude.trim()) {
        Alert.alert("Error", "La latitud es obligatoria");
        return false;
    }

    if (!longitude && !longitude.length && !longitude.trim()) {
        Alert.alert("Error", "La longitud es obligatoria");
        return false;
    }
    return true;
  };

  const clearSiteSearch = () => {
    setSiteSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setSite("");
    setDepartament("");
    setWorkers("");
    setLatitude("");
    setLongitude("");
  };

  const editSite = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE sites setSite=?, departament=?, workers=? WHERE site=?",
          [site, departament, workers, latitude, longitude, SiteSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Lugar actualizado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
                {
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar el lugar");
            }
          }
        )
      })
    }
  };

  const searchSite = () => {
    if(!siteSearch.trim() && siteSearch === ""){
      Alert.alert("Error", "El lugar es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sites WHERE site = ?",
        [siteSearch],
        (_, results) => {
          if(results.rows.length > 0) {
            const site = results.rows.item(0);
            setSite(site.site);
            setDepartament(site.departament);
            setWorkers(site.workers);
            setLatitude(site.latitude);
            setLatitude(site.longitude);
          }else {
            Alert.alert("Error", "Lugar no encontrado");
            clearSiteSearch();
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
              <MyText textValue="Buscar lugar" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese el lugar"
                onChangeText={handleSiteSearch}
                styles={styles.input}
                value={siteSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchSite} 
                btnColor='green'
              />

            <MyInputText 
              placeholder="Lugar"
              value={site}
              onChangeText={handleSite}
              />

            <MyInputText 
              placeholder="Departamento"
              value={departament}
              onChangeText={handleDepartament}
            />

            <MyInputText 
              placeholder="Trabajadores"
              value={workers}
              onChangeText={handleWorkers}
            />
            <MyInputText 
              placeholder="Trabajadores"
              value={workers}
              onChangeText={handleLatitude}
            />
            <MyInputText 
              placeholder="Trabajadores"
              value={workers}
              onChangeText={handleLongitude}
            />

            <MySingleButton 
              title="Editar" onPress={() => editSite()} 
              btnColor='orange'
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditSite;

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