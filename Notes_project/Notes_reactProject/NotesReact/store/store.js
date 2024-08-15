import {makeAutoObservable} from "mobx"
import CreateNote from "../src/services/createNote"
import GetAllNotes from "../src/services/getAllNotes";
import RemoveNote from "../src/services/removeNote";
import UpdateNote from "../src/services/updateNote";

class DataStore 
{
    constructor() 
    {
        makeAutoObservable(this);
    }

    notess = [];
    isNoteChanged = false;


    create_Note = async (title, description, photoCode) => 
        {
            try {
                await CreateNote(title, description, photoCode);
            this.get_AllNotes();
            } catch (error) {
                
            }
            
        };
    
    get_AllNotes = async () => 
        {
            try {
                const result = await GetAllNotes();
                this.notess = result;

                
            } catch (error) {
                console.log(error);
            }
            
           
        };

    // get_Note = async () => 
    //     {

    //     };
    
    remove_Note = async (id) => 
        {
            try {
                await RemoveNote(id);
                this.get_AllNotes();
                
            } catch (error) {
                
            }
            
        };

    update_Note = async (id) => 
        {
            try {
                await UpdateNote(id);
                this.get_AllNotes();
            } catch (error) {
                
            }
            
        };


}

export default DataStore;