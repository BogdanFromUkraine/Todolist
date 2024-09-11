import axios from "axios"
import data from "../dataJSON/data.json"

export default async function UpdateNote(id) 
{
   
   try {
      const jwtToken = await localStorage.getItem('token');
      const response = await axios.put( data.localhost + "Notes", id, 
      {
         headers: 
         {
            'Authorization': `Bearer ${jwtToken}`,// Додаємо токен у заголовок
            'Content-Type': 'application/json'
         }
     })
      return response;
   } catch (error) {
      console.log(error);
   }
   return null;
}