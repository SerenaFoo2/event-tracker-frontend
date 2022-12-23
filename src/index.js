import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { AllEventsContextProvider } from "./context/allEventsContext";
import { UserContextProvider } from "./context/userContext";
import { NotificationModalProvider } from "./context/notificationModalContext";
import { EventDetailsModalProvider } from "./context/eventDetailsModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AllEventsContextProvider>
        <UserContextProvider>
          <NotificationModalProvider>
            <EventDetailsModalProvider>
              <App />
            </EventDetailsModalProvider>
          </NotificationModalProvider>
        </UserContextProvider>
      </AllEventsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
