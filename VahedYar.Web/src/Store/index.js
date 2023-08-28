import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import modalSlice from "./modal-slice";
import courseSlice from "./course-slice";
import timeTableSlice from "./timeTable-slice";
import { apiSlice } from "../feratures/api/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        modal: modalSlice.reducer,
        course: courseSlice.reducer,
        timeTable: timeTableSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;