import Card from "./Card"
import Message from "../components/ui/Message"
import SmallNav from "./SmallNav"
export default function MultiCard(){
    return(
        <div className="pt-15 bg-black   min-h-screen ">
           <div className="flex justify-center items-center"><SmallNav text={"Experience  Powerful Features"}/></div>
           <div className="flex justify-center items-center text-3xl font-bold text-white py-4 ">
            Everything You Need to <br />
            Build Your Second Brain
           </div>
           <span className="flex justify-center items-center text-lg text-gray-400">A completely new way of interaction with AI. Work in visual, not in linear mode.</span>
        <div className="flex flex-wrap  pt-10 px-44 ">
            
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
       
       </div>
       </div>
    )
}