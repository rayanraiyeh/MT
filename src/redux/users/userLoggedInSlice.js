import { createSlice } from "@reduxjs/toolkit";

export const userLoggedInSlice = createSlice({
    name: "userLoggedInSlice",
    initialState: {
        userLoggedIn: false,
        usersData: [
            { name: "User1", password: "MontyMobile23", role: "admin" },
            { name: "User2", password: "MontyMobilePass", role: "monitor" },
            { name: "User3", password: "Password", role: "user" },
            { name: "User4", password: "Password", role: "user" },
            { name: "User5", password: "Password", role: "user" },

        ]
    },
    reducers: {
        setUsersData: (state, action) => {
            state.usersData = action.payload
        },
        setUserLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload
        },
    },
});

export const { setUserLoggedIn, setUsersData } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;
