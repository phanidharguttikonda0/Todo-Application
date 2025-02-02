import { useContext } from "react"
import { CurrentTodosContext, SetCurrentTodosContext } from "./Home"


export default function CurrentTodos() {

    const currentTodos = useContext(CurrentTodosContext) ;
    const setCurrentTodos = useContext(SetCurrentTodosContext) ;

    return <div>
        CurrentTodos
        {
            console.log(currentTodos)
        }
    </div>

}