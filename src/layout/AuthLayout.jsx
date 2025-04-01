import { StyleSheet, Text, View, BackHandler, Alert } from "react-native";
import React, { Fragment, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const AuthLayout = ({ children }) => {

  const navigation = useNavigation();

  useEffect(() => {
    if (userState?.token === null) {
      navigation.navigate("Scanner");
    } else {
      navigation.navigate("Scanner");
    }
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
