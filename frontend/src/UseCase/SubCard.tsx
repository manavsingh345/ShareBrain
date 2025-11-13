import UseSmall from "./UseSmall";

export default function SubCard(){
    return (
        <div className="flex px-12 ">

            <div className="flex flex-col gap-4 flex-wrap mr-6">
                <UseSmall text="Capture ideas instantly with side panel"/>
                <UseSmall text="Multi-source AI chat"/>
                <UseSmall text="Chrome extension for quick saves"/>
            </div>

            <div className="flex flex-col gap-4  flex-wrap ">
                <UseSmall text="Auto-organized knowledge base"/>
                <UseSmall text="Smart tags and projects"/>
                <UseSmall text="Searchable virtual memory"/>
            </div>

            </div>
    )
}