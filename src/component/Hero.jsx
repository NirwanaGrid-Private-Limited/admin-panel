import React from 'react'
import rectangleGradient from '../assets/gradient11.png'
import TextType from './TextType'
import KnowMoreButton from './KnowMoreButton'

function Hero({ text, text2, text3, handleTextChange }) {
  return (
    <div className="relative w-full 
      min-h-[100vh] 
      sm:min-h-[90vh] 
      md:min-h-[85vh] 
      lg:min-h-[100vh] 
      overflow-hidden">

      {/* TEXT CONTENT */}
      <div 
        className="absolute 
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        sm:left-[5%] sm:top-[100px] sm:translate-x-0 sm:translate-y-0
        md:left-[10%] md:top-[120px]
        lg:left-[125px] lg:top-[190px] 
        w-[clamp(280px,90vw,563px)]
        sm:w-[clamp(280px,80vw,563px)]
        font-roboto font-semibold 
        text-slate-900 
        text-[clamp(24px,5vw,70px)] 
        sm:text-[clamp(28px,5vw,70px)] 
        leading-[clamp(34px,6vw,80px)]
        sm:leading-[clamp(38px,6vw,80px)]
        z-10
        text-center sm:text-left"
      >
        <div className="flex flex-col">
          <span className="whitespace-nowrap">
            {text}{' '}
            <TextType 
              text={["Home","Office","College"]}
              as="span"
              typingSpeed={75}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              className="text-white"
              cursorClassName="text-white"
              onSentenceComplete={handleTextChange}
            />
          </span>

          <span className="block mt-1">
            {text2}
          </span>

          <span className="block 
            text-[clamp(16px,3.5vw,20px)] 
            leading-[clamp(22px,4.5vw,32px)] 
            font-normal mt-2 
            text-slate-700 
            font-avenir tracking-[0.05em]">
            {text3}
          </span>

          <KnowMoreButton />
        </div>
      </div>

      {/* GRADIENT BACKGROUND */}
      <img 
        src={rectangleGradient} 
        alt="Gradient Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    </div>
  )
}

export default Hero
