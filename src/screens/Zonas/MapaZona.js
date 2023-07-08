import React, { useState, useEffect, useRef } from "react";
import { Alert, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function MapaZona(UbicacionElegida) {
  const [location, setLocation] = useState({longitude: -32.522779, latitude: -55.765835});
  const [selectedLocations, setSelectedLocations] = useState([]);
  const mapRef = useRef();

  const requestForegroundPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const currentPosition = await getCurrentPositionAsync();
      console.log("Current position", currentPosition);
      setLocation(currentPosition);
    } else {
      Alert.alert(
        "Los permisos de localizacion son obligatorios, por favor vuelva a intentar"
      );
    }
  };

  useEffect(() => {
    requestForegroundPermission().then(() => console.log(location));
  }, []);

  useEffect(() => {
    const watchLocation = async () => {
      await watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (newLocation) => {
          setLocation(newLocation);
          if (location !== newLocation) {
            mapRef.current.animateCamera({
              center: newLocation.coords,
            });
          }
        }
      );
    };

    watchLocation().then(() => console.log("### watching location ###"));
  }, []);

  const handleMapPress = (coordinate) => {
    const { latitude, longitude } = coordinate;
    const newLocation = { latitude, longitude };
    setSelectedLocations(newLocation);
    console.log(selectedLocations)
  };

  const ElegirUNaZona = (FuncionZona) =>{
    FuncionZona(selectedLocations)
  }

  return (
    <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude:  -32.522779,
            longitude: -55.765835,
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
          }}
          ref={mapRef}
          onPress={(event) => handleMapPress(event.nativeEvent.coordinate)}
        >
          <Marker
            title='Ubicacion Elejida'
            coordinate={{  
              longitude: selectedLocations.longitude,
              latitude: selectedLocations.latitude,
            }}
          />
          </MapView>
          <TouchableOpacity onPress={ElegirUNaZona(UbicacionElegida)}>
             <Text>Agregar ubicación</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
