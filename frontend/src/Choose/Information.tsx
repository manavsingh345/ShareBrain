import Card2 from "../dash/Card2";
import SmallNav from "../dash/SmallNav";

export default function Information(){
    return (
        <div className="bg-black min-h-screen flex flex-col items-center pt-20 py-10">
            <SmallNav text={"Why We Choose You!"}/>
            <span className="text-4xl text-white font-bold">Why Second Brain?</span>
            <p className="text-xl  text-gray-400 max-w-3xl mx-auto pt-6 pl-8">With  <span className="text-white font-semibold ">AI Chat across multiple sources</span>, Second Brain saves you <span className="text-white font-semibold">days of work</span> by transforming research, planning, and execution into <span className="text-white font-semibold">actionable steps in minutes</span>.</p>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-4">Effortlessly <span className="text-white font-semibold">save, edit, organize, and structure</span> all that knowledge in your <span className="text-white font-semibold">AI-powered virtual memory</span>—then dive deeper by <span className="text-white font-semibold">chatting with your knowledge base</span> to extract <span className="flex justify-center">insights and make smarter decisions faster.</span></p>
            <div className="w-full">
            <div className="absolute bg-violet-600 opacity-50 blur-[160px] rounded-full w-[200px] h-[400px] z-0"></div>
            <div className="flex justify-center py-30 gap-10">
                <Card2 color="text-red-500" heading="5 hours" text="Without SecondBrain"/>
                <Card2 color="text-green-500" heading="5 mins" text="With SecondBrain"/>          
            </div>
            </div>
        </div>
    )
}