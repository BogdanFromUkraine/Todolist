import axios from "axios"
import data from "../dataJSON/data.json"

export default async function GetAllNotes() 
{
   
   try {
      const response = await axios.get(data.localhost + "Notes/GetAllNotes")
      const sortedList = [...response.data].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
      return sortedList;
   } catch (error) {
      console.log(error);
   }
   return null;
}