// react things
import React from "react";
import ReactDOM from "react-dom";

// app
import App from "./App";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// router
import {BrowserRouter as Router} from "react-router-dom";

// redux state management
import {Provider} from "react-redux";
import store from "./redux/store";

import axios from "axios";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.headers = {};
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <App />
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
