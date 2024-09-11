import data from "../dataJSON/data.json"
import axios from "axios";

export default async function LoginUser(email, password) 
{
    try {
        const response = await axios.post(data.localhost + "User/Login", {
          Email : email,
          Password : password,
        });
  
        // Зберігаємо JWT токен у localStorage
        await localStorage.setItem('token', await response.data.result);

        alert('Вхід успішний!');
        window.location.href = "http://localhost:5173/"; // Перенаправлення на захищену сторінку
        return response;
      } catch (error) {
        setError('Помилка входу. Перевірте дані.');
      }
}