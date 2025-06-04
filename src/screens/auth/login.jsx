import React, { Fragment, useContext, useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { APIRequest } from "../../utils/request";
import { UserContext } from "../../store/provider";
import { SET_USER } from "../../store/user/action_types";

const Login = () => {
  const api = new APIRequest();
  const { userDispatch } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({
    // username: "a",
    // password: "a",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
 
  async function handleSubmitLogin() {
    if (isLoading) return;

    const emptyValues = Object.values(loginForm).some((item) => item === "");
    if (emptyValues) {
      Alert.alert("Please fill out the login form");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Trying to Loging in", loginForm)
      const { data, error, response } = await api.post({
        url: "/account/login/application",
        bodyObj: loginForm,
      });
      if (data?.token) {
        setLoginForm({ username: "", password: "" });
        userDispatch({ type: SET_USER, payload: { user: data?.data, token: data?.token } });
      } else {
        return Alert.alert("Login Info is Incorrect");
      }
    } catch (err) {
      return Alert.alert("Server Error", err.message || "Check logs for details.");
    } finally {
      setIsLoading(false); // End loading
    }
  }

  return (
    <Fragment>
      <View style={styles.loginViewWrapper}>
        <Text style={styles.loginViewTitle}>Login to AMS</Text>
        <View style={styles.loginFieldsWrapper}>
          <View style={styles.loginInputWrapper}>
            <Text style={styles.loginInputLabel}>Username:</Text>
            <TextInput
              value={loginForm.username}
              onChangeText={(text) =>
                setLoginForm((prev) => ({ ...prev, username: text.replace(/\s/g, '') }))
              }
              style={styles.loginInput}
            />
          </View>
          <View style={styles.loginInputWrapper}>
            <Text style={styles.loginInputLabel}>Password:</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                value={loginForm.password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={(text) =>
                  setLoginForm((prev) => ({ ...prev, password: text }))
                }
                style={styles.loginInput}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible((prev) => !prev)}
                style={styles.showHideButton}
              >
                <Text style={styles.showHideText}>
                  {isPasswordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmitLogin}
            style={[styles.loginBtnSubmit, isLoading && styles.disabledButton]}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginViewWrapper: {
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: "auto",
    marginBottom: "auto",
  },
  loginViewTitle: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "900",
    color: "#000000",
  },
  loginFieldsWrapper: {
    width: "95%",
    gap: 25,
  },
  loginInputWrapper: {
    width: "100%",
    gap: 10,
  },
  loginInputLabel: {
    fontSize: 13,
    fontWeight: "900",
  },
  loginInput: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    color: "#000000",
    borderColor: "#000000",
  },
  loginBtnSubmit: {
    marginTop: 10,
    borderColor: "#000000",
    borderWidth: 2,
    backgroundColor: "white",
    color: "white",
    fontWeight: "900",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 5,
    textAlign: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    top: "30%",
    textAlign: "center"
  },
  showHideText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
  },
  loginText: {
    fontSize: 15, // Adjust font size as needed
    fontWeight: "bold", // Makes the text bold
    textAlign: "center", // Centers the text horizontally
    color: "black", // Keeps the text color white
  },
});
