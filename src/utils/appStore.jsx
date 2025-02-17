import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import couponReducer from "./couponSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    coupon: couponReducer,
    user: userReducer,
  },
});

export default appStore;
