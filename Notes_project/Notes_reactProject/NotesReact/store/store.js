import {makeAutoObservable} from "mobx"
import CreateNote from "../src/services/createNote"
import GetAllNotes from "../src/services/getAllNotes";
import RemoveNote from "../src/services/removeNote";
import UpdateNote from "../src/services/updateNote";
import RegisterUser from "../src/services/registerUser";
import LoginUser from "../src/services/loginUser";

class DataStore 
{
    constructor() 
    {
        makeAutoObservable(this);
    }

    notess = [];
    isNoteChanged = false;
    user = {};


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

    register_User = async (userName, email, password) => 
        {
            try {
                const response = await RegisterUser(userName, email, password);
                this.user = response;
            } catch (error) {
                
            }
        }
    login_User = async (email, password) => 
        {
            try {
                const response = await LoginUser(email, password);
            } catch (error) {
                
            }
        }
}

export default DataStore;