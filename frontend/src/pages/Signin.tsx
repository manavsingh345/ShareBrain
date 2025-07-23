import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
// import { Dashboard } from "./Dashboard";

export  function Signin(){
     const usernameRef=useRef<HTMLInputElement>(null);
     const passwordRef=useRef<HTMLInputElement>(null);
     const navigate=useNavigate();
   async function signin(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;

        const response=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })
        const jwt=response.data.token;
        localStorage.setItem("token",jwt);
        alert("you sigin successfully");
        // to do redirect user to the Dashboard
        navigate("/dashboard");
    }
     return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[800px] h-[500px] bg-white rounded-2xl shadow-lg flex overflow-hidden">
                {/* left view */}
               <div className="w-1/2 bg-blue-500 text-white flex flex-col items-center justify-center p-8 rounded-l-2xl">
                    <h2 className="text-3xl font-bold mb-4">Hello, Welcome!</h2>
                    <p className="mb-6">Don't have an account?</p>
                    <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition">
                        Register
                    </button>
                </div>
                {/* right view  */}
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <div className="mb-4 flex ">
                        <Input ref={usernameRef} placeholder="Username" />
                    </div>
                    <div className="mb-4 flex  w-full">
                        <Input ref={passwordRef} placeholder="Password"/>
                    </div>
                    
                        <Button onClick={signin} loading={false} variant="primary" size="md" text="Signin"  />
                    
                    
                </div>
            </div>
        </div>
     )
    //  <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    //     <div className="bg-white rounded-xl  min-w-48 p-8">
    //         <Input ref={usernameRef} placeholder="Username"/>
    //         <Input ref={passwordRef} placeholder="Password"/>
    //         <div className="flex justify-center pt-4">
    //          <Button onClick={signin} loading={false} variant="primary" size="md" text="Signin" fullWidth={true}/>
    //         </div>
            
    //     </div>
    // </div>
}