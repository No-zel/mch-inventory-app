import { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Login from "./Login/Login";

export default function App() {
  const [activeWindow, setActiveWindow] = useState(2);

  const windows = {
    register: 1,
    login: 2,
    forgotPassword: 3,  // Add forgotPassword window
  };

  function handleLoginClick() {
    console.log("Redirecting to login...");
    setActiveWindow(windows.login);
    console.log("Active window after redirect:", activeWindow);  // Add this line to log the current state
  }
  
  return (
    <SafeAreaView style={styles.authWrapper}>
      {activeWindow === windows.login && (
        <Login 
          handleRegisterClick={handleRegisterClick} 
          handleForgotPasswordClick={handleForgotPasswordClick} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    gap: 50,
  },
});
