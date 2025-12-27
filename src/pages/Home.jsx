import React, { useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import DefaultBackground from '../component/Quicklink1'
import Quicklink1 from '../component/Quicklink1'

function Home() {
   const heroText = "Upgrade Your" 
   const heroText2 = "To Smart Living" 
   const heroText3 = "Upgrade your space without changing a single appliance."
   const [currentTextIndex, setCurrentTextIndex] = useState(0)

   // Handle text changes from Hero component
   const handleTextChange = (text, index) => {
     setCurrentTextIndex(index)
   }

  return (
    <div className='overflow-x-hidden relative' style={{ paddingTop: '60px', sm: '70px', md: '80px',backgroundColor: '#05021A' }}>
      <div className='w-[100vw] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:h-[100vh] bg-[#E5E0D8] bg-gradient-to-l relative'>
        <Background heroCount={currentTextIndex} />
        <Hero 
          text={heroText} 
          text2 ={heroText2} 
          text3={heroText3} 
          currentTextIndex={currentTextIndex} 
          handleTextChange={handleTextChange}
        />
        <Quicklink1/>
      </div>
    </div>
  )
}

export default Home