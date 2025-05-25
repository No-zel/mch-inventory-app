import React, { useEffect } from 'react';
import { APIRequest } from "../utils/request";
import { View, Text, Button, Alert } from 'react-native';
import { findItems, deleteItem } from "../components/item";

export default function HomeScreen({ navigation, route }) {
  const api = new APIRequest();

  useEffect(() => {
    const handleActions = async () => {
      const scannedId = route.params?.scannedData;
      const action = route.params?.scanMode;

      if (!scannedId || !action) return ;
      console.log("test:", scannedId, action)

      try {
        const { response, data } = await findItems(scannedId);
        console.log("reponse :", response)
        if (response.status === 200) {
          console.log(data.data[0].id)
          if (!data) {
            return Alert.alert("Not found", "No item matches the scanned data.");
          }

          if (action === "Find") {
            const date = new Date(data.data[0].created_at);
            const formattedDate = date.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });

const message = `
ID: ${data.data[0].id}
Serial Number: ${data.data[0].serial_number}
Department: ${data.data[0].department}
Category: ${data.data[0].category}
Sub Category: ${data.data[0].subCategory}
Product Name: ${data.data[0].productName}
Created At: ${formattedDate}
Status: ${data.data[0].status}
Assigned To: ${data.data[0].assignedTo}
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
                    const deleteId = await deleteItem(scannedId);
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
    </View>
  );
}
