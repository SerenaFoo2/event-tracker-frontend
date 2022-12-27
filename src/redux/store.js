import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationModalReducer from "./features/notificationModalSlice";
import eventDetailsModalReducer from "./features/eventDetailsModalSlice";

export const store = configureStore({
  reducer: {
    notificationModal: notificationModalReducer,
    eventDetailsModal: eventDetailsModalReducer,
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
