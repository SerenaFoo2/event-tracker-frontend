import { createSlice } from "@reduxjs/toolkit";

export const notificationModalSlice = createSlice({
  name: "notificationModal",
  initialState: {
    modalOpen: false,
    message: "",
  },
  reducers: {
    notification: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.modalOpen = true;
      state.message = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { notification, closeModal } = notificationModalSlice.actions;

export default notificationModalSlice.reducer;
