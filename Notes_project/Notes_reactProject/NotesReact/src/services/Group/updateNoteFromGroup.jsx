import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function UpdateNoteFromGroup(groupId, noteId) {
  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.put(
      data.localhost + `Group/${groupId}/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
