import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
// TODO Importar cada una de las pantallas
import HomeScreen from "../screens/HomeScreen";
import AddUser from "../screens/Usuarios/AltaUsuario";
import ModificarUsuario from "../screens/Usuarios/ModificarUsuario";
import BajaUsuario from "../screens/Usuarios/BajaUsuario";
import VerUsuario from "../screens/Usuarios/VerUsuario";
import VerTodosLosUsuarios from "../screens/Usuarios/VerTodosLosUsuarios";
import ABMUsuarios from "../screens/ABMUsuarios";
import ABMZonas from "../screens/ABMZonas";
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
              backgroundColor: "#E34038",
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
            headerTitle: "Principal",
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
          name="ABMUsers"
          component={ABMUsuarios}
          options={{
            title: "ABM Usuarios",
            headerStyle: {
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
