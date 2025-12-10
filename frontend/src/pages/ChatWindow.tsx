import { useContext,useState,useEffect, use } from "react"
import Chat1 from "./Chat1"
import "./ChatWindow.css"
import { MyContext } from "./Context"
import { RingLoader } from "react-spinners"
import Sidebar1 from "./Sidebar1"




export default function ChatWindow(){
    const {prompt,setPrompt,reply,setReply,currThreadId,setprevChats,setnewChat}=useContext(MyContext);
    const [loader,setloader]=useState<boolean>(false);
    const [uploadedFileurl,setuploadedFileurl]=useState("");
    const [uploadedFilename, setUploadedFilename] = useState("");

    

    const getReply= async ()=>{
        setloader(true);
        setnewChat(false);
        const payload={
            message:prompt,
            threadId:currThreadId
        }
        const token=localStorage.getItem("token") ?? "";
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": token 
            },
            body: JSON.stringify(payload),
        };
        try{
            const response=await fetch("http://localhost:3000/api/v1/chat1",options);
            const data=await response.json();
            console.log(data);
            setReply(data.reply);

            setuploadedFileurl("");
            setUploadedFilename("");
            setPrompt("");
        }catch(err){
            console.log(err);
        }
        setloader(false);
    }   
    
    const handleFile=  ()=>{
        const token=localStorage.getItem("token") ?? "";
        const el=document.createElement("input");
        el.setAttribute("type","file");
        el.setAttribute("accept", ".pdf, .pptx, .docx");
        el.addEventListener('change', async ()=>{
            if(el.files && el.files.length>0){
                const file=el.files.item(0);
                if(file){
                    const formData = new FormData();
                    formData.append('pdf',file);
                    formData.append("threadId", currThreadId); //send the threadId 
                    const response=await fetch("http://localhost:3000/api/v1/upload/pdf",{
                        method:"POST",
                        headers:{
                            "Authorization": token 
                        },
                        body:formData,
                    });
                    const data=await response.json();
                    // console.log("Uplaod API data",data);

                    if(data.path){
                        setuploadedFileurl(data.path);
                        setUploadedFilename(data.filename);
                    }
                    
                }
                
               
               console.log("file uploaded");
            }
        })
        el.click();
    }


    //Append newChats to prevChats
    useEffect(()=>{
        if(prompt && reply){
            setprevChats(prevChats => (
                [...prevChats,{
                    role:"user",
                    content:prompt
                },{
                    role:"assistant",
                    content:reply
                }]
            ))
        }
        setPrompt("");
    },[reply]);



    return(
        <div className="flex h-[calc(100vh-64px)] w-full">
        <div className="flex-1">
        <div className="chatWindow h-full w-full flex flex-col justify-between items-center text-center bg-white text-black">
        
        <Chat1></Chat1>
        <RingLoader color="#000" loading={loader}/>

        <div className="flex flex-col justify-center items-center w-full">

        <div className="inputBox w-full flex justify-between items-center relative">
            {uploadedFileurl && (
                <a
                    href={uploadedFileurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-4 top-3 bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 text-sm shadow cursor-pointer hover:bg-gray-300"
                    style={{ textDecoration: "none", color: "inherit" }}>
                <i className="fa-solid fa-file text-gray-700"></i>

                {/* Filename */}
                <span className="max-w-[120px] truncate">
                    {uploadedFilename || "file"}
                </span>

                 {/* Remove file button  */}
                <button
                    onClick={(e) => {
                    e.preventDefault(); // prevent opening file
                    e.stopPropagation(); // prevent click bubbling
                    setuploadedFileurl("");
                    }}
                    className="text-gray-600 hover:text-black">✕
                </button>
            </a>
            )}

            <textarea
                    placeholder="Ask anything"
                    className="w-full"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? getReply() : ""}
            />

        <div
            className="file absolute left-4 top-15 -translate-y-1/2 cursor-pointer text-lg"
            onClick={handleFile}>
            <i className="fa-solid fa-file"></i>
        </div>

        <div
            id="submit"
            onClick={getReply}
            className="cursor-pointer absolute flex justify-center items-center text-xl"
        >
            <i className="fa-solid fa-paper-plane"></i>
        </div>
    </div>

    <p className="info text-1xl">
        SecondBrain can make mistakes. Check important info. See Cookie Preferences.
    </p>

</div>

        </div>
        </div>

       
       <Sidebar1/>
        </div>
    )
};