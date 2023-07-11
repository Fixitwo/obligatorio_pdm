import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
// TODO Importar cada una de las pantallas
import HomeScreen from "../screens/HomeScreen";

import ABMUsuarios from "../screens/ABMUsuarios";
import AddUser from "../screens/Usuarios/AltaUsuario";
import ModificarUsuario from "../screens/Usuarios/ModificarUsuario";
import BajaUsuario from "../screens/Usuarios/BajaUsuario";
import VerUsuario from "../screens/Usuarios/VerUsuario";
import VerTodosLosUsuarios from "../screens/Usuarios/VerTodosLosUsuarios";

import ABMZonas from "../screens/ABMZonas";
import AddZona from "../screens/Zonas/AltaZona";
import ModificarZona from "../screens/Zonas/ModificarZona";
import BajaZona from "../screens/Zonas/BajaZona";
import VerZona from "../screens/Zonas/VerZona";
import VerTodasLasZonas from "../screens/Zonas/VerTodasLasZonas";
import MapaZona from "../screens/Zonas/MapaZona";

import ABMInsumos from "../screens/ABMInsumos";
import AddInsumo from "../screens/Insumos/AltaInsumo";
import ModificarInsumo from "../screens/Insumos/ModificarInsumo"
import BajaInsumo from "../screens/Insumos/BajaInsumo";
import VerInsumo from "../screens/Insumos/VerInsumo";
import VerTodosLosInsumos from"../screens/Insumos/VerTodosLosInsumos";

import ABMObservaciones from "../screens/ABMObservaciones"
import AddObservacion from "../screens/Observaciones/AltaObservacion"
import BajaObservacion from "../screens/Observaciones/BajaObservacion"
import ModificarObservacion from "../screens/Observaciones/ModificarObservacion"
import VerTodasLasObservaciones from "../screens/Observaciones/VerTodasLasObservaciones"

import ABMTratamientos from "../screens/ABMTratamientos"
import AñadirTratamiento from "../screens/Tratamientos/AltaTratamiento";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO Agregar cada una de las pantallas */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Principal",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        
        <Stack.Screen
          name="ABMUsuarios"
          component={ABMUsuarios}
          options={{
            title: "ABM Usuarios",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AltaUsuario"
          component={AddUser}
          options={{
            title: "Alta de Usuario",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ModificarUsuario"
          component={ModificarUsuario}
          options={{
            title: "Modificar Usuario",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="BajaUsuario"
          component={BajaUsuario}
          options={{
            title: "Baja de Usuario",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="VerUsuario"
          component={VerUsuario}
          options={{
            title: "Ver Usuario",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="VerTodosLosUsuarios"
          component={VerTodosLosUsuarios}
          options={{
            title: "Ver todos los Usuarios",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        <Stack.Screen
          name="ABMZonas"
          component={ABMZonas}
          options={{
            headerTitle: "ABM Zonas",
            headerStyle: {
              backgroundColor: "#E34038",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AltaZona"
          component={AddZona}
          options={{
            title: "Alta de zonas",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      
        <Stack.Screen
          name="BajaZona"
          component={BajaZona}
          options={{
            title: "Baja de Zona",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        <Stack.Screen
          name="ModificarZona"
          component={ModificarZona}
          options={{
            title: "Modificar Zona",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="VerZona"
          component={VerZona}
          options={{
            title: "Ver Zona",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="VerTodasLasZonas"
          component={VerTodasLasZonas}
          options={{
            title: "Ver todas las zonas",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MapaZona"
          component={MapaZona}
          options={{
            title: "Mapa de zonas",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ABMInsumos"
          component={ABMInsumos}
          options={{
            headerTitle: "ABM Insumos",
            headerStyle: {
              backgroundColor: "#E34038",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AltaInsumo"
          component={AddInsumo}
          options={{
            title: "Alta de Insumo",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="BajaInsumo"
          component={BajaInsumo}
          options={{
            title: "Baja de Insumo",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ModificarInsumo"
          component={ModificarInsumo}
          options={{
            title: "Modificar Insumo",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="VerInsumo"
          component={VerInsumo}
          options={{
            title: "Ver Insumo",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="VerTodosLosInsumos"
          component={VerTodosLosInsumos}
          options={{
            title: "Ver todos los insumos",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        <Stack.Screen
          name="ABMObservaciones"
          component={ABMObservaciones}
          options={{
            headerTitle: "ABM Observaciones",
            headerStyle: {
              backgroundColor: "#E34038",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AltaObservacion"
          component={AddObservacion}
          options={{
            title: "Alta Observacion",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        <Stack.Screen
          name="BajaObservacion"
          component={BajaObservacion}
          options={{
            title: "Baja Observacion",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ModificarObservacion"
          component={ModificarObservacion}
          options={{
            title: "Modificar Observacion",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        
        <Stack.Screen
          name="VerTodasLasObservaciones"
          component={VerTodasLasObservaciones}
          options={{
            title: "Ver Todas Las Observaciones",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      
        <Stack.Screen
          name="ABMTratamientos"
          component={ABMTratamientos}
          options={{
            title: "ABM Tratamientos",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AltaTratamiento"
          component={AñadirTratamiento}
          options={{
            title: "Alta Tratamiento",
            headerStyle: {
              backgroundColor: "#00C14A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
