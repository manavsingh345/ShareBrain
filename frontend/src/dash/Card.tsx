import type { ReactElement } from "react"

interface Info{
   icon:ReactElement,
   heading:String,
   text:String 
}

export default function Card(props:Info){
    return(
        <div className="m-1 h-60 w-90  bg-[#101428] border-1 border-gray-800 rounded-xl my-3 mx-3">
            <div className="h-12 w-12 text-white ml-5 mt-5 mb-5 ">{props.icon}</div>
            <div className="ml-5 flex flex-col">
            <div className="text-xl font-bold text-white">{props.heading}</div>
            <div className="text-gray-600 pt-2 text-base">{props.text}</div>
            </div>
        </div>
    )
}