import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import couponReducer from "./couponSlice";
import notificationReducer from "./notificationSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    coupon: couponReducer,
    notification: notificationReducer,
  },
});

export default appStore;
