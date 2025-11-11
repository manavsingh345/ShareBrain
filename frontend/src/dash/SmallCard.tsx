import LogoCard from "./LogoCard";

export default function SmallCard() {
  return (
    <div className="bg-black min-h-screen">
      <div className="flex justify-center items-center text-3xl font-bold text-white py-10 pt-20">
        Works with All Your Content
      </div>

      
      <div className="flex flex-col items-center gap-2 text-white">
        
      
        <div className="flex justify-center flex-wrap gap-1">
          <LogoCard text={"YouTube, TikTok, IG Reels"} />
          <LogoCard text={"PDFs & Documents"} />
          <LogoCard text={"Websites & Articles"} />
        </div>

        
        <div className="flex justify-center flex-wrap gap-1">
          <LogoCard text={"Audio & Podcasts"} />
          <LogoCard text={"Code & GitHub Repos"} />
          <LogoCard text={"Google Docs/Sheets/Slides"} />
          <LogoCard text={"LinkedIn Posts, Carousels, Videos"} />
        </div>
      </div>
    </div>
  );
}
