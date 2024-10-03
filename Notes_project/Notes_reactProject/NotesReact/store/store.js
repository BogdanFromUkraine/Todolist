import {makeAutoObservable} from "mobx"
import CreateNote from "../src/services/createNote"
import GetAllNotes from "../src/services/getAllNotes";
import RemoveNote from "../src/services/removeNote";
import UpdateNote from "../src/services/updateNote";
import RegisterUser from "../src/services/registerUser";
import LoginUser from "../src/services/loginUser";
import GetUserData from "../src/services/getUserData";
import UploadUserPhoto from "../src/services/uploadUserPhoto";
import GetAllUsers from "../src/services/getAllUsers";
import GetAllGroups from "../src/services/getAllGroups";
import GetNotesFromGroup from "../src/services/getNotesFromGroup";
import AddNotesToGroup from "../src/services/addNotesToGroup";
import RemoveNoteFromGroup from "../src/services/removeNoteFromGroup";
import UpdateNoteFromGroup from "../src/services/updateNoteFromGroup";
import AddUserToGroupFunction from "../src/services/addUserToGroup";
import GetGroupData from "../src/services/getGroupData";
import RemoveUserFromGroup from "../src/services/removeUserFromGroup";
import getUserRole from "../src/services/getUserRole";

class DataStore 
{
    constructor() 
    {
        makeAutoObservable(this);
    }

    notess = [];
    isNoteChanged = false;
    user = {};
    users = [];
    groups = [];
    notesOfGroup = [];
    isCreated = "";
    groupData = {};
    userRole = [];

    get_User_Role = async () => 
        {
            try {
               this.userRole = await getUserRole();
            } catch (error) {
                
            }
        }

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

    get_AllUsers = async () => 
        {
            try {
                const response = await GetAllUsers();
                this.users = response
            } catch (error) {
                
            }
        }

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

    get_User_Data = async () => 
        {
            try {
                const response = await GetUserData();
                this.user = response;
            } catch (error) {
                
            }
        }
    upload_User_Photo = async (userPhoto) => 
        {
            try {
                await UploadUserPhoto(userPhoto);
                this.get_User_Data();
            } catch (error) {
                
            }
        }
    get_All_Group = async () => 
        {
            try {
                const response =  await GetAllGroups();
                this.groups = response;
            } catch (error) {
                
            }
        }
    get_Notes_From_Group = async (groupId) => 
        {
            try {
                const response = await GetNotesFromGroup(groupId);
                this.notesOfGroup = response;
            } catch (error) {
                
            }
        }
    add_Notes_To_Group = async (title, description, photoCode, groupId) => 
        {
            try {
                const response = await AddNotesToGroup(title, description, photoCode, groupId);
                this.get_Notes_From_Group(groupId);
            } catch (error) {
                
            }
        }
    remove_Note_From_Group = async (groupId, noteId) => 
        {
            await RemoveNoteFromGroup(groupId, noteId);
            this.get_Notes_From_Group(groupId);
        }
    update_Note_From_Group = async (groupId, noteId) => 
        {
            await UpdateNoteFromGroup(groupId, noteId);
            this.get_Notes_From_Group(groupId);
        }
    add_User_To_Group = async (groupId, userId) => 
        {
            await AddUserToGroupFunction(groupId, userId);
        }
    get_Group_Data = async (groupId) => 
        {
            const response = await GetGroupData(groupId);
            this.groupData = response;
        }
    remove_User_From_Group = async (groupId, userId) => 
        {
            await RemoveUserFromGroup(groupId, userId);
            this.get_Group_Data(groupId);
        }
}

export default DataStore;