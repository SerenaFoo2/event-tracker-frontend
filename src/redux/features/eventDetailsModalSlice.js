import { createSlice } from "@reduxjs/toolkit";

export const eventDetailsModalSlice = createSlice({
  name: "eventDetailsModal",
  initialState: {
    modalOpen: false,
    event: {},
  },
  reducers: {
    showEventDetials: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.modalOpen = true;
      state.event = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showEventDetials, closeModal } = eventDetailsModalSlice.actions;

export default eventDetailsModalSlice.reducer;
