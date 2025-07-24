import { useRef, useState } from 'react';
import { CrossIcon } from '../../icons/CrossIcon.tsx';
import { Button } from './Button.tsx';
import { Input } from './Input.tsx';
import axios from 'axios';
import { BACKEND_URL } from '../../config.ts';

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
  Links = "links"
}

export function CreateContentModel({ open, onClose }: any) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const textRef= useRef<HTMLTextAreaElement | null>(null);

  const [type,setType]=useState(ContentType.Youtube);
  async function addContent() {
      const title = titleRef.current?.value;
      const link =
    type === ContentType.Document
      ? textRef.current?.value
      : linkRef.current?.value;

  try {
    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    onClose();
  } catch (error: any) {
    console.error("Failed to add content:", error);
    alert("Something went wrong. Please try again.");
  }
}


  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder="Title" />
                {type===ContentType.Document ? (
                  <textarea ref={textRef} placeholder="Write your note here..." 
                  className="mt-3 w-full h-40 p-4 border border-gray-300 rounded-xl resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                   id=""></textarea>
                ): (<Input ref={linkRef} placeholder="Link"/>)}


              </div>
              <div >
                <div className="flex justify-center">
                    <h1>Type</h1>
                </div>
                
                <div className='flex justify-center gap-2 p-4 '>
                  
                <Button size="md" text="Youtube" variant={type===ContentType.Youtube ? "primary" : "secondary"}
                onClick={()=>{
                  setType(ContentType.Youtube)
                }}></Button>

                <Button size="md" text="Twitter" variant={type===ContentType.Twitter ? "primary" : "secondary"}
                onClick={()=>{
                  setType(ContentType.Twitter)
                }}></Button>

                <Button size='md' text='Document' variant={type===ContentType.Document ? "primary" : "secondary"} 
                onClick={()=>{
                  setType(ContentType.Document)
                }}></Button>
                </div>
                <Button size='md' text='Links' variant={type===ContentType.Links ? "primary" : "secondary"}
                onClick={()=>{
                  setType(ContentType.Links)
                }}></Button>
              </div>
              <div className="flex justify-center">
              <Button onClick={addContent} variant="primary" text="Submit" size="md"/>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}



