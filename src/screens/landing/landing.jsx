import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import { APIRequest } from "../../utils/requests";

export default function App() {
  const api = new APIRequest();
  const navigation = useNavigation();

  async function testPing() {
    try {
      const { response, data } = await api.get({
        url: "/",
      });

      if (response.status === 200) {
        console.log("STUDENT PING");
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    testPing();
  }, []);

  return (
    <SafeAreaView style={styles.landingWrapper}>
      <Fragment>
        <View style={styles.appContainer}>
          <Text style={styles.appTitle}>MCH Inventory</Text>
          {/* <Image
            style={styles.appLogo}
            source={require("../../assets/appfront/school-logo.png")}
          /> */}
        </View>
        <View style={styles.linkGroup}>
          <Text
            onPress={() => navigation.navigate("Scanner")}
            style={styles.registerBtn}
          >
            Let's start
          </Text>
        </View>
      </Fragment>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  landingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  appContainer: {
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  // appLogo: {
  //   height: 250,
  //   width: 250,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  appTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#691212",
  },
  // linkGroup: {
  //   gap: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  registerBtn: {
    backgroundColor: "maroon",
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 5,
    marginTop: 50,
  },
  // loginBtn: {
  //   fontWeight: "700",
  //   textAlign: "center",
  //   fontSize: 20,
  //   color: "white",
  //   width: 180,
  //   backgroundColor: "maroon",
  //   borderRadius: 15,
  //   paddingTop: 20,
  //   paddingRight: 40,
  //   paddingBottom: 20,
  //   paddingLeft: 40,
  // },
});