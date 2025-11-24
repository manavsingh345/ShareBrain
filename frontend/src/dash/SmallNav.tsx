import Brain from "./Brain"
interface Text{
    text:String,
}
export default function SmallNav(props:Text){
    return (
        <div className="flex items-center text-sm border-none rounded-full w-70 bg-gray-400  mb-6 px-6 h-10 font-normal font-sans">
           <span className="pr-2 flex items-center"><Brain width={20} height={20}/></span> 
           {props.text}
        </div>
    )
}