// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { AiOutlineLink } from "react-icons/ai";

// // simple cn helper
// function cn(...classes: Array<string | undefined | null | false>) {
//   return classes.filter(Boolean).join(" ");
// }

// interface WobbleCardProps {
//   children: React.ReactNode;
//   title: string;
//   link?: string;
//   containerClassName?: string;
//   className?: string;
// }

// export const WobbleCard: React.FC<WobbleCardProps> = ({
//   children,
//   title,
//   link,
//   containerClassName,
//   className,
// }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);

//   const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     const x = (event.clientX - (rect.left + rect.width / 2)) / 20;
//     const y = (event.clientY - (rect.top + rect.height / 2)) / 20;
//     setMousePosition({ x, y });
//   };

//   return (
//     <section
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => {
//         setIsHovering(false);
//         setMousePosition({ x: 0, y: 0 });
//       }}
//       style={{
//         transform: isHovering
//           ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
//           : "translate3d(0px, 0px, 0)",
//         transition: "transform 0.1s ease-out",
//       }}
//       className={cn(
//         "mx-auto w-[360px] sm:w-[420px] bg-indigo-800 rounded-2xl overflow-hidden relative",
//         containerClassName
//       )}
//     >
//       {/* Top Title + Link Button */}
//       <div className="relative w-full">
//         <h2
//           className="absolute top-4 left-4 max-w-[70%] text-white text-lg font-semibold break-words"
//         >
//           {title}
//         </h2>

//         {/* Link Button */}
//         {link && (
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="absolute top-4 right-4 flex items-center text-white bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-sm"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <AiOutlineLink className="w-6 h-6" />
//           </a>
//         )}
//       </div>

//       {/* Purple card body */}
//       <div
//         className="relative h-full [background-image:radial-gradient(80%_100%_at_top,rgba(255,255,255,0.35),rgba(255,255,255,0))] sm:rounded-2xl overflow-hidden"
//         style={{
//           boxShadow:
//             "0 10px 32px rgba(34,42,53,0.12), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.05)",
//         }}
//       >
//         <motion.div
//           style={{
//             transform: isHovering
//               ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
//               : "translate3d(0px,0px,0) scale3d(1,1,1)",
//             transition: "transform 0.1s ease-out",
//           }}
//           className={cn("h-full px-4 py-6 sm:px-6 relative", className)}
//         >
//           <Noise />
//           <div className="relative z-10">{children}</div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// const Noise: React.FC = () => (
//   <div
//     className="absolute inset-0 w-full h-full scale-[1.2] opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
//     style={{
//       backgroundImage: "url(/noise.webp)",
//       backgroundSize: "30%",
//     }}
//   />
// );
