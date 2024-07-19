import { useEffect, useState } from 'react'
import './App.css'
import GetAllNotes from './services/getAllNotes';
import Cards from './Cards';
import CreateNotePage from './CreateNotePage';
import styles from "./main.module.css"


function App() {
  const [notes, setNotes] = useState([{id: null, title: null, description: null, isCompleted: null}]);
  const [pointer, setPointer] = useState(false);
  useEffect(()=>
    {
      async function foo() 
      {

        console.log(await GetAllNotes());
        setNotes(await GetAllNotes());
      }
      foo();
      setPointer(false);
  
    },[pointer])
  return (
   <>
   <main className={styles}>
    <div className={styles.createNotePage}>
    <CreateNotePage  pointer={setPointer}/>
    </div>
    <div className={styles.card}>
    <Cards notes={notes} pointer={setPointer} setNotes={setNotes} setPointer={setPointer}/>
    </div>
   </main>
    </>
  )
}

export default App
