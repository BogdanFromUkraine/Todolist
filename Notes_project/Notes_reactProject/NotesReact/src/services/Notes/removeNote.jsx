import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function RemoveNote(id) {
  const Id = id;

  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.delete(data.localhost + `Notes/${Id}`, {
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
