import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Document } from "../../icons/Document";
import { SidebarItem } from "./SidebarItem";
import { LinkIcon } from "../../icons/LinkIcon";

export function Sidebar(){
    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0  pl-4">
            <div className="flex text-2xl font-bold pl-3 items-center pt-6"> <div className="pr-2 text-gray-700"> <Logo/></div>
            Brainly</div>
            <div className="pt-8 flex flex-col space-y-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon/>}/>
            <SidebarItem text="Document" icon={<Document/>}/>
            <SidebarItem text="Links"  icon={<LinkIcon/>}/>
            </div>
        </div>
    )
}