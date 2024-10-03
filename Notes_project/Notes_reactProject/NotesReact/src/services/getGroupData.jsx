import axios from "axios"
import data from "../dataJSON/data.json"

export default async function GetGroupData(groupId) 
{
   
   try {
      const jwtToken =  localStorage.getItem('token');
      const response = await axios.get(data.localhost + `Group/GetGroupData/${groupId}`, {
         headers: {
           'Authorization': `Bearer ${jwtToken}` // Додаємо токен у заголовок
         }})

      return response.data;
   } catch (error) {
      console.log(error);
   }
   return null;
}