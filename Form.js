import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Modal,
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

import countryApiFetch from "./helpers/CountryApiFetch";
import Validations from "./helpers/Validations";

const Form = ({saveUser}) => {
  const [ssn, setSsN] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Choose a country");
  const [countryList, setCountryList] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let { error, errMessages } = Validations(ssn, phoneNumber, email, country);

  useEffect(() => {
    //Get items from Locals
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
    if (countryList === null) {
      countryApiFetch().then((result) => setCountryList(result));
    }
  }, []);

  const onSubmit = () => {
    let UserObj = { ssn, phoneNumber, email, country };
    if (error) {
      setShowModal(true);
    } else {
      saveUser(UserObj)
      RemoveAllLocalS();
      setSsN("")
      setPhoneNumber("")
      setEmail("")
      setCountry("Choose a country")
      console.log("successful")
    }
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
          onValueChange={(itemValue, itemIndex) => {
            setCountry(itemValue);
            SaveToLocalS("country", itemValue);
          }}
        >
          <Picker.Item label="Choose a country" value="Choose a country" />
          {countryList ? (
            countryList.map((country) => {
              return (
                <Picker.Item label={country} value={country} key={country} />
              );
            })
          ) : (
            <Picker.Item label="Loading" value="Loading" />
          )}
        </Picker>
      </View>

      <View style={styles.submitBtn}>
        <Button title="SUBMIT" color="#1E90FF" onPress={onSubmit} />
      </View>

      <View style={styles.modalView}>
        <Modal animationType="slide" visible={showModal}>
          <View
            style={{
              marginTop: "10%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              margin: "10%",
            }}
          >
            {error
              ? errMessages.map((message) => (
                  <Text style={styles.errorMess} key={message}>
                    *{message}
                  </Text>
                ))
              : null}
            <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
              <Button
                title="CANCEL"
                color="#FF0000"
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
        </Modal>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}


//Redux 
const saveUser = (user) => { 
  console.log('user', user);
  return { 
    type: 'SAVE_USER',
    payload: user,
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({saveUser: saveUser}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Form)

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

  errorMess: {
    textAlign: "center",
    color: "red",
    marginVertical: "5%",
  },
});
