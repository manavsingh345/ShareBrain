import Card from "./Card"
import Message from "../components/ui/Message"
import SmallNav from "./SmallNav"
import SmallCard from "./SmallCard"
import BrainIcon from "../icons/BrainIcon"


export default function MultiCard(){
    return(
        <div className="pt-15 bg-black   min-h-screen ">
           <div className="flex justify-center items-center"><SmallNav text={"Experience  Powerful Features"}/></div>
           <div className="flex justify-center items-center text-4xl font-bold text-white py-4 ">
            Everything You Need to <br />
            Build Your Second Brain
           </div>
           <span className="flex justify-center items-center text-xl text-gray-400">A completely new way of interaction with AI. Work in visual, not in linear mode.</span>
        <div className="flex flex-wrap  pt-10 px-44 ">
            
           <Card icon={<Message/>} heading={"Chat with Anything"} text={"Chat with your content in real-time—summarize documents, search details, and get instant answers."}/> 
           <Card icon={<Message/>} heading={"Auto-organised Knowledge Base"} text={"Every file, chat, and insight is automatically structured and searchable — no manual sorting required."}/> 
           <Card icon={<BrainIcon/>} heading={"AI Powered Virtual Memory"} text={"An intelligent assistant that understands your goals and helps you move from idea to insight faster."}/> 
           <Card icon={<Message/>} heading={"Seamless File Conversations"} text={"Instantly chat with PDFs, Docs, and Notes — extract insights and find answers without scrolling."}/> 
           <Card icon={<Message/>} heading={"Centralized Content Space"} text={"All your content lives in one clean, connected hub — no switching between apps or tabs."}/> 
           <Card icon={<Message/>} heading={"Instant Insight Engine"} text={"Generate summaries, key takeaways, and structured answers from any document or data source — in seconds."}/> 
       
       </div>
       <SmallCard/>
       
    </div>
    )
}