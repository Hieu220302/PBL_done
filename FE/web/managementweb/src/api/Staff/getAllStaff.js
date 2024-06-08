import axios from "axios";
import { urlAPI } from "../apiAddress";

const getAllStaff = async () => {
  try {
    const response = await axios.get(urlAPI + "staff");
    return response.data;
  } catch (error) {
    console.log("error sign in" + error.message);
  }
};

export default getAllStaff;
