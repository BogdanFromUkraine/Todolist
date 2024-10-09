import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function CreateNote(title, description, photoCode) {
  try {
    const jwtToken = localStorage.getItem("token");

    const response = await axios.post(
      data.localhost + "Notes",
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
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
