import { useState } from "react";
import "./chat.css"
export default function(){
    const [message,setMessage]=useState("");
    const [reply,setReply]=useState("");
    const getReply=async ()=>{
        if (!message) return;
        const payload={message};
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload),
        };
        try{
            const response=await fetch("http://localhost:3000/api/v1/chat",options);
            const data=await response.json();
            console.log(data);
            setReply(data.reply);
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div className="chat">
            <div><p>{reply}</p></div>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={(e)=> e.key ==='Enter'? getReply():""} placeholder="Enter your message" className="absolute bottom-0 w-full bg-black text-white p-2" />
            <span className="absolute bottom-0 right-0 text-white pb-2 pr-2 cursor-pointer" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></span>
        </div>
    )
}


