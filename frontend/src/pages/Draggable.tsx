
import { Rnd } from "react-rnd";
import ChatBot from "./ChatBot";


interface DraggableChatBotProps {
  onClose: () => void;
}

export default function DraggableChatBot({onClose}:DraggableChatBotProps ) {
  return (
    
    <Rnd
  default={{
    x: window.innerWidth - 420,   // always inside screen
    y: window.innerHeight - 20,  // stick to bottom, not too high
    width: 380,
    height: "auto",
  }}
  enableResizing={false}
  bounds="window"
  dragHandleClassName="drag-header"
>
  <ChatBot onClose={onClose} />
</Rnd>

  );
}
