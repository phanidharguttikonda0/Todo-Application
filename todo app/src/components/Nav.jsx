import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate() ;

    const logOut = useCallback( () => {
        localStorage.removeItem('authorization') ;
        navigate("/authentication") ;
    })

    return <div className={`
    m-[1%] flex justify-between items-center font-sans h-[5vh] fixed top-0 left-0 right-0
     bg-white/10 backdrop-blur-md border border-white/20 text-white py-8 px-6 shadow-lg rounded
    `}>
        <h1 className="text-2xl font-bold"> Todo App </h1>
        <button onClick={logOut} className=" py-2 pl-2 pr-2 text-lg cursor-pointer text-white border-[#0ff]-2 rounded  bg-[#2195f3]"> Log Out </button>
    </div>
}