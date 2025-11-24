import BrainIcon from "../../icons/BrainIcon";
import GithubIcon from "../../icons/GithubIcon";
import LinkedinIcon from "../../icons/LinkedinIcon";
import Social from "../../icons/Social";
import { TwitterIcon } from "../../icons/TwitterIcon";

export default function Footer(){
    return (
        <div className="bg-[#11121a] h-80">
            <div className="flex flex-row px-30 pt-10">
                <div className="flex flex-col w-1/3">
                <span className="flex flex-row transition-transform duration-800 hover:scale-105 cursor-pointer"><BrainIcon height={40} width={40}/><span className="pt-1 pl-3 font-sans font-semibold text-2xl text-indigo-400"> SecondBrain</span></span>
                <span className="text-gray-400 text-sm pt-2">Turn Days of Work into Minutes with AI-powered <br /> knowledge management.</span>
                <div className="flex flex-row">
                    <a href="https://github.com/manavsingh345" className="py-3 pr-2 cursor-pointer"><Social icon={<GithubIcon/>}/></a>
                    <a href="https://x.com/ManavSingh321" className="py-3 pr-2 cursor-pointer"><Social icon={<TwitterIcon/>}/></a>
                    <a href="https://www.linkedin.com/in/manavsinghman/" className="py-3 pr-2 cursor-pointer"><Social icon={<LinkedinIcon/>}/></a>
                </div>
                </div>
           
            
           <div className="flex flex-col w-1/3 text-gray-300">
                    <h3 className="text-lg font-semibold text-white">Company</h3>
                    <div className="flex flex-col gap-2 pt-2 text-md text-gray-500">
                        <span className="cursor-pointer hover:text-white">Features</span>
                        <span className="cursor-pointer hover:text-white">Pricing</span>
                        <span className="cursor-pointer hover:text-white">Updates</span>
                        <span className="cursor-pointer hover:text-white">Contact</span>
                        <span className="cursor-pointer hover:text-white">Sign Up</span>
                    </div>
            </div >
                
            <div className="flex flex-col w-1/3 text-gray-300">
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <div className="flex flex-col gap-2 pt-2 text-md text-gray-500">
                    <span className="cursor-pointer hover:text-white">Terms of Service</span>
                    <span className="cursor-pointer hover:text-white">Privacy & Cookie Policy</span>
                </div>
            </div>

             </div>
             <div className="text-gray-500 text-sm pt-10 px-30">© 2025 Second Brain. All rights reserved.</div>
        </div>
    )
}