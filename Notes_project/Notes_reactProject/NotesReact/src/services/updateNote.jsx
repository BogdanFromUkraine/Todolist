import axios from "axios"

export default async function UpdateNote(id) 
{
   
   try {
      const response = await axios.put("https://localhost:7278/api/Notes", id, 
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