import { Card, CardHeader, CardBody, Heading, Text, Button, transition } from '@chakra-ui/react'
import RemoveNote from './services/removeNote';
import styles from "./card.module.css"
import UpdateNote from './services/updateNote';
import {delay, motion} from "framer-motion"
import Lottie from "lottie-react"
import animationData from "./animation/Animation - 1721404943767.json"
import { useState } from 'react';


export default function Cards({notes, pointer, setNotes})
{
  const [deletingItem, setDeletingItem] = useState(null);
function handleDelete(id) 
{
  notes.map((e) => 
    {
      if(e.id === id) 
        {

          setDeletingItem(e.id);
          //показ анімації протягом якогось часу
          setTimeout(()=>{
            setDeletingItem(null);
          },6000)

          //видалення елемента
          setTimeout(() => {
            RemoveNote(e.id);
            pointer(true);
          }, 5000)
          
        }
      
    })
   
}

function handleClick(id) 
{
  UpdateNote(id);
  pointer(true);
}
const listVariable = {
  visible: i => ({
    opacity: 1,
    transition: {
      delay: i * 0.5
    }
  }),
  hidden: {opacity: 0}
}


    return <>
    {notes !== null 
    ? (<>
      {notes.map((e, i) =>
      {
       return  <motion.li
       className={styles.card}
       variants={listVariable} 
       initial="hidden"
       animate="visible"
       custom={i}
       whileHover={{scale: 1.2}}
       whileTap={{
        opacity: 0,
        transition: {
          duration: 1
          }}}
>
      {e.id === deletingItem ? (<Lottie className={styles.lottie_container} animationData={animationData} />) : (   <Card key={e.id}
            className={e.isCompleted ? styles.cardCompleted : ""}>
        <CardHeader>
          <Heading size='md'>
            <span onClick={() => {handleClick(e.id)}} >
            {e.title}
            {e.isCompleted ? "1": "0"}
            </span>
            
            </Heading>
        </CardHeader>
        <CardBody>
        <Text pt='2' fontSize='sm'>
           {e.description}
          </Text>
          <Button  onClick={() => {handleDelete(e.id)}}>X</Button>
        </CardBody>
      </Card>)}

       </motion.li>
       
      
      })}</>) 
      : (<div>Помилка</div>)}
    </>

    

}