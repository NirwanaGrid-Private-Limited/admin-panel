import React from "react";

export default function PaginationDots({ total, current, onClick, activeWidth = "w-6", inactiveWidth = "w-3", activeColor = "bg-[#3a8bca]", inactiveColor = "bg-white/20", className = "mt-6 flex gap-2 justify-center" }) {
  return (
    <div className={className}>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          onClick={() => onClick(idx)}
          className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${idx === current ? `${activeWidth} ${activeColor}` : `${inactiveWidth} ${inactiveColor} hover:bg-white/40`}`}
        />
      ))}
    </div>
  );
}
