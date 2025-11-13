import type { ReactElement } from "react"

interface ButtonProps{
    text?:string,
    height?:string,
    width?:string,
    color?:string,
    icon?:ReactElement
}

export default function Button(props:ButtonProps){
    return (
        <div className="mt-4 px-4 flex items-center text-white  border-none rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{height:props.height || "65px" , width:props.width || "160px", backgroundColor:props.color || "#8B5CF6" }}> 
        <span className="text-xl font-semibold flex pl-1">{props.text}</span>
        <span className="text-xl font-semibold flex ">{props.icon}</span>
        </div>
    )
}
