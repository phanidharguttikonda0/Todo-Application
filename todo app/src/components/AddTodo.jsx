import { useCallback, useContext, useState } from "react"
import { CurrentTodosContext, SetCurrentTodosContext } from "./Home";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";


export default function AddTodo() {
    
    const setCurrentTodos = useContext(SetCurrentTodosContext) ;
    const currentTodos = useContext(CurrentTodosContext) ;

    const [title, setTitle] = useState("") ;
    const [description, setDescription] = useState("") ;


    const showSuccess = useCallback(() => {
        
        toast.success("✅ Successfully added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          style: {
            border: "2px solid #0ff",
            backgroundColor: "#111",
            color: "white",
            boxShadow: "0 0 15px #0ff",
          },
          progressStyle: {
            background: "#0ff", // Neon cyan progress bar
          },
          icon: "⚡", // Custom neon icon
        });
      
    })


    const addTodo = useCallback(async () => {
        const result = await axios.post("http://localhost:9999/add-todo",{
            title,
            description
        },{
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        }) ;
        console.log(result.data, title, description)
        if(result.data.value){
            setCurrentTodos([...currentTodos, {title, description, startTime: null, endTime: null, status: "not yet started"}]) ;
            setTitle("") ;
            setDescription("") ;
            showSuccess();
        }
    })

    return <div className="flex-col items-center w-[40%]">
        <input type="text" placeholder="Title" value={title}
        className={`
            border-b-2 border-[#0ff] w-[100%] bg-transparent outline-none mb-[5%] text-lg
            `}
        onChange={(event) => setTitle(event.target.value)} />
        <input type="text" placeholder="Description" 
        className={`
            border-b-2 border-[#0ff] w-[100%] bg-transparent outline-none mb-[5%] text-lg
            `}
        value={description} onChange={event => setDescription(event.target.value)} />
        <button onClick={addTodo} 
        className={`
            w-[100%] bg-[#2195f3] pt-[1%] pb-[1%]
            `}
        > add todo </button>
        <ToastContainer />
    </div>
}