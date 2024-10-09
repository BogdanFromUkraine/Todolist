import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function AddNotesToGroup(
  title,
  description,
  photoCode,
  groupId,
) {
  try {
    const jwtToken = localStorage.getItem("token");

    const response = await axios.post(
      data.localhost + `Group/AddNotesToGroup/${groupId}`,
      {
        Title: title,
        Description: description,
        PhotoCode: photoCode,
      },
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
