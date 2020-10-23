import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, combineReducers, createStore } from "redux";
import Thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import authReducer from "./store/reduce/auth";
import userReducer from "./store/reduce/user";

import { ThemeProvider } from "@material-ui/core";
import theme from "./themes/MUiThemes";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
