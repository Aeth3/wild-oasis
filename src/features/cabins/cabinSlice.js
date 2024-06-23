import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cabins: [],
  isOpenModal: false,
};
const cabinSlice = createSlice({
  name: "cabin",
  initialState,
  reducers: {
    submitCabin(state) {
      state.isOpenModal = false;
    },
    toggleForm(state, action) {
      state.isOpenModal = !action.payload;
    },
  },
});

export const { submitCabin, toggleForm } = cabinSlice.actions;
export default cabinSlice.reducer;
