
export default function Todo({title, description, status}){


    return <div className="p-[1%] flex justify-between items-center border-2 border-[#0ff] rounded mb-[1%]">
        <h2 className="text-white text-2xl"> {title} </h2>
        <h5 className={status === "Doing" ? "text-white" : status === "Done" ? "text-green": "text-red"}> {status} </h5>
        <button onClick={() => {
            // here we need to add 2 things 
            // 1)delete option
            // 2)start option
        }}> menu </button>
    </div>


}