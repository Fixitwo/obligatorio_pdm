import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
// TODO Importar cada una de las pantallas
import HomeScreen from "../screens/HomeScreen";
import AddUser from "../screens/AddUser";
import EditUser from "../screens/EditUser";
import DeleteUser from "../screens/DeleteUser";
import ViewUser from "../screens/ViewUser";
import ViewAllUsers from "../screens/ViewAllUsers";

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
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="RegisterUser"
          component={AddUser}
          options={{
            title: "Registrar Usuario",
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
          name="EditUser"
          component={EditUser}
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
          name="DeleteUser" 
          component={DeleteUser}
          options={{
            title: "Borrar Usuario",
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
          name="ViewUser" 
          component={ViewUser} 
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
          name="ViewAllUsers" 
          component={ViewAllUsers} 
          options={{
            title: "Ver todos los Usuario",
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