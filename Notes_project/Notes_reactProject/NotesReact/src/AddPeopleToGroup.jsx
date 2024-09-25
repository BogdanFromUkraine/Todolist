import { observer } from "mobx-react-lite";
import { useStores } from "../store/root-store-context";
import { useEffect } from "react";

export const AddPeopleToGroup = observer(({groupId}) => 
    {
        const {get_AllUsers, users, add_User_To_Group, get_Group_Data, groupData} = useStores();

        useEffect(()=>
            {
                 const getUsers = async () => 
                    {
                        await get_AllUsers();
                        await get_Group_Data(groupId);    
                    }
                    getUsers();

            }, [groupId])

        async function selectUser() 
        {
            const select = document.getElementById('user-select');
            const selectedValue = select.value;
            await add_User_To_Group(groupId, selectedValue);
        }

        return <div>
            <select id="user-select" onChange={selectUser}>
                {users.map(i => 
                    {
                        return <option value={i.id}>{i.userName}</option>
                    })}
            </select>
    <button>Add User to Group</button>
    {/* <div>
        <select id="users-group">
                    {
                        groupData.users.map(i => 
                            {
                                return <option>{i.userName}</option>
                            })

                    }
        </select>            
        {console.log(groupData)}
    </div> */}
    <div>
        Number of Notes: {groupData.numberOfNotes}
        Users of Group:
        <select id="users-group">
                    {
                        groupData.users.map(i => 
                            {
                                return <option>{i}</option>
                            })

                    }
        </select>       
        
      </div>
        </div>
    })