import type { ReactElement } from "react"

interface Property{
    text:string,
    icon?:ReactElement,
    width?:string,
    height?:string
}
export default function LogoCard(props:Property){
    return (
        <div className="bg-[#101428] m-2 flex justify-center items-center border border-gray-800 rounded-xl" style={{height:props.height || "50px",width:props.width || "300px"}}>
            {props.text}
        </div>
    )
}