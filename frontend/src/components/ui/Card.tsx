import { useEffect, useState } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";



interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
  onDelete?: () => void;
  date?: string;
}

export function Card({ title, link, type, onDelete, date }: CardProps) {
  const [displayDate] = useState(() => date ?? new Date().toLocaleDateString("en-US"));
  async function handleDeleteContent() {
    try {
      if (onDelete) onDelete(); 
    } catch (err) {
      console.error("Delete trigger failed", err);
    }
  }

  useEffect(() => {
    if (type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, [link, type]);

  return (
    <div>
      <div className="p-4 bg-white rounded-md shadow-md border-gray-200 border-2 w-80 h-[350px] overflow-hidden">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              {/* <ShareIcon size="md" /> */}
              {type ==="twitter" && <a href={link} target="_blank" rel="noopener noreferrer">
                <TwitterIcon/>
              </a>}
              {type ==="youtube" && <a href={link} target="_blank" rel="noopener noreferrer">
                <YoutubeIcon/>
              </a>}
            </div>
          </div>
          <h2 className="text-center text-lg font-semibold w-full">{title}</h2>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon size="md" />
              </a>
            </div>
            <div
              className="text-gray-500 cursor-pointer"
              onClick={handleDeleteContent}
            >
              <DeleteIcon size="md" />
            </div>
          </div>
        </div>

        <div className="p-4">
          {type === "youtube" && (
            <iframe
              className="w-full h-[200px] rounded"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <div className="w-full max-h-[200px] overflow-auto rounded border border-gray-200">
              <blockquote className="twitter-tweet w-full h-full overflow-auto">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
          <p className="text-sm text-gray-500 pt-4">Added on: {displayDate}</p>
        </div>
      </div>
    </div>
  );
}
