import { useEffect, useState } from 'react'
import './styles/App.css'
import { observer } from "mobx-react-lite";
import { useStores } from '../store/root-store-context';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainPage from './MainPage';
import Group from './Group';
import People from './People';
import {User} from './User';
import Root from './Root';
import AuthorizationPage from './AuthorizationPage';

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

    const router = createBrowserRouter([
      {
        path: '/',
        element: <Root/>,
        children: [
          {
            path: '/',
            element: <MainPage notess={notess} />,
           errorElement: <div>404 Not Found</div>,
          },
          {
            path: 'Group',
            element: <Group/>,
           errorElement: <div>404 Not Found</div>,
          },
          {
            path: 'People',
            element: <People/>,
           errorElement: <div>404 Not Found</div>,
          },
          {
            path: 'User',
            element: <User/>,
           errorElement: <div>404 Not Found</div>,
          },
          {
            path: "Authorize",
            element: <AuthorizationPage/>,
            errorElement: <div>404 Not Found</div>,
          }
        ]
      },

    ])
    
  return (
   <>
   <RouterProvider router={router} >
   <Root/>
   <footer>FOOTER</footer>
   </RouterProvider>
    </>
)})

