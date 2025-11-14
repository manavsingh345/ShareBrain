import SmallNav from "../dash/SmallNav";
import LogoCard from "../dash/LogoCard";
import EnergyIcon from "../icons/EnergyIcon";
import CreatorIcon from "../icons/CreatorIcon";
import SoloIcon from "../icons/SoloIcon";
import GithubIcon from "../icons/GithubIcon";
import MarketIcon from "../icons/MarketIcon";
import CopyIcon from "../icons/CopyIcon";
import UseCard from "./UseCard";
import { useState } from "react";

export default function Cases(){
    const [selected,setSelected]=useState<String>("energy");

    return(<>
       <div className="absolute bg-violet-600 opacity-50 blur-[160px] rounded-full w-[300px] h-[400px] z-0 right-0"></div>
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        
  <SmallNav text={"Experience Powerful Features"} />
  
  <div className="flex flex-col justify-center items-center mt-4">
    <span className="text-4xl text-white font-bold text-center">Check out the most</span>
    <span className="text-4xl text-purple-400 font-bold text-center">common use cases</span>
  </div>

  <div className="flex justify-center flex-wrap py-12 px-20">
    <LogoCard icon={<EnergyIcon />} text="Productivity Enthusiasts" width="250px" cursor="cursor-pointer" onClick={() => setSelected("energy")}/>
    <LogoCard icon={<CreatorIcon />} text="Content Creators" width="210px" cursor="cursor-pointer" onClick={() => setSelected("creator")}/>
    <LogoCard icon={<SoloIcon />} text="Solopreneurs" width="200px" cursor="cursor-pointer" onClick={() => setSelected("solo")}/>
    <LogoCard icon={<GithubIcon />} text="Developers" width="190px" cursor="cursor-pointer" onClick={() => setSelected("developer")}/>
    <LogoCard icon={<MarketIcon />} text="Marketers" width="180px" cursor="cursor-pointer" onClick={() => setSelected("market")}/>
    <LogoCard icon={<CopyIcon />} text="Copywriters" width="190px" cursor="cursor-pointer" onClick={() => setSelected("copy")}/>
  </div>

  <div className="h-3/6 w-4/7 bg-[#101428] flex  rounded-2xl">


   {selected === "energy"  && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Productivity Enthusiasts" subheading="Maximize your productivity and never lose a great idea again." type="energy" subItems={["Capture ideas instantly with side panel","Multi-source AI chat","Chrome extension for quick saves",
    "Auto-organized knowledge base","Smart tags and projects","Searchable virtual memory"
    ]}/>}


   {selected === "creator" && <UseCard icon={<CreatorIcon height="60" width="60"/>} heading="Content Creators" subheading="Create better content faster with AI-powered insights." type="creator" subItems={["Chat with YouTube videos and TikToks","AI copywriter that learns your style","Save research and inspiration",
   "Extract key points from content","Humanize AI-generated text","Collaborate with AI on ideas"]}/>}


   {selected === "solo" && <UseCard icon={<SoloIcon height="60" width="60"/>} heading="Solopreneurs" subheading="Build and grow your business with AI as your co-pilot." type="solo" subItems={[ "Organize business knowledge","AI chat with documents and data","Project management with AI",
    "Quick access to saved resources","Auto-tagged content library","Multi-language support"]}/>}


   {selected === "developer" && <UseCard icon={<GithubIcon height="60" width="60"/>} heading="Developers" subheading="Code faster with AI-powered documentation and research." type="developer" subItems={["Chat with GitHub repositories","Save code snippets instantly","Documentation at your fingertips",
    "Multi-source code research","AI File Explorer","Technical knowledge base"]}/>}

   {selected === "market" && <UseCard icon={<MarketIcon height="60" width="60"/>} heading="Marketers" subheading="Plan campaigns and analyze content with AI assistance." type="market" subItems={["Analyze competitor content","Extract insights from videos","Campaign planning with AI",
    "Content research library","Multi-platform content analysis","AI-powered copywriting"]}/>}


   {selected === "copy" && <UseCard icon={<CopyIcon height="60" width="60"/>} heading="Copywriters" subheading="Write better, faster with AI that understands your voice." type="copy" subItems={["AI copywriter learns your style","Humanize AI-generated text","Bypass AI detection tools",
    "Research management","Save writing inspiration","Multi-language writing support"]}/>}
  </div>


</div>
</>
    )
}