import type { ReactElement } from "react"

interface side {
    text: string,
    icon: ReactElement
}
export function SidebarItem(props: side) {

    return <div className="flex text-gray-700 pl-8 cursor-pointer hover:bg-gray-200 ">
        <div className="p-2">
            {props.icon}
        </div>
        <div className="mt-2">
            {props.text}
        </div>
    </div>
}