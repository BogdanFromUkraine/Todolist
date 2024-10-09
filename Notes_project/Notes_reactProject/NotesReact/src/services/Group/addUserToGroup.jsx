import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function AddUserToGroupFunction(groupId, userId) {
  try {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.post(
      data.localhost + `Group/AddUserToGroup/${groupId}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Додаємо токен у заголовок
        },
      },
    );

    if (response.status == 200) {
      return "Ok";
    }

    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
