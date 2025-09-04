import "./chat.css"
export default function(){
    return(
        <div className="chat">
            <div><p>hello</p></div>
            <input type="text" placeholder="Enter your message" className="absolute bottom-0 w-full bg-black text-white p-2" />
            <span className="absolute bottom-0 right-0 text-white pb-2 pr-2 cursor-pointer"><i className="fa-solid fa-paper-plane"></i></span>
        </div>
    )
}