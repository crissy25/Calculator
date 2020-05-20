import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import mainReducer from "./reducer";
import Calculator from "./Components/Calculator/Calculator";

import App from "./Components/App";
const store = createStore(mainReducer);
// ReactDOM.render(<Calculator />, document.getElementById("root"));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
