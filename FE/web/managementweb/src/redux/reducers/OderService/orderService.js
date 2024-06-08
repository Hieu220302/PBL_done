import { createSlice } from "@reduxjs/toolkit";
import getOrderState from "../../../api/OderService/getOrderState";
const initialState = {
  dataOrder: [],
  loadingCart: false,
  errorCart: null,
};

const listOrderSlice = createSlice({
  name: "listOrderReducer",
  initialState,
  reducers: {
    listOrderRequest: (state) => {
      state.loadingCart = true;
      state.errorCart = null;
    },
    listOrderSuccess: (state, action) => {
      state.dataOrder = action.payload.data;
      state.loadingCart = false;
    },

    listOrderFailure: (state, action) => {
      state.loadingCart = false;
      state.errorCart = action.payload.error;
    },
    resetStateListOrder: (state) => {
      state.dataOrder = null;
      state.loadingCart = false;
      state.errorCart = null;
    },
  },
});

export const listOrder = () => async (dispatch, getState) => {
  try {
    dispatch(listOrderRequest());

    const data = await getOrderState();
    dispatch(listOrderSuccess({ data: data }));
  } catch (error) {
    let errorMessage = "Error fetching data";

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
  }
};

export const {
  listOrderRequest,
  listOrderSuccess,
  listOrderFailure,
  resetStateListOrder,
} = listOrderSlice.actions;
export default listOrderSlice.reducer;
