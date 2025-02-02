import { useContext } from "react"
import { CompletedTodosContext, SetCompletedTodosContext } from "./Home"


export default function CompletedTodos() {

    const completedTodos = useContext(CompletedTodosContext) ;
    const setCompletedTodos = useContext(SetCompletedTodosContext) ;

    return <div> 
        Completed Todos{
            console.log(completedTodos)
        }
    </div>
}