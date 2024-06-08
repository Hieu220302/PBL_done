import axios from "axios";
import { urlAPI } from "../apiAddress";

const updateRoleAndAddStaff = async (id_service, userId) => {
  try {
    const response = await axios.put(urlAPI + "users/updateRoleAndAddStaff", {
      id_service: id_service,
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.log("error sign in" + error.message);
  }
};

export default updateRoleAndAddStaff;
