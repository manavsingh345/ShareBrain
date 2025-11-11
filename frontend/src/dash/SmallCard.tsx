import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Document } from "../icons/Document";
import LogoCard from "./LogoCard";
import WebsiteIcon from "../icons/WebsiteIcon";
import AudioIcon from "../icons/AudioIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";

export default function SmallCard() {
  return (
    <div className="bg-black min-h-screen">
      <div className="flex justify-center items-center text-3xl font-bold text-white py-10 pt-20">
        Works with All Your Content
      </div>

      
      <div className="flex flex-col items-center gap-2 text-white">
        
      
        <div className="flex justify-center flex-wrap gap-1">
          <LogoCard icon={<YoutubeIcon/>} text={"YouTube, TikTok, IG Reels"} />
          <LogoCard icon={<Document/>} text={"PDFs & Documents"} />
          <LogoCard icon={<WebsiteIcon/>}text={"Websites & Articles"} />
        </div>

        
        <div className="flex justify-center flex-wrap gap-1">
          <LogoCard icon={<AudioIcon/>} text={"Audio & Podcasts"} />
          <LogoCard icon={<GithubIcon/>} text={"Code & GitHub Repos"} />
          <LogoCard icon={<Document/>} text={"Google Docs/Sheets/Slides"} />
          <LogoCard icon={<LinkedinIcon/>} text={"LinkedIn Posts, Carousels, Videos"} />
        </div>
      </div>
    </div>
  );
}
