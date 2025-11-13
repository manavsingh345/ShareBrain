interface Cont {
  text: string;
}

export default function UseSmall(props: Cont) {
  return (
    <div className="h-12 w-96 bg-[#141935] border  border-gray-800 rounded-lg flex items-center px-3">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex-shrink-0 mr-3"></div>
      <span className="text-gray-300 text-md">{props.text}</span>
    </div>
  );
}
