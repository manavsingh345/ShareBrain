import { useState } from "react";
import "./chat.css"
type ChatMessage = {
    sender:"user" | "bot",
    text:string
};

export default function(){
    const [message,setMessage]=useState("");
    const [chats,setChats]=useState<ChatMessage[]>([]);

    const getReply=async ()=>{
        if (!message) return;
        setChats((prev) => [...prev, { sender: "user", text: message }]);

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
            setChats((prev)=>[...prev,{sender:"bot",text:data.reply}]);
        }catch(e){
            console.log(e);
        }
        setMessage(""); 
    }
    return(
        <div className="chat flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                {
                    chats.map((chat,idx)=>(
                        <p  key={idx} className={`p-2 rounded-lg max-w-[80%] ${chat.sender === "user" ? "bg-blue-600 self-end" : "bg-gray-700 self-start" }`}>{chat.text}</p>
                    ))
                }
            </div>

            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={(e)=> e.key ==='Enter'? getReply():""} placeholder="Enter your message" className="absolute bottom-0 w-full bg-black text-white p-2" />
            <span className="absolute bottom-0 right-0 text-white pb-2 pr-2 cursor-pointer" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></span>
        </div>
    )
}


