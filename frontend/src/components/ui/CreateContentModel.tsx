import { useRef, useState } from 'react';
import { CrossIcon } from '../../icons/CrossIcon.tsx';
import { Button } from './Button.tsx';
import { Input } from './Input.tsx';
import axios from 'axios';
import { BACKEND_URL } from '../../config.ts';

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModel({ open, onClose }: any) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);

  const [type,setType]=useState(ContentType.Youtube);
  async function addContent() {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

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
        <div className="w-screen h-screen bg-slate-400 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder="Title" />
                <Input ref={linkRef} placeholder="Link" />
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
                </div>
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



