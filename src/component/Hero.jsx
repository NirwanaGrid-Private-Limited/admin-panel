import React from 'react'
import rectangleGradient from '../assets/gradient11.png'
import rectangleGradient1 from '../assets/gradient22.png'
import TextType from './TextType'
import KnowMoreButton from './KnowMoreButton'

function Hero({ text, text2, text3, handleTextChange }) {
  return (
    <div className="w-full h-[100%] relative">
      <div 
        className="absolute md:left-[10%] md:top-[120px] sm:left-[5%] sm:top-[100px] lg:left-[125px] lg:top-[190px] lg:w-[563px] md:w-[80%] sm:w-[90%] font-roboto font-semibold text-white text-[clamp(28px,5vw,70px)] leading-[clamp(38px,6vw,80px)] tracking-[0%] w-[clamp(280px,80vw,563px)] h-auto rotate-0 z-10"
      >
        <div className="flex flex-col">
          <span className="break-words break-words whitespace-nowrap">
            {text} <TextType 
              text={["Home","Office","College"]}
              as="span"
              typingSpeed={75}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              textColors={['#A5FF46']}
              cursorClassName="text-[#A5FF46]"
              onSentenceComplete={handleTextChange}
            />
          </span>
          <span className="block w-[clamp(280px,80vw,563px)] break-words break-words">{text2}</span>
          <span className="block w-[clamp(280px,80vw,563px)] text-[clamp(16px,3.5vw,20px)] leading-[clamp(22px,4.5vw,32px)] font-normal mt-[2px] text-white break-words  font-avenir tracking-[0.05em]">{text3}</span>
          <KnowMoreButton />
        </div>
      </div>
      <img 
        src={rectangleGradient} 
        alt="Rectangle Gradient" 
        className='absolute inset-0 z-0'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <div 
        className='absolute inset-0 bg-[#172D3E] opacity-43 z-0'
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}

export default Hero