import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationModalReducer from "./features/notificationModalSlice";

export const store = configureStore({
  reducer: {
    notificationModal: notificationModalReducer,
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
