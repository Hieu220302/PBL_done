import { createSlice } from "@reduxjs/toolkit";
import getAllSignUpStaff from "../../../api/User/getAllSignUpStaff";
const initialState = {
  dataCustomer: [],
  loadingCart: false,
  errorCart: null,
};

const listCustomerSlice = createSlice({
  name: "listCustomerReducer",
  initialState,
  reducers: {
    listCustomerRequest: (state) => {
      state.loadingCart = true;
      state.errorCart = null;
    },
    listCustomerSuccess: (state, action) => {
      state.dataCustomer = action.payload.data;
      state.loadingCart = false;
    },

    listCustomerFailure: (state, action) => {
      state.loadingCart = false;
      state.errorCart = action.payload.error;
    },
    resetStateListCustomer: (state) => {
      state.dataCustomer = null;
      state.loadingCart = false;
      state.errorCart = null;
    },
  },
});

export const listCustomer = () => async (dispatch, getState) => {
  try {
    dispatch(listCustomerRequest());

    const data = await getAllSignUpStaff();
    dispatch(listCustomerSuccess({ data: data }));
  } catch (error) {
    let errorMessage = "Error fetching data";

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
  }
};

export const {
  listCustomerRequest,
  listCustomerSuccess,
  listCustomerFailure,
  resetStateListCustomer,
} = listCustomerSlice.actions;
export default listCustomerSlice.reducer;
