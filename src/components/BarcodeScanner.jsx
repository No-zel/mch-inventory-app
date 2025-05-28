import React, { useState, Fragment } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { useNavigation } from "@react-navigation/native";

export default function BarcodeScannerComponent({ onScanned }) {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = (result) => {
    if (!scanned) {
      setScanned(true);
      onScanned(result); 
    }
  };

  return (
    <Fragment> 
    <View style={styles.container}>

      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "code39", "ean13", "ean8"]
        }}
        onBarcodeScanned={handleBarCodeScanned}
      />

      <View style={styles.backContainer}> 
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
        <View style={styles.scannerBox} />
      </View>

      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    padding: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  scanAgainBtn: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  backText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  backContainer: {
    position: "absolute",
    top: 60,
    left: 30, 
    zIndex: 10,
  }
});
