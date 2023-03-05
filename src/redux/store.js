
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import userLoggedInSlice from "./users/userLoggedInSlice";
import jobsDataSlice from "./users/jobsDataSlice";

export default configureStore({
    reducer: {
        userSlice: userSlice,
        userLoggedInSlice: userLoggedInSlice,
        jobsDataSlice: jobsDataSlice

    }
})
