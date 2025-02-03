import { useContext } from "react"
import { CurrentTodosContext, SetCurrentTodosContext } from "./Home"
import Todo from "./Todo";


export default function CurrentTodos() {

    const currentTodos = useContext(CurrentTodosContext) ;
    const setCurrentTodos = useContext(SetCurrentTodosContext) ;

    return <div className="flex-cols justify-center items-center w-[100%]">
        CurrentTodos
        {
            currentTodos.map((element) => <Todo title={element.title} 
            status={element.status}
            description={element.description} />)
        }
    </div>

}