import { useCallback, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Authentication(){
    const [inOrUp, setUp] = useState(true) ;
    const [mail, setMail] = useState("") ;
    const [username, setUsername] = useState("") ;
    const [password, setPassword]= useState("") ;
    const [username_, setUsername_] = useState(localStorage.getItem("username")) ;
    const navigate = useNavigate() ;

    useEffect(() => {
        if(username_){
            navigate('/') ;
        }
    },[username_]) ;

    const emailValidation = useCallback(() => {
        if(inOrUp) return true ;
        return z.string().email().safeParse(mail).success ;
    })

    const passwordValidation = useCallback( () => {
        return z.string().min(8).max(18).safeParse(password).success ;
    } )

    const usernameValidation = useCallback(() => {
        return z.string().min(3).max(18).safeParse(username).success ;
    })

    const showError = useCallback((error) => {
        toast.error(error, {
            position: "top-center", // Center at the top
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide, // Smooth animation
            theme: "dark",
            style: {
              border: "2px solid #0ff", // Neon cyan border
              color: "white", // Neon text color
              background: "#111", // Dark background
              boxShadow: "0 0 15px #0ff", // Neon glow effect
              textAlign: "center",
            },});
    })


    const authentication = useCallback(async () => {
        if(emailValidation()){
            if(usernameValidation()){
                if(passwordValidation()){
                    
                    if(inOrUp){
                        const result = await axios.post('http://localhost:9999/Authentication/sign-in',{
                            username, password
                        }) ;

                        console.log(result.data.message) ;
                        if(result.data.value) {
                            localStorage.setItem("username", username) ;
                            navigate('/') ;
                        }else{
                            showError(result.data.message) ;
                        }

                    }else{
                        const result = await axios.post('http://localhost:9999/Authentication/sign-up',{
                            username,password, email: mail
                        }) ;
                        console.log(result.data.message) ;
                        if(result.data.value){
                            localStorage.setItem("username", username) ;
                            navigate('/') ;
                        }else{
                            showError(result.data.message) ;
                        }
                    }


                }else{
                    
                    showError("password to have min of 8 characters")
                }
            }else{
                showError("username to be min of 3 and max of 18")
            }
        }else{
            showError("Invalid mail id")
        }
    }) ;



    return <div className="w-[100%] h-[100vh] bg-[#101926] flex justify-center items-center font-sans tracking-wide">
        <div className="flex flex-col items-start mb-[20%] w-[20%]">
            <h1 className="text-white text-4xl mb-[12%] font-custom-font"> {inOrUp ? "SignIn" : "SignUp"} </h1>
            <div className="w-[100%] p-[10%] bg-[#253955] bg-opacity-50 border-2 border-cyan-500 rounded shadow-[0_0_10px_#0ff] flex flex-col items-center">
                <div className="flex flex-col w-[100%]">
                {
                    !inOrUp && <input type="email" placeholder="Enter Email" className={
                        `
                        mb-[10%] bg-transparent border-b-2 outline-none text-white text-lg tracking-wide
                        `
                    } value={mail} onChange={(e) => setMail(e.target.value)}/> 
                }
                <input type="text" placeholder="Enter Username" className={
                        `
                        mb-[10%] bg-transparent border-b-2 outline-none text-white text-lg tracking-wide
                        `
                    } value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Enter Password" className={`
                    mb-[3%] bg-transparent border-b-2 outline-none text-white text-lg tracking-wide
                    `} value={password} onChange={(e) => setPassword(e.target.value)}/>
                {
                    inOrUp && <h4 className="text-[#777777] cursor-pointer hover:text-blue-50 hover:underline mb-[10%]"> forgot password </h4>
                }
                
                    <ToastContainer />
                
                </div>
                <div className="w-[100%]">
                    <button 
                    onClick={authentication}
                    className="bg-[#6464f7] text-white w-[100%] pb-[2%] pt-[2%] text-xl rounded"> {inOrUp ? "sign in" : "sign up"} </button>
                    <h4 className="inline cursor-pointer text-[#aca5a5] ">  {inOrUp ? "doesn't have an account " : "has an account "} 

                        <h4 className="inline hover:underline cursor-pointer text-[white]" onClick={() => {
                            setUp(!inOrUp)
                        }}>
                            {
                                inOrUp ? "sign up" : "sign in"
                            }
                        </h4>
                    </h4>
                </div>
            </div>
        </div>
    </div>
}

export default Authentication ;