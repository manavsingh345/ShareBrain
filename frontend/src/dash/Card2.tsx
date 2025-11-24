interface Text{
    heading?:string,
    text?:string,
    color?:string,
}
export default function Card2(props:Text){
    return (
        <div className="bg-[#101428] h-28 w-1/6 rounded-2xl border border-gray-800 py-4">
           <span className={`flex justify-center ${props.color || "text-indigo-400"} text-4xl font-bold`}>{props.heading}</span>
           <span className="text-lg text-gray-400 flex justify-center pt-2">{props.text}</span>
        </div>
    )
}