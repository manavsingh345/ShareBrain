import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Document } from "../icons/Document";
import LogoCard from "./LogoCard";
import WebsiteIcon from "../icons/WebsiteIcon";
import AudioIcon from "../icons/AudioIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import ImageIcon from "../icons/ImageIcon";
import DemoPage from "./DemoPage";
import TimeData from "./TimeData";

export default function SmallCard() {
  return (
    <div className="bg-black min-h-screen">
       <div className="absolute bg-violet-600 opacity-50 blur-[160px] rounded-full w-[200px] h-[400px] z-0"></div>
      <div className="flex justify-center items-center text-3xl font-bold text-white py-10 pt-20">
        Works with All Your Content
      </div>

      
      <div className="flex flex-col items-center gap-2 text-white">
        
      
        <div className="flex justify-center flex-wrap gap-1">
          <LogoCard icon={<YoutubeIcon/>} text={"YouTube, TikTok, IG Reels"} width="260px"/>
          <LogoCard icon={<Document/>} text={"PDFs & Documents"}  width="210px"/>
          <LogoCard icon={<WebsiteIcon/>}text={"Websites & Articles"} width="220px"/>
          <LogoCard icon={<AudioIcon/>} text={"Audio & Podcasts"} width="200px"/>
        </div>

        
        <div className="flex justify-center flex-wrap gap-1">
         
          <LogoCard icon={<GithubIcon/>} text={"Code & GitHub Repos"}  width="250px"/>
          <LogoCard icon={<ImageIcon/>} text={"Images & Screenshots"}  width="260px"/>
          <LogoCard icon={<Document/>} text={"Google Docs/Sheets/Slides"}  width="280px"/>
          <LogoCard icon={<LinkedinIcon/>} text={"LinkedIn Posts, Carousels, Videos"}  width="310px"/>
        </div>
      </div>
      <DemoPage/>
      <TimeData/>
    </div>
  );
}
