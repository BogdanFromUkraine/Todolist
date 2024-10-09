import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function GetAllUsers() {
  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.get(data.localhost + "User", {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
  return null;
}
