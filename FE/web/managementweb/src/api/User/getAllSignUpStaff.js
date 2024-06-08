import axios from "axios";
import { urlAPI } from "../apiAddress";

const getAllSignUpStaff = async () => {
  try {
    const response = await axios.get(urlAPI + "users/getAllSignUpStaff");
    return response.data;
  } catch (error) {
    console.log("error sign in" + error.message);
  }
};

export default getAllSignUpStaff;
