import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import AuthLayout from "./src/layout/AuthLayout";
import AllRoutes from "./src/routes/all_routes";
import { GlobalProvider} from "./src/store/provider";

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <AuthLayout>
          <RootSiblingParent>
            <AllRoutes />
          </RootSiblingParent>
        </AuthLayout>
      </NavigationContainer>
    </GlobalProvider>
  );
}
