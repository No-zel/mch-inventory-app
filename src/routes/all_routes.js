import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import auth_protected_routes from "./auth_protected";
import public_routes from "./public";

const Stack = createStackNavigator();

const AllRoutes = () => {
  const { userState } = useContext(UserContext);

  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      {userState?.token === null && (
        <Stack.Group>
          {public_routes.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Group>
      )}
      {userState?.token && (
        <Stack.Group>
          {auth_protected_routes.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AllRoutes;

const styles = StyleSheet.create({});