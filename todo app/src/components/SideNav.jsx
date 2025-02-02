import { useNavigate } from "react-router-dom"

export default function SideNav() {

    const navigate = useNavigate() ;

    return <div className="flex-col w-[15%] items-center mb-[5%] pl-[3%] bg-white/10
    backdrop-blur-md border border-white/20 text-white shadow-lg rounded h-[50vh]
    ">
        <button onClick={() => navigate('/')} className={`
            text-white text-2xl mb-[5%] font-semibold after:block 
            after:h-[2px] after:w-0 after:bg-[#0ff] after:transition-all after:duration-500 hover:after:w-full 
            mt-[70%]
            `}> home </button> <br />
        <button onClick={() => navigate('/add-todo')} className={`
            text-white text-2xl mb-[5%] font-semibold after:block 
            after:h-[2px] after:w-0 after:bg-[#0ff] after:transition-all after:duration-500 hover:after:w-full
            `}> add todo </button> <br />
        <button onClick={() => navigate('/completed-todos')} className={`
            text-white text-2xl font-semibold after:block 
            after:h-[2px] after:w-0 after:bg-[#0ff] after:transition-all after:duration-500 hover:after:w-full
            `}> completed todos </button> <br />
    </div> 

}