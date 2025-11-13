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

    return(
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
   {selected === "energy" && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Productivity Enthusiasts" subheading="Maximize your productivity and never lose a great idea again." type="energy"/>}
   {selected === "creator" && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Content Creators" subheading="Create better content faster with AI-powered insights." type="creator"/>}
   {selected === "solo" && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Solopreneurs" subheading="Build and grow your business with AI as your co-pilot." type="solo"/>}
   {selected === "developer" && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Developers" subheading="Code faster with AI-powered documentation and research." type="developer"/>}
   {selected === "market" && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Marketers" subheading="Plan campaigns and analyze content with AI assistance." type="market"/>}
   {selected === "copy" && <UseCard icon={<EnergyIcon height="60" width="60"/>} heading="Copywriters" subheading="Write better, faster with AI that understands your voice." type="copy"/>}
  </div>


</div>

    )
}