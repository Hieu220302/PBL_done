import axios from "axios";
import { urlAPI } from "../apiAddress";

const getAllOrder = async () => {
  try {
    const response = await axios.get(urlAPI + "orderService");
    return response.data;
  } catch (error) {
    console.log("error sign in" + error.message);
  }
};

export default getAllOrder;
