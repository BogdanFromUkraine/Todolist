import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateNote from "./services/createNote"
import {motion} from "framer-motion"
import styles from "./createPage.module.css"



export default function CreateNotePage({pointer})
{
 const [title, setTitle] = useState();
 const [description, setDescription] = useState();

async function handleClick() 
{
    const response = await CreateNote(title, description);
    pointer(true);
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
}