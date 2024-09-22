import { useEffect } from "react"
import GetAllUsers from "./services/getAllUsers";
import { useStores } from '../store/root-store-context';
import styles from '../src/styles/people.module.css'
import { observer } from "mobx-react-lite";

export const People = observer(() => 
{
    const {get_AllUsers, users, user} = useStores();
    useEffect(() => 
        {
            async function getAllUser()  
                {
                     await get_AllUsers();
                     console.log(await users);
                     
                    // console.log(await GetAllUsers());
                }
                getAllUser();
        })
    return <div>
                People
                <div >
                    {
                        users.map((e) => 
                            {
                                return <div key={e.id}>
                                         <div>UserName: {e.userName}</div>
                                         <div>Email: {e.email}</div>
                                         <div>
                                            <img src={e.userPhoto} className={styles.user_photo} />
                                         </div>
                                </div>
                               
                            })
                    }
                </div>
          </div>
})