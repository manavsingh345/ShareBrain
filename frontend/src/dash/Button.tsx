export default function Button(){
    return (
        <div className="flex mt-4">
        <div className="h-15 w-40 bg-violet-500 px-7 flex text-white items-center border-none rounded-2xl mt-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Start Now <i className="fa-solid fa-arrow-right text-white pl-2 pt-1"></i>
        </div>
        <div className="h-15 w-45 ml-3 bg-gray-600 text-white px-6 flex items-center border-none rounded-2xl mt-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
           <i className="fa-solid fa-play pr-2 pt-1"></i>  Watch Demo
        </div>
        </div>
    )
}