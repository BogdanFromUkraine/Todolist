import axios from "axios"
import data from "../data.json"

export default async function RemoveNote(id) 
{
   const Id = id;
   
   try {
      const response = await axios.delete( data.localhost + "Notes", 
      {
         params: {Id}
      })
      return response;
   } catch (error) {
      console.log(error);
   }
   return null;
}