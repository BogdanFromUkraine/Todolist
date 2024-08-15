import axios from "axios"
import data from "../dataJSON/data.json"

export default async function CreateNote(title, description, photoCode) 
{
   
   try {
      const response = await axios.post(data.localhost + "Notes/Create",
      {
         Title: title,
         Description: description,
         PhotoCode: photoCode
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