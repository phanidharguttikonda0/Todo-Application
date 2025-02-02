import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const usernameContext = React.createContext() ;
export const setUsernameContext = React.createContext() ;
export default function Home(){
    const [username, setUsername] = useState(localStorage.getItem("username")) ;
    const navigate = useNavigate() ;

    useEffect(() => {
        console.log(!username)
        if(!username){
            navigate('/authentication')
        } 
    }, [username]) ;

    return <usernameContext.Provider value={username}>
        <setUsernameContext.Provider value={setUsername}>
            <div>
                Welcome to home page
            </div>
        </setUsernameContext.Provider>
    </usernameContext.Provider>
}