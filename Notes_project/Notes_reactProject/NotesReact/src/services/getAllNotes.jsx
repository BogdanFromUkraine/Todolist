import axios from "axios"

export default async function GetAllNotes() 
{
   
   try {
      const response = await axios.get("https://localhost:7278/api/Notes/GetAllNotes")
      const sortedList = [...response.data].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
      return sortedList;
   } catch (error) {
      console.log(error);
   }
   return null;
}