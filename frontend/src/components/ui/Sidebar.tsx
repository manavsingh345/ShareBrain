import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Document } from "../../icons/Document";
import { SidebarItem } from "./SidebarItem";
import { LinkIcon } from "../../icons/LinkIcon";

interface SidebarProps {
  selectedType: "twitter" | "youtube" | "document" | "links";
  onSelectType: (type: "twitter" | "youtube" | "document" | "links") => void;
}


export function Sidebar({ selectedType, onSelectType }: SidebarProps) {
  return (
    <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-4">
      <div className="flex text-2xl  pl-8 items-center pt-6">
        <div className="pr-2 text-gray-700">
          <Logo />
        </div>
        Second Brain
      </div>
      <div className="pt-7 flex flex-col space-y-4">
        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          selected={selectedType === "youtube"}
          onClick={() => onSelectType("youtube")}
        />
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon />}
          selected={selectedType === "twitter"}
          onClick={() => onSelectType("twitter")}
        />
        <SidebarItem
          text="Links"
          icon={<LinkIcon />}
          selected={selectedType === "links"}
          onClick={() => onSelectType("links")}
        />
        <SidebarItem
          text="Document"
          icon={<Document />}
          selected={selectedType === "document"}
          onClick={() => onSelectType("document")}
        />
        
      </div>
    </div>
  );
}
