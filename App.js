import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthLayout from "./layout/AuthLayout";
import AllRoutes from "./routes/all_routes";
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
      <NavigationContainer>
        <AuthLayout>
          <RootSiblingParent>
            <AllRoutes />
          </RootSiblingParent>
        </AuthLayout>
      </NavigationContainer>
  );
}
