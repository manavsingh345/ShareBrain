import SmallNav from "./SmallNav";
import VisualPage from "./VisualPage";

export default function DemoPage(){
    return (
        <div className="bg-black min-h-screen">
            <div className="flex flex-col items-center pt-60 pb-10">
                <SmallNav text={"Experience  Powerful Features"}/>
                <span className="text-white text-4xl sm:text-4xl font-bold">Check out a short demo of the</span>
                <br />
                <span className="text-4xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Second Brain App ✨</span>
                <br />
                <span className="text-xl text-gray-400">A completely new way of interaction with AI. Work in <span className="font-semibold italic text-white">visual</span>, not in <span className="font-semibold italic text-white">linear</span> mode.</span>

            </div>
            <VisualPage/>
        </div>
    )
}