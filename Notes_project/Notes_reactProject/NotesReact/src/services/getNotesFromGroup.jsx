import axios from "axios"
import data from "../dataJSON/data.json"

export default async function GetNotesFromGroup(groupId) 
{
   try {
      const jwtToken = await localStorage.getItem('token');
      const response = await axios.get(data.localhost + `Group/GetNotesFromGroup/${groupId}`, {
         headers: {
            'Content-Type' : 'application/json',
           'Authorization': `Bearer ${jwtToken}`,
 }})

      const sortedList = [...response.data].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

      return sortedList;
      
   } catch (error) {
      console.log(error);
   }
   return null;
}