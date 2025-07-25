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
      <div className="flex text-2xl font-bold pl-3 items-center pt-6">
        <div className="pr-2 text-gray-700">
          <Logo />
        </div>
        Brainly
      </div>
      <div className="pt-8 flex flex-col space-y-4">
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon />}
          selected={selectedType === "twitter"}
          onClick={() => onSelectType("twitter")}
        />
        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          selected={selectedType === "youtube"}
          onClick={() => onSelectType("youtube")}
        />
        <SidebarItem
          text="Document"
          icon={<Document />}
          selected={selectedType === "document"}
          onClick={() => onSelectType("document")}
        />
        <SidebarItem
          text="Links"
          icon={<LinkIcon />}
          selected={selectedType === "links"}
          onClick={() => onSelectType("links")}
        />
      </div>
    </div>
  );
}
