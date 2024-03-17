import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import modeSlice from "./slices/modeSlice";
import emailSlice from "./slices/emailSlice";
import CreateObjUrlSlice from "./slices/createObjUrl";
export const store = configureStore({
  reducer: {
    mode: modeSlice,
    productsInCart: cartSlice,
    email: emailSlice,
    previewUrls: CreateObjUrlSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
