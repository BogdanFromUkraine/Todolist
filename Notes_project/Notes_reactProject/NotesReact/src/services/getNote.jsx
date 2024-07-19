import axios from "axios"

export default async function GetNote() 
{
   const Id = 1;
   
   try {
      const response = await axios.get("https://localhost:7278/api/Notes/ReciveNote", 
      {
         params: {Id}
      })
      return response;
   } catch (error) {
      console.log(error);
   }
   return null;
}