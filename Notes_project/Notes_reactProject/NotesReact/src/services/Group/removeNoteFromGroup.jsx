import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function RemoveNoteFromGroup(groupId, id) {
  const noteId = id;

  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.delete(
      data.localhost + `Group/DeleteNoteFromGroup/${groupId}/${noteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
