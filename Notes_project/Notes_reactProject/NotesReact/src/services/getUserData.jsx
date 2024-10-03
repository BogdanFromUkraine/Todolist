import data from "../dataJSON/data.json"
import axios from "axios";


export default async function GetUserData() 
{
    try {
      const jwtToken =  localStorage.getItem('token');
        const response = await axios.get(data.localhost + "User/GetUserData", {
          headers: {
            'Authorization': `Bearer ${jwtToken}` // Додаємо токен у заголовок
          }});

        return response.data;
      } catch (error) {
      }
}