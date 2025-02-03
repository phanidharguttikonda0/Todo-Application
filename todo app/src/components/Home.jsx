import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Nav from "./Nav";
import SideNav from "./SideNav";
import axios from "axios";

export const CurrentTodosContext = React.createContext();
export const CompletedTodosContext = React.createContext();
export const SetCurrentTodosContext = React.createContext();
export const SetCompletedTodosContext = React.createContext();

export default function Home() {
    const [authorization, setAuthorization] = useState(localStorage.getItem("authorization"));
    const navigate = useNavigate();
    const [currentTodos, setCurrentTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        console.log(!authorization)
        if (!authorization) {
            navigate('/authentication')
        }
    }, [authorization]);


    useEffect(() => {

        const api = axios.create({
            baseURL: "http://localhost:9999"
        }) ;

        
        api.interceptors.response.use(
            (response) => response,
            (error) => {
              if (error.response && error.response.status === 403) {
                // Redirect to login or show a message
                console.log("hello guy's")
                localStorage.removeItem("authorization") ;
                navigate('/authentication') ;
              }
              return Promise.reject(error);
            }
          );



        axios.get("http://localhost:9999/current-todos", {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        }).then((result) => setCurrentTodos(result.data.value)).catch((err) => {
            if(err.status === 403){
                localStorage.removeItem("authorization")
                navigate('/authentication')
            }
        });


        

        axios.get("http://localhost:9999/completed-todos", {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        }).then((result) => {
            console.log("we have got it")
            setCompletedTodos(result.data.value)
        }).catch(err => {console.log(err)

            if(err.status === 403){
                localStorage.removeItem("authorization")
                navigate('/authentication')
            }

        });
    }, []); // execute only when component mounts not on re-renders


    

    return ( <CurrentTodosContext.Provider value={currentTodos}>
        <CompletedTodosContext.Provider value={completedTodos}>
            <SetCurrentTodosContext.Provider value={setCurrentTodos}>
                <SetCompletedTodosContext.Provider value={setCompletedTodos}>
                    <div className="flex-col items-start w-[100%] h-[100vh] bg-[#101926]">
                        <Nav />
                        <div className="flex justify-start items-center w-[100%] h-[95vh]">
                            <SideNav />
                            <div className="p-6 w-[100%] bg-[#1a2332] text-white ml-[5%] mt-[2%] mb-[1%] mr-[2%] flex justify-center items-center">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </SetCompletedTodosContext.Provider>
            </SetCurrentTodosContext.Provider>
        </CompletedTodosContext.Provider>
    </CurrentTodosContext.Provider>) ;

}