import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function UpdateNote(id) {
  try {
    const Id = id;
    const jwtToken = localStorage.getItem("token");
    const response = await axios.put(data.localhost + `Notes`, Id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
