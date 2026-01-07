import React, { useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import { QuickLinksSection } from '../component/Quicklink1'
import { Houseinstall } from '../component/Houseinstall'
import WhyChoose from '../component/Whychoose'
import {InnovationsSection} from '../component/innovationtab'
import { Testimonial } from '../component/Testimonial'
import TechSpecs from '../component/TechSpecs'
import DownloadApp from '../component/DownloadApp'


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
    <div className='overflow-x-hidden relative pt-[60px] sm:pt-[70px] md:pt-[80px] bg-white text-slate-900'>
      <div className='w-[100vw] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:h-[100vh] bg-[#E5E0D8] bg-gradient-to-l relative'>
        <Background heroCount={currentTextIndex} />
        <Hero 
          text={heroText} 
          text2 ={heroText2} 
          text3={heroText3} 
          currentTextIndex={currentTextIndex} 
          handleTextChange={handleTextChange}
        />
      </div>
      <div >
        <QuickLinksSection />
      </div>
      <div>
        <Houseinstall />
      </div>
      <div>
        <WhyChoose />
      </div>
      <div>
        <InnovationsSection />
      </div>
      <div>
        <Testimonial />
      </div>
      <div>
        <TechSpecs />
      </div>
      <div>
        <DownloadApp />
      </div>
    </div>
  )
}

export default Home