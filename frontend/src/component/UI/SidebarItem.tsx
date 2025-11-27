import type { ReactElement } from "react"

interface side {
    text: string,
    icon: ReactElement,
    onClick?:() => void,
    selected?: boolean;
}
export function SidebarItem(props: side) {

    return <div onClick={props.onClick} className={`flex text-gray-700 pl-8 cursor-pointer hover:bg-gray-200 ${
        props.selected ? "bg-gray-300 font-semibold" : ""
      }`}>
        <div className="p-2">
            {props.icon}
        </div>
        <div className="mt-2">
            {props.text}
        </div>
    </div>
}