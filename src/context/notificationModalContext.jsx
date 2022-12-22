import { createContext, useState } from "react";

export const NotificationModalContext = createContext();
export const defaultNotificationModal = {
  modalOpen: false,
  message: "",
};
export const NotificationModalProvider = ({ children }) => {
  const [notificationModal, setNotificationModal] = useState(
    defaultNotificationModal
  );

  return (
    <NotificationModalContext.Provider
      value={{ notificationModal, setNotificationModal }}
    >
      {children}
    </NotificationModalContext.Provider>
  );
};
