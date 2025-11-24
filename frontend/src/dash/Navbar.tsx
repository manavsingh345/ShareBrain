import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate=useNavigate();
    const handleLogin = ()=>{
        navigate("/signin");
    }
    const handleSinup=()=>{
        navigate("/signup");
    }
    return (
        <div className="flex justify-center">
            <div className="bg-black h-14 w-1/4 rounded-full flex items-center text-white p-3">
                <div className="pr-2 pl-4 cursor-pointer">Home</div>
                <div className="pl-6 cursor-pointer">Features</div>
                <div onClick={handleLogin} className="ml-4 border border-white/[0.4] z-20 rounded-full px-6 py-2 cursor-pointer
                transition-all duration-300 hover:border-purple-600 hover:shadow-[0_0_10px_#9333ea]">Login</div>
                <div onClick={handleSinup} className="ml-4 border border-white/[0.4] z-20 rounded-full px-4 py-2 cursor-pointer
                transition-all duration-300 hover:border-purple-600 hover:shadow-[0_0_10px_#9333ea]">Signup</div>
            </div>
        </div>
    )
}