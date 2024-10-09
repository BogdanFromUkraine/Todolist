import axios from "axios";
import data from "../../dataJSON/data.json";

export default async function GetNote() {
  const Id = 1;

  try {
    const response = await axios.get(data.localhost + "Notes", {
      params: { Id },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
