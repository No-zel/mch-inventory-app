import React, { useEffect, Fragment, useContext } from 'react';
import { APIRequest } from "../utils/request";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { findItems, deleteItem } from "../components/item";

import { UserContext } from "../store/provider";
import { SET_USER } from "../store/user/action_types";

export default function HomeScreen({ navigation, route }) {
  const api = new APIRequest();
  const { userDispatch } = useContext(UserContext);

  function handleLogout() {
    userDispatch({
      type: SET_USER,
      payload: {
        user: null,
        token: null,
      },
    });
  }

  useEffect(() => {
    const handleActions = async () => {
      const scannedId = route.params?.scannedData;
      const action = route.params?.scanMode;

      if (!scannedId || !action) return ;
      console.log("test:", scannedId, action)

      try {
        const { response, data } = await findItems(scannedId);
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
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to AMS Scanner</Text>
        <View style={styles.buttonContainer}> 
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Scanner', { mode: 'Find' })}
        >
          <Svg viewBox="0 0 24 24" width={24} height={24} fill="black">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z"
            />
          </Svg>
          <Text style={styles.buttonText}>ScanQR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLogout()}
        >
        <Svg
          viewBox="0 0 24 24"
          width={24}
          height={24}
          fill="none"
          stroke="black"  
          strokeWidth={1.5}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </Svg>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: "row",
  },
  actionButton: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#000000",
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  }
});