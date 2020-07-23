import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Form from "./Form";

const initialState = {
  user: {
    ssn: "",
    phoneNumber: "",
    email: "",
    country: "",
  },
};

const reducer = (state = initialState) => {  
  return state;
};

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
}
