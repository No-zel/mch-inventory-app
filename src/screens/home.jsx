import React, { useEffect } from 'react';
import { APIRequest } from "../utils/request";
import { View, Text, Button, Alert } from 'react-native';
import { findItems, deleteItem } from "../components/item";

export default function HomeScreen({ navigation, route }) {
  const api = new APIRequest();

  useEffect(() => {
    const handleActions = async () => {
      const scannedId = Number(route.params?.scannedData);
      const action = route.params?.scanMode;

      if (!scannedId || !action) return ;

      try {
        const { response, data } = await findItems();
        if (response.status === 200) {
          const foundItem = data.data.find(item => item.id === scannedId);

          if (!foundItem) {
            return Alert.alert("Not found", "No item matches the scanned data.");
          }

          if (action === "Find") {

const message = `
ID: ${foundItem.id}
Product Name: ${foundItem.productname}
Category: ${foundItem.category}
Department: ${foundItem.department}
Assigned To: ${foundItem.assigned_to}
Status: ${foundItem.status}
`;
        
          Alert.alert("Item Lookup", message);
          } else if (action === "Delete") {
            Alert.alert(
              "Confirm Deletion",
              "Are you sure you want to delete this item?",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: async () => {
                    const deleteId = await deleteItem(foundItem.id);
                    if (deleteId.response.status === 200) {
                      Alert.alert("Deleted", "Item successfully deleted.");
                    } else {
                      Alert.alert("Error", "Failed to delete item.");
                    }
                  },
                },
                {
                  text: "Cancel",
                  style: "cancel",
                }
              ]
            );
          }
        }
      } catch (err) {
        console.error("Error", err)
      }
    }
    handleActions();
  }, [route.params]);
  
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Inventory App</Text>
      <Button title="Find Item" onPress={() => navigation.navigate('Scanner', { mode: 'Find' })} />
      <Button title="Delete Item" onPress={() => navigation.navigate('Scanner', { mode: 'Delete' })} />
    </View>
  );
}
