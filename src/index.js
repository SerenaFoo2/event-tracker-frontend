import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { AllEventsContextProvider } from "./context/allEventsContext";
import { UserContextProvider } from "./context/userContext";
import { NotificationModalProvider } from "./context/notificationModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AllEventsContextProvider>
        <UserContextProvider>
          <NotificationModalProvider>
            <App />
          </NotificationModalProvider>
        </UserContextProvider>
      </AllEventsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
