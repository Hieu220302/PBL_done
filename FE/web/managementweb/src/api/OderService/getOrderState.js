import axios from "axios";
import { urlAPI } from "../apiAddress";

const getOrderState = async () => {
  try {
    const response = await axios.get(urlAPI + "orderService/getAllState");
    return response.data;
  } catch (error) {
    console.log("error sign in" + error.message);
  }
};

export default getOrderState;
