import { StyleSheet, Text, View, BackHandler, Alert } from "react-native";
import React, { Fragment, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../store/provider";

const AuthLayout = ({ children }) => {
  const { userState } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (userState?.token === null) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Home");
    }
  }, [userState]);

  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;