import data from "../../dataJSON/data.json";
import axios from "axios";

export default async function RegisterUser(userName, email, password) {
  try {
    const response = await axios.post(data.localhost + "User/Register", {
      UserName: userName,
      Email: email,
      Password: password,
    });

    setSuccess("Реєстрація успішна! Ви можете увійти.");
    return response;
  } catch (error) {
    setError("Помилка реєстрації. Спробуйте знову.");
    setSuccess("");
  }
}
