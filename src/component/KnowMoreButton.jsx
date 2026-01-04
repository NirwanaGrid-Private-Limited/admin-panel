import React from 'react'
import GreenArrow from './GreenArrow'

function KnowMoreButton({ text = "Know More", onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-2 bg-transparent text-slate-900 border-2 border-black cursor-pointer font-semibold relative inline-block overflow-hidden transition-all duration-[350ms] ease-in-out group hover:scale-105 hover:shadow-lg active:scale-95 ${className}`} 
      style={{ fontSize: 'clamp(16px, 4vw, 24px)', height:'clamp(50px, 10vw, 66px)', width: 'clamp(150px, 40vw, 203px)' }}
    >
          <span className="absolute inset-0 w-0 bg-[#007bff] z-[-1] transition-all duration-[350ms] ease-in-out group-hover:w-full"></span>
          <span className="relative z-[1] flex items-center justify-center gap-1 h-full">
            {text} <GreenArrow />
          </span>
        </button>
  )
}

export default KnowMoreButton
