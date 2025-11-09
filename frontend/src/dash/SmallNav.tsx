import Brain from "./Brain"
export default function SmallNav(){
    return (
        <div className="flex items-center text-sm border-none rounded-full bg-gray-400 w-70 mb-6 px-6 h-10 font-normal font-sans">
           <span className="pr-2 flex items-center"><Brain width={20} height={20}/></span> 
           Turns Days of Work into Minutes
        </div>
    )
}