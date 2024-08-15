import axios from "axios"
import data from "../data.json"

export default async function UpdateNote(id) 
{
   
   try {
      const response = await axios.put( data.localhost + "Notes", id, 
      {
         headers: 
         {
             "Content-Type": "application/json"
         }
     })
      return response;
   } catch (error) {
      console.log(error);
   }
   return null;
}