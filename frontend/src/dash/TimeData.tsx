
import Button from "./Button";
import Card2 from "./Card2";


export default function TimeData(){
    return (
        <div className="bg-black min-h-screen ">
        <div className="flex justify-center py-30 gap-10">
            <Card2 heading="5 hours" text="Without SecondBrain"/>
            <Card2 heading="5 mins" text="With SecondBrain"/>
            <Card2 heading="100+" text="Happy Users"/>
        </div>
        <div className="flex justify-center">
         <Button width="290px" text="Start your second Brain" icon={<i className="fa-solid fa-arrow-right text-white pl-2 pt-1"></i>}/>
        </div>
         
        </div>
    )
}