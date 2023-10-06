import { onAuthStateChanged } from 'firebase/auth';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase/firebase';

// Creating a context
export const StateContext = createContext<any>({});

// Exporting the context to use in files
export const useStateContext =()=>useContext(StateContext);

// Building a react component to wrap the whole children which tends to use 
// the values
export const ContextProvider = ({children}:{children:ReactNode}) => {

    const [currentUser,setCurrentUser] = useState<any>({});
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
        });
        return ()=> unsubscribe();
    },[]);


  return (
    <StateContext.Provider value={{
        currentUser
    }}>
        {children}
    </StateContext.Provider>
  )
}



