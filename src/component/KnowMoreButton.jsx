import React from 'react'
import GreenArrow from './GreenArrow'

function KnowMoreButton() {
  return (
    <button className="mt-[100px] px-3 py-2 bg-transparent text-white border-2 border-[#007bff] cursor-pointer font-semibold relative inline-block overflow-hidden transition-all duration-[350ms] ease-in-out group" style={{ fontSize: 'clamp(16px, 4vw, 24px)', height:'clamp(50px, 10vw, 66px)', width: 'clamp(150px, 40vw, 203px)' }}>
          <span className="absolute inset-0 w-0 bg-[#007bff] z-[-1] transition-all duration-[350ms] ease-in-out group-hover:w-full"></span>
          <span className="relative z-[1] flex items-center justify-center gap-1 h-full">
            Know More <GreenArrow />
          </span>
        </button>
  )
}

export default KnowMoreButton
