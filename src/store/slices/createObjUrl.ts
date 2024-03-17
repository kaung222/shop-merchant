import { PayloadAction, createSlice } from "@reduxjs/toolkit";
let initialState: { imageUrls: string[] } = {
  imageUrls: [],
};
export const CreateObjUrlSlice = createSlice({
  initialState,
  name: "AddToCart",
  reducers: {
    setPreviewUrls: (state, action: PayloadAction<string>) => {
      const isExist = state.imageUrls.find((url) => url === action.payload);
      if (!isExist) {
        state.imageUrls = [action.payload, ...state.imageUrls];
      }
    },
    emptyUrls: (state, action: PayloadAction<string>) => {
      state.imageUrls = [];
    },
  },
});
export const { setPreviewUrls, emptyUrls } = CreateObjUrlSlice.actions;
export default CreateObjUrlSlice.reducer;
