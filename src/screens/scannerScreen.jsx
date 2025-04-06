import React from 'react';
import BarcodeScannerComponent from '../components/BarcodeScanner';

export default function ScannerScreen({ navigation, route }) {
  const { mode } = route.params;

  const handleScanned = ({ data }) => {
    navigation.navigate('Home', {
      scannedData: data,
      scanMode: mode,
    });
  };

  return (
    <BarcodeScannerComponent onScanned={handleScanned} />
  );
}
