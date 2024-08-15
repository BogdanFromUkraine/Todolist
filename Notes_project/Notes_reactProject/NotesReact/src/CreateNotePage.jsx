import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateNote from "./services/createNote"
import {motion} from "framer-motion"
import styles from "./styles/createPage.module.css"
import { useStores } from "../store/root-store-context";
import { observer } from "mobx-react-lite";



export const CreateNotePage = observer(() =>
{
 const [title, setTitle] = useState();
 const [description, setDescription] = useState();
 const [photoCode, setPhotoCode] = useState();

 const {create_Note} = useStores();

async function handleClick() 
{
    create_Note(title, description, photoCode);
}

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

const pVariants = {
    hidden:  {
        x: -1000,
        opacity: 0

    },
    visible: {
            x: 0,
            opacity: 1
        }
};


    return <>
    <motion.div 
    variants={pVariants}
    initial="hidden"
    animate="visible"
    transition={{duration: 1}}
    className={styles.box}>
    <Input 
    placeholder="Enter title"
    onChange={e => setTitle(e.target.value)}
    className={styles.input}/>
    
    <Input
    placeholder="Enter description"
    onChange={e => setDescription(e.target.value)}
    className={styles.input}/>

    <Input
    accept="image/*"
    type="file"
    onChange={e => uploadPhoto(e)}/>

    <img src={photoCode} />
    
    <motion.button
     whileHover={{
         scale: 1.5,
         background: "aqua",
         color: "tomato"
     }}
    onClick={handleClick}>
        Create Note
    </motion.button>

    </motion.div>
   
  
    </>
})