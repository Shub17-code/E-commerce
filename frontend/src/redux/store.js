import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminUserReducer from "./slices/admin/adminUserSlice";
import adminProductReducer from "./slices/admin/adminProductSlice";
import adminOrderReducer from "./slices/admin/adminOrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    adminUser: adminUserReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
  },
});

export default store;
