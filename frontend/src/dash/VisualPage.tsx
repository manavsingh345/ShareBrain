export default function VisualPage() {
  return (

    <div className="h-full w-full flex justify-center items-center ">
        <div className="absolute bg-violet-600 opacity-50 blur-[160px] rounded-full w-[600px] h-[600px] z-0"></div>
      <div className="aspect-video z-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg ">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/4prRwP2BjxM?autoplay=0&mute=0&rel=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

      </div>
      
    </div>
  );
}
