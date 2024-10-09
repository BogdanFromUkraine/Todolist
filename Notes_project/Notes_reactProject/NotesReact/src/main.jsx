import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { App } from "./App.jsx";
import { RootStoreContext } from "../store/root-store-context.ts";
import DataStore from "../store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RootStoreContext.Provider value={new DataStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RootStoreContext.Provider>,
);
