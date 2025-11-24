import type { ReactElement } from "react"
import SubCard from "./SubCard"

interface UseContent{
    icon:ReactElement,
    heading:string,
    subheading:string,
    subcard?:ReactElement,
    type?:String,
    subItems?: string[],
}

export default function UseCard(props:UseContent){
    return (
        <div>
            
    <div className="flex p-4">
        
            <span className="py-6 pl-6 pr-4">{props.icon}</span>
        <div className="flex flex-col py-6 pl-2">
            <span className="text-3xl text-white font-bold ">{props.heading}</span>
            <span className="text-lg text-gray-400">{props.subheading}</span>
        </div>    
    </div>
        {props.subItems && <SubCard items={props.subItems} />}
    </div>
    )
}