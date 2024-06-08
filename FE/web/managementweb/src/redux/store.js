import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import customer from "./reducers/User/customer";
import orderService from "./reducers/OderService/orderService";
import staff from "./reducers/Staff/staff";
import listAllOrder from "./reducers/OderService/allOrderService";

const rootReducer = combineReducers({
  listCustomer: customer,
  listOrder: orderService,
  listStaff: staff,
  listAllOrder: listAllOrder,
});
const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
