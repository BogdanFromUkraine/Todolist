import axios from "axios"

export default async function RemoveNote(id) 
{
   const Id = id;
   
   try {
      const response = await axios.delete("https://localhost:7278/api/Notes", 
      {
         params: {Id}
      })
      return response;
   } catch (error) {
      console.log(error);
   }
   return null;
}