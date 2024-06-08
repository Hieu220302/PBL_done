import { createSlice } from "@reduxjs/toolkit";
import getAllOrder from "../../../api/OderService/getAllOrder";
const initialState = {
  dataAllOrder: [],
  loadingCart: false,
  errorCart: null,
};

const listAllOrderSlice = createSlice({
  name: "listAllOrderReducer",
  initialState,
  reducers: {
    listAllOrderRequest: (state) => {
      state.loadingCart = true;
      state.errorCart = null;
    },
    listAllOrderSuccess: (state, action) => {
      state.dataAllOrder = action.payload.data;
      state.loadingCart = false;
    },

    listAllOrderFailure: (state, action) => {
      state.loadingCart = false;
      state.errorCart = action.payload.error;
    },
    resetStateListAllOrder: (state) => {
      state.dataAllOrder = null;
      state.loadingCart = false;
      state.errorCart = null;
    },
  },
});

export const listAllOrder = () => async (dispatch, getState) => {
  try {
    dispatch(listAllOrderRequest());

    const data = await getAllOrder();
    dispatch(listAllOrderSuccess({ data: data }));
  } catch (error) {
    let errorMessage = "Error fetching data";

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
  }
};

export const {
  listAllOrderRequest,
  listAllOrderSuccess,
  listAllOrderFailure,
  resetStateListAllOrder,
} = listAllOrderSlice.actions;
export default listAllOrderSlice.reducer;
