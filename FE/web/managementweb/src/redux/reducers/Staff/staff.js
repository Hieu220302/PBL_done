import { createSlice } from "@reduxjs/toolkit";
import getAllStaff from "../../../api/Staff/getAllStaff";
const initialState = {
  dataStaff: [],
  loadingCart: false,
  errorCart: null,
};

const listStaffSlice = createSlice({
  name: "listStaffReducer",
  initialState,
  reducers: {
    listStaffRequest: (state) => {
      state.loadingCart = true;
      state.errorCart = null;
    },
    listStaffSuccess: (state, action) => {
      state.dataStaff = action.payload.data;
      state.loadingCart = false;
    },

    listStaffFailure: (state, action) => {
      state.loadingCart = false;
      state.errorCart = action.payload.error;
    },
    resetStateListStaff: (state) => {
      state.dataStaff = null;
      state.loadingCart = false;
      state.errorCart = null;
    },
  },
});

export const listStaff = () => async (dispatch, getState) => {
  try {
    dispatch(listStaffRequest());

    const data = await getAllStaff();
    dispatch(listStaffSuccess({ data: data }));
  } catch (error) {
    let errorMessage = "Error fetching data";

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
  }
};

export const {
  listStaffRequest,
  listStaffSuccess,
  listStaffFailure,
  resetStateListStaff,
} = listStaffSlice.actions;
export default listStaffSlice.reducer;
