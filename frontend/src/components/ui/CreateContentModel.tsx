import { useRef, useState } from 'react';
import { CrossIcon } from '../../icons/CrossIcon.tsx';
import { Button } from './Button.tsx';
import { Input } from './Input.tsx';
import axios from 'axios';
import { BACKEND_URL } from '../../config.ts';
import { YoutubeIcon } from '../../icons/YoutubeIcon.tsx';
import { TwitterIcon } from '../../icons/TwitterIcon.tsx';
import { Document } from '../../icons/Document.tsx';
import { LinkIcon } from '../../icons/LinkIcon.tsx';
import { SubmitIcon } from '../../icons/SubmitIcon.tsx';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-500 cursor-pointer">
              <CrossIcon />
            </button>
          </div>

          {/* Header */}
        <h2 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-center tracking-tight">
                Craft Your Content Here
        </h2>



          {/* Input Fields */}
          <div className="space-y-3">
            <Input ref={titleRef} placeholder="Title" />
            {type === ContentType.Document ? (
              <textarea
                ref={textRef}
                placeholder="Write your note here..."
                className="w-full h-36 p-3 border border-gray-300 rounded-lg resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <Input ref={linkRef} placeholder="Link" />
            )}
          </div>

          {/* Type Selector */}
          <div className="mt-6">
            <h3 className="text-center font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-medium mb-2">What Are You Adding?</h3>
            <div className="flex justify-between gap-2">
              <Button
                size="md"
                text="Youtube"
                startIcon={<YoutubeIcon/>}
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                size="md"
                text="Twitter"
                startIcon={<TwitterIcon/>}
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
              />
              <Button
                size="md"
                text="Document"
                startIcon={<Document/>}
                variant={type === ContentType.Document ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Document)}
              />
              <Button
                size="md"
                text="Links"
                startIcon={<LinkIcon/>}
                variant={type === ContentType.Links ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Links)}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <Button onClick={addContent} variant="primary" text="Craft" size="md" startIcon={<SubmitIcon/>}/>
          </div>
        </div>
      </div>
    )}
  </div>
);
}