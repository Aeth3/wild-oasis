import { configureStore } from "@reduxjs/toolkit";
import cabinReducer from "./features/cabins/cabinSlice";
const store = configureStore({ reducer: { cabin: cabinReducer } });
export default store;
