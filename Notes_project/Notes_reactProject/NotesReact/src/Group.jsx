import {SideBar} from "./SideBar";
import { useStores } from "../store/root-store-context"
import { useEffect, useState } from "react";
import styles from "./styles/group.module.css"
import { Card } from "@chakra-ui/react";
import { Cards } from "./Cards";
import { observer } from "mobx-react-lite";
import { CreateNotePage } from "./CreateNotePage";
import { CreateNotePageGroup } from "./CreateNotePageGroup";
import { CardsGroup } from "./CardsGroup";
import { AddPeopleToGroup } from "./AddPeopleToGroup";

export const Group = observer(() => 
{
    const [groupId, setGroupId] = useState();

    const {get_All_Group, notesOfGroup, userRole} = useStores();

    useEffect(() => 
        {
            async function getAllGroups() 
            {
                await get_All_Group();
            }
            getAllGroups();
            console.log(userRole);
        }, [])
    


    return <>
     <div className={styles.main}>
        <div>
        <SideBar setGroupId={setGroupId} className={styles.sidebar} />
        </div>
        <div>
        <CardsGroup notes={notesOfGroup} groupId={groupId} className={styles.cardsGroup} />
        </div>
        <div className={styles.information}>
        <CreateNotePageGroup groupId={groupId} className={styles.createNote} />
        {userRole === "Admin" ? 
            <AddPeopleToGroup groupId={groupId} className={styles.addPeople} />
         : <div></div> }
         </div>
      </div>
    </>
})