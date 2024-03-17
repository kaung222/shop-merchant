import { PayloadAction, createSlice } from "@reduxjs/toolkit";
let initialState = {
  email: "",
};
export const emailSlice = createSlice({
  initialState,
  name: "AddToCart",
  reducers: {
    storeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});
export const { storeEmail } = emailSlice.actions;
export default emailSlice.reducer;
