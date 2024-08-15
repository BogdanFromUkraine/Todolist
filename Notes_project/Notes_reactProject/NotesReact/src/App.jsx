import { useEffect, useState } from 'react'
import './styles/App.css'
import GetAllNotes from './services/getAllNotes';
import {Cards} from './Cards';
import {CreateNotePage} from './CreateNotePage';
import styles from "./styles/main.module.css"
import { observer } from "mobx-react-lite";
import { useStores } from '../store/root-store-context';
import Navbar from './Navbar';



// function App() {
//   const [notes, setNotes] = useState([{id: null, title: null, description: null, isCompleted: null}]);
//   const [pointer, setPointer] = useState(false);

//    //const {notesSSSSS} = useStores();
//   // console.log(notesSSSSS);

  

//   useEffect(()=>
//     {
//       async function foo() 
//       {

//         console.log(await GetAllNotes());
//         setNotes(await GetAllNotes());
//       }
//       foo();
//       setPointer(false);
  
//     },[pointer])
//   return (
//    <>
//    <main className={styles}>
//     <div className={styles.createNotePage}>
//     <CreateNotePage  pointer={setPointer}/>
//     </div>
//     <div className={styles.card}>
//     <Cards notes={notes} pointer={setPointer} setNotes={setNotes} setPointer={setPointer}/>
//     </div>
//    </main>
//     </>
//   )
// }

export const App = observer(()=>
  {
  const {get_AllNotes, notess} = useStores();

  useEffect(()=>
    {
      async function foo() 
      {
        await get_AllNotes();
      }
      foo();
  
    },[])
    
  return (
   <>
   <Navbar/>
   <main className={styles}>
    <div className={styles.createNotePage}>
    <CreateNotePage/>
    </div>
    <div className={styles.card}>
    <Cards notes={notess} />
    </div>
   </main>
   <footer>FOOTER</footer>
    </>
)})

 //export default App
