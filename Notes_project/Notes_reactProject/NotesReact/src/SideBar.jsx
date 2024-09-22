import { observer } from "mobx-react-lite";
import { useStores } from "../store/root-store-context"
import styles from "./styles/sideBar.module.css"

export const SideBar = observer(({setGroupId}) => 
{
    const {groups, get_Notes_From_Group} = useStores();

    async function handleClick(id) 
    {
        await get_Notes_From_Group(id);
        setGroupId(id);
    }

    return  <div className={styles.sidebar}>
    <ul>
        {
            groups.map(i => 
                {
                    return <li>
                            <a onClick={() => handleClick(i.groupId)} key={i.id} href="#">{i.name}</a>
                    </li>
                    
                })
        }
        <a className={styles.button_link}>Create Group</a>
    </ul>
</div>
})