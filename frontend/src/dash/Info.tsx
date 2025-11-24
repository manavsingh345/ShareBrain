import Button from "./Button"
import { useNavigate } from "react-router-dom"


export default function Info(){
  const navigate=useNavigate();
    return (
      <>
      <div className="absolute bg-violet-600 opacity-50 blur-[160px] rounded-full w-[400px] h-[600px] z-0"></div>
        <div className="text-lg pt-6 mx-auto pl-51 text-white">
        Effortlessly <span className="font-bold">chat with your documents, TikToks, IG Reels, YouTube videos, LinkedIn, X, Audio, Looms, PDFs, websites</span>, and more—summarize, search, and interact with your content.
        <br />
        <br />
        <span className="font-bold">Save anything to your Second Brain</span>—then <span className="font-bold">AI chat with your auto-organized knowledge base</span> using state-of-the-art models like Claude 4, Grok 3, DeepSeek R1, GPT-4.1 and more
        <div className="flex">
        <Button onClick={()=>{navigate("/Signin")}} text="Start Now" icon={<i className="fa-solid fa-arrow-right text-white pl-2" ></i>}/>
        <span className="mr-4"></span>
       <a href="https://www.youtube.com/watch?v=4prRwP2BjxM"><Button  text="Watch Demo" width="190px" icon={<i className="fa-solid fa-play pl-2 pt-1"></i>} color="#101428"/></a> 
        
        </div>
      </div>

      </>
    )
}