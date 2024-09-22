import axios from "axios"
import data from "../dataJSON/data.json"

export default async function GetAllGroups() 
{
   
   try {
      const jwtToken = await localStorage.getItem('token');
      const response = await axios.get(data.localhost + "Group/GetAllGroup", {
         headers: {
           'Authorization': `Bearer ${jwtToken}` // Додаємо токен у заголовок
         }})

      return response.data;
   } catch (error) {
      console.log(error);
   }
   return null;
}