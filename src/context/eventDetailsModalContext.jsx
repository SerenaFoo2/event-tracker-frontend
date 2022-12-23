import { createContext, useState } from "react";

export const EventDetailsModalContext = createContext();

// use in <EventDetailsModal>
const defaultEeventDetailsModal = {
  event: {},
  modalOpen: false,
};

export const EventDetailsModalProvider = ({ children }) => {
  const [eventDetailsModal, setEventDetailsModal] = useState(
    defaultEeventDetailsModal
  );

  return (
    <EventDetailsModalContext.Provider
      value={{ eventDetailsModal, setEventDetailsModal }}
    >
      {children}
    </EventDetailsModalContext.Provider>
  );
};
