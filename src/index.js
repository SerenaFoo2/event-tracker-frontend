import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "../src/redux/store";
import { AuthContextProvider } from "./context/authContext";
import { AllEventsContextProvider } from "./context/allEventsContext";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <AuthContextProvider>
        <AllEventsContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </AllEventsContextProvider>
      </AuthContextProvider>
    </StoreProvider>
  </React.StrictMode>
);
