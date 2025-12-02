import "./Sidebar1.css"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "./Context"
import {v1 as uuidv1} from "uuid";
import BrainIcon from "../icons/BrainIcon";

interface Thread {
  threadId: string;
  title: string;
  hasPDF?: boolean;
}
export default function Sidebar1(){

    const {allThreads,setAllThreads,currThreadId,setPrompt,setnewChat,setReply,setcurrThreadId,setprevChats} = useContext(MyContext);
    const [sidebarOpen,setsidebarOpen]=useState(true);

    

    const getAllThreads = async () => {
        try{
            const token=localStorage.getItem("token") ?? "";
            const response=await fetch("http://localhost:3000/api/v1/thread",{
                headers:{
                    "Authorization": token
                }
            });
            const res=await response.json();
            const filterData =await res.map((thread:Thread) => ({ threadId: thread.threadId, title: thread.title, hasPDF: thread.hasPDF}));
            setAllThreads(filterData);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getAllThreads();
    },[currThreadId]);

    const NewChat =() => {
        setnewChat(true);
        setPrompt("");
        setReply("");
        setcurrThreadId(uuidv1());
        setprevChats([]);
    }

    const changeThread= async (newthreadId:string)=>{
        setcurrThreadId(newthreadId);
        try{
            const token=localStorage.getItem("token") ?? "";
            const response=await fetch(`http://localhost:3000/api/v1/thread/${newthreadId}`,{
                headers:{
                    "Authorization": token
                }
            });
            const res=await response.json();
            console.log(res);
            setprevChats(res);
            setnewChat(false);
            setReply("");
        }catch(e){
            console.log(e);
        }
    }
    const deleteThread= async(threadId:string)=>{
        try{
            const token=localStorage.getItem("token") ?? "";
            await fetch(`http://localhost:3000/api/v1/thread/${threadId}`,{headers:{
                "Authorization": token
            },method:"DELETE"});
            setAllThreads(prev => prev.filter(thread=>thread.threadId !== threadId));
            if(threadId === currThreadId){
                NewChat();
            }
        }catch(e){  
            console.log(e);
        }
    }
    const Side=async()=>{
        setsidebarOpen((prev)=>!prev);
    }
    return(
        <div className={`side  ${sidebarOpen ? "open" : "closed"}`}>
            <button onClick={Side}><img src="src\assets\expand.png"  className="h-6 w-7" alt="Menu" /></button>
        {sidebarOpen && <section className="Sidebar flex flex-col justify-between h-screen" >
            <button className="flex justify-between items-center cursor-pointer" onClick={NewChat}>
                <span><BrainIcon height={25} width={25}></BrainIcon></span>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
            
            <ul className="history">
                {
                    allThreads?.map((thread:Thread,idx:number) =>(
                        <li key={idx} onClick={() => changeThread(thread.threadId)}>{thread.title}  {thread.hasPDF && <i className="fa-solid fa-file-pdf text-red-500 ml-2"></i>} <i className="fa-solid fa-trash"
                        onClick={(e)=>{
                            e.stopPropagation(); //stop event bubbling
                            deleteThread(thread.threadId);
                        }}></i></li>
                    ))
                }
            </ul>
        </section>}
        </div>
        
    )
};