import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
} from "react-native";

import {
  SaveToLocalS,
  GetFromLocalS,
  RemoveAllLocalS,
} from "./helpers/LocalStorageHelper";

export default function App() {
  const [ssn, setSsN] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Choose a country");

  useEffect(() => {
    if (GetFromLocalS("ssn")) {
      GetFromLocalS("ssn").then((result) => setSsN(JSON.parse(result)));
    }
    if (GetFromLocalS("phonenumber")) {
      GetFromLocalS("phonenumber").then((result) =>
        setPhoneNumber(JSON.parse(result))
      );
    }
    if (GetFromLocalS("email")) {
      GetFromLocalS("email").then((result) => setEmail(JSON.parse(result)));
    }
    if (GetFromLocalS("country")) {
      GetFromLocalS("country").then((result) => setCountry(JSON.parse(result)));
    }

  }, []);

  const onSubmit = () => {
    RemoveAllLocalS();
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Social security number"
          onChangeText={(text) => {
            setSsN(text);
            SaveToLocalS("ssn", text);
          }}
          value={ssn}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Phone number"
          onChangeText={(text) => {
            setPhoneNumber(text);
            SaveToLocalS("phonenumber", text);
          }}
          value={phoneNumber}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Email address"
          onChangeText={(text) => {
            setEmail(text);
            SaveToLocalS("email", text);
          }}
          value={email}
        />
      </View>

      <View style={styles.input}>
        <Picker
        selectedValue={country}
        onValueChange={(itemValue, itemIndex) =>{setCountry(itemValue); SaveToLocalS("country", itemValue);}}
        >
          <Picker.Item label="Choose a country" value="Choose a country" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
        </Picker>
      </View>

      <View style={styles.submitBtn}>
        <Button title="SUBMIT" color="#1E90FF" onPress={onSubmit} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "10%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  input: {
    width: "100%",
    padding: "3%",
    borderWidth: 1,
    borderColor: "#B8B8B8",
  },

  submitBtn: {
    width: "100%",
  },
});
