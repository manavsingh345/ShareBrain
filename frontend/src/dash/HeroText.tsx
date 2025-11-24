import { useEffect, useState } from "react";
import SmallNav from "./SmallNav";
export default function HeroText() {
  const words = ["organized", "productive", "creative", "focused", "powerful"];
  const [index, setIndex] = useState(0);

  // change word every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="text-5xl font-bold mx-auto text-white  drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
      <SmallNav text={"Turn Days of Work into Minutes"} />
      Build your 100x{" "}
      <span key={index} className="inline-block pl-4 text-violet-300 transition-all duration-600 absolute animate-fadeIn">
          {words[index]}
      </span>
      <br />
      second brain!!
      
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); filter: blur(4px); }
            50% { opacity: 1; transform: translateY(0); filter: blur(0); }
            100% { opacity: 0; transform: translateY(-10px); filter: blur(4px); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
