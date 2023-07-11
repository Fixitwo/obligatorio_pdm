import React, { useState, useEffect, useRef } from "react";
import { Alert, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";


export default function MapaZona({route}) {

  const navigation = useNavigation();

  const mapRef = useRef(null);
  //estos useState obtendran las cordenadas de la ubicacion
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  const handleMapPress = (event) => {
    //Recibe el evento probocado al tocar el mapa para elegir una ubicacion
    //busca en el evento la latitud y la longitud y las agrega al UseState latitud y longitud
    let latitude = event.nativeEvent.coordinate.latitude
    let longitude = event.nativeEvent.coordinate.longitude
    setLatitud(latitude);
    setLongitud(longitude);
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}

        initialRegion={{
          //latitude y longitude son las cordenadas iniciales del mapa
          latitude:-32.6110783,
          longitude: -54.7811711,
          longitudeDelta: 0.005,
          latitudeDelta: 0.005,
        }}
        onPress={handleMapPress}
        ref={mapRef}
      >
       {/*
        Marker es el sibolo rojo que aparece al elegir la ubicacion
        y la posicion en la que apraece son las cordenadas del useSate latitud y longitud.
       */}
        <Marker
          key={1}
          coordinate={{
            latitude: latitud,
            longitude: longitud,
          }}
          title="Zona Elegida"
          description="Zona Elegida"
        />
      </MapView>
      <TouchableOpacity 
      //al apretar el boton navegamos a la pantalla zona, y le pasamos por parametro un objeto con atributos lat y long que son las cordenadas de la ubicacion elegida
      onPress={() => { 
              
        if(route.params.cameFrom=="AltaZona"){
          navigation.navigate("AltaZona",{lat:latitud, long:longitud})
        }
        if(route.params.cameFrom=="ModificarZona"){
          navigation.navigate("ModificarZona",{lat:latitud, long:longitud})
        }
        if(route.params.cameFrom=="AltaObservacion"){
          navigation.navigate("AltaObservacion",{lat:latitud, long:longitud})
        }
        if(route.params.cameFrom=="ModificarObservacion"){
          navigation.navigate("ModificarObservacion",{lat:latitud, long:longitud})
        }
      }}
      style={styles.botonMap}
      >
        <Text style={styles.TextButton}>Elegir Ubicacion</Text>
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
  botonMap:{
    width:'100%',
    height:100,
    backgroundColor:'#42AFA1',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:70,
    marginBottom:30,
    marginTop:20
  },
  TextButton:{
    fontSize:40,
    fontWeight:"bold",
    color:'white',
  }
});
