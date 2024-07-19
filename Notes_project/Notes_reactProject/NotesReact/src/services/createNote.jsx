import axios from "axios"

export default async function CreateNote(title, description) 
{
   
   try {
      const response = await axios.post("https://localhost:7278/api/Notes/Create",
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