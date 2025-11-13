import type { ReactElement } from "react"
import SubCard from "./SubCard"

interface UseContent{
    icon:ReactElement,
    heading:string,
    subheading:string,
    subcard?:ReactElement,
    type?:String,
}

export default function UseCard(props:UseContent){
    return (
        <div>
    <div className="flex p-4">
            <span className="py-6 pl-6">{props.icon}</span>
        <div className="flex flex-col py-5 pl-2">
            <span className="text-3xl text-white font-bold pb-2">{props.heading}</span>
            <span className="text-lg text-gray-400">{props.subheading}</span>
        </div>    
    </div>
        <SubCard/>
    </div>
    )
}