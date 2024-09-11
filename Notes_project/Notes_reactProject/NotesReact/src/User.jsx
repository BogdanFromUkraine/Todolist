import { useEffect, useState } from "react"
import GetUserData from "./services/getUserData";
import { useStores } from '../store/root-store-context';
import './styles/user.css'
import { observer } from "mobx-react-lite";

export const User = observer(() =>  
{
    const [photoCode, setPhotoCode] = useState();

    const {get_User_Data, upload_User_Photo, user} = useStores();

    useEffect(() => 
        {
            async function getUserData() 
            {
                await get_User_Data();
                console.log(312);
                
                console.log(await GetUserData());
            }
            getUserData();            
        }, [])

        async function uploadPhoto(e) 
{
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setPhotoCode(reader.result);
    };
    reader.onerror = error => {
        console.log("Error: ", error);
    };
    console.log(e);
}
    async function handleClick() 
    {
        await upload_User_Photo(photoCode);
    }
    return <div className="container">
 <div className="user-profile">
    <h1 className="user-title">User</h1>
    <div className="user-info">
        <div className="user-name">Name: {user.userName}</div>
        <div className="user-email">Email: {user.email}</div>
    </div>
    <input
        accept="image/*"
        type="file"
        onChange={e => uploadPhoto(e)}
        className="file-input"
    />
    <button onClick={handleClick} className="post-button">Post photo</button>
    <img src={user.userPhoto} className="user-photo" alt="User" />
</div>
    </div>
   
})