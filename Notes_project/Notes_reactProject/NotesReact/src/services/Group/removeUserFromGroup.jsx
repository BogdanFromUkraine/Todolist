import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function RemoveUserFromGroup(groupId, id) {
  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.delete(
      data.localhost + `Group/DeleteUserFromGroup/${groupId}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
