import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function GetAllNotes() {
  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.get(data.localhost + "Notes/GetAllNotes", {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
      },
    });
    const sortedList = [...response.data].sort(
      (a, b) => Number(a.isCompleted) - Number(b.isCompleted),
    );
    return sortedList;
  } catch (error) {
    console.log(error);
  }
  return null;
}
