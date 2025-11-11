// import type { ReactElement } from "react"

interface Property{
    text:string,
    // icon:ReactElement,
    width?:string,
    height?:string
}
export default function LogoCard(props:Property){
    return (
        <div className="bg-[#101428]" style={{height:props.height || "12px",width:props.width || "30px"}}>
            {props.text}
        </div>
    )
}