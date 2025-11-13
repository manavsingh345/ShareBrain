import type { ReactElement } from "react"

interface Property{
    text:string,
    icon?:ReactElement,
    width?:string,
    height?:string,
    cursor?:string,
    onClick?:()=>void,
    color?:string,
}
export default function LogoCard(props:Property){
    return (
        <div onClick={props.onClick} className={`${props.color || "bg-[#101428]"} m-2  flex justify-center items-center border border-gray-800 rounded-xl hover:-translate-y-1 transition duration-500 ease-in-out ${props.cursor || ""}`} style={{height:props.height || "50px",width:props.width || "300px"}}>
          <span className="pr-2">{props.icon}</span>  
          <span className="text-white">{props.text}</span>
        </div>
    )
}