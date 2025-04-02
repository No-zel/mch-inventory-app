import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>yes🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
// import { NavigationContainer } from "@react-navigation/native";
// import React from "react";
// // import AuthLayout from "./src/layout/AuthLayout";
// // import AllRoutes from "./src/routes/all_routes";
// import { RootSiblingParent } from 'react-native-root-siblings';

// export default function App() {
//   return (
//     <NavigationContainer>
//         <RootSiblingParent>
//         </RootSiblingParent>
//     </NavigationContainer>
// );
//   // return (
//   //     <NavigationContainer>
//   //       <AuthLayout>
//   //         <RootSiblingParent>
//   //           {/* <AllRoutes /> */}
//   //         </RootSiblingParent>
//   //       </AuthLayout>
//   //     </NavigationContainer>
//   // );
// }
