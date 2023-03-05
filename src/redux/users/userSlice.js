import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    usersList: [
      { firstName: "Talin", lastName: "Adra", nationality: "Lebanon", phoneNumber: "+96170111111", lastMonthBill: "524$", additionAddress: "Beyrouth", age: "32", "OfServicesSubscribe": "3" },
      { firstName: "Fadi", lastName: "Hayek", nationality: "Lebanon", phoneNumber: "+96170222222", lastMonthBill: "322$", additionAddress: "Beyrouth", age: "42", "OfServicesSubscribe": "5" },
    ],
    addUser: { firstName: "", lastName: "", nationality: "", phoneNumber: "+", lastMonthBill: "", additionAddress: "", age: "", "OfServicesSubscribe": "" },
    isShowUserDataModal: false,
    rowData: {}
  },
  reducers: {
    setListUsers: (state, action) => {
      state.usersList = [...action.payload];
    },
    setAddUser: (state, action) => {
      let newUser = {}
      state.addUser = { ...action.payload };
      Object.keys(state.addUser).forEach((item) => {
        if (item !== "tableData") {
          newUser = { ...newUser, [item]: state.addUser[item] }
        }
      })
      state.usersList = [...state.usersList, { ...newUser }];

    },
    setShowUserDataModal: (state, action) => {
      state.isShowUserDataModal = action.payload.selected;
      state.rowData = action.payload.rowData

    },

  },
});

export const { setListUsers, setAddUser, setShowUserDataModal } = userSlice.actions;
export default userSlice.reducer;
