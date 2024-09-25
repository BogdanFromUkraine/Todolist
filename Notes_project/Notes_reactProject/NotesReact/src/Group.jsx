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

    const {get_All_Group, notesOfGroup, groupData} = useStores();

    useEffect(() => 
        {
            async function getAllGroups() 
            {
                await get_All_Group();
            }
            getAllGroups();
        }, [])

    return <>
      <AddPeopleToGroup groupId={groupId}/>
      <div className={styles.main}>
        <SideBar setGroupId={setGroupId}/>
        <div>
            <CardsGroup notes={notesOfGroup} groupId={groupId}/>
        </div>
        <div>
            <CreateNotePageGroup groupId={groupId} />
        </div>
    </div>
    </>
})