import HeroText from "./HeroText";
import Info from "./Info";
import Navbar from "./Navbar";
import SecondBrainOrbit from "./Orbit";


export default function Dash(){
    return (
        <div className="bg-gradient-to-b from-white via-indigo-100 to-violet-600  min-h-screen">
        <div className="relative z-70 pt-10">
            <Navbar/>
        </div>
        <div className="flex ">
            <div className="w-1/2 left-0 flex flex-col py-18">
                <HeroText/>
                <Info/>
                
            </div>
            <div className="mx-auto py-15">
                <SecondBrainOrbit/>
            </div>
        
        </div>

        </div>
    )
}