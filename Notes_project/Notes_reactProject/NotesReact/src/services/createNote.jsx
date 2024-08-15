import axios from "axios"
import data from "../data.json"

export default async function CreateNote(title, description) 
{
   
   try {
      const response = await axios.post(data.localhost + "Notes/Create",
      {
         Title: title,
         Description: description
      }, 
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