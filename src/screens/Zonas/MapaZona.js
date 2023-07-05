import React, { useState, useEffect, useRef } from "react";
import { Alert, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function MapaZona({ onLocationsSelected }) {
  const [location, setLocation] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const mapRef = useRef(null);

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
    setSelectedLocations([...selectedLocations, newLocation]);
    onLocationsSelected([...selectedLocations, newLocation]);
  };
  
  const markerArray = [
    {
      id: 1,
      latitude: -32.6110783,
      longitude: -54.7811711,
      title: "Juan Lacaze",
      description: "Colonia",
    },
    {
      id: 2,
      latitude: -34.455208,
      longitude: -57.830575,
      title: "Colonia del Sacramento",
      description: "Colonia",
    },
    {
      id: 3,
      latitude: -32.6110783,
      longitude: -54.7811711,
      title: "Carmelo",
      description: "",
    },
    {
      id: 4,
      latitude: -34.855329,
      longitude: -56.206648,
      title: "Montevideo",
      description: "Montevideo - Prado",
    },
  ];

  return (
    <View style={styles.container}>
      <Text>Cargando Mapa</Text>
      {!location && <ActivityIndicator size="large" />}
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -32.6110783,
            longitude: -54.7811711,
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
          }}
          ref={mapRef}
          onPress={(event) => handleMapPress(event.nativeEvent.coordinate)}
        >
          <Marker
            id="yo"
            coordinate={{
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            }}
            title="Miubicacion"
            description="Donde estoy ahora"
          />
          {selectedLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={`Ubicación ${index + 1}`}
            />
          ))}
          {markerArray.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      )}
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
