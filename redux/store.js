import { configureStore } from "@reduxjs/toolkit";
import uidReducer from "./uidSlice";

export const store = configureStore({
    reducer: {
        uid: uidReducer,
    },
});