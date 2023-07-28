import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import productFilterReducer from './features/products/productFilterSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    productFilter: productFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
