import GreenArrow from "./GreenArrow";
import element1 from "../assets/elements 1.png";
import element2 from "../assets/element2.png";
import NavigationButtons from "./NavigationButtons";
import { useState, useEffect, useRef } from "react";

const links = [
  "Our solution",
  "Enquiry now",
  "What makes us different",
  "Installation support",
  "warranty",
  "Know us more"
];
const problems = [
  {
    text: "Electricity bills keep going up due to unmanaged usage",
    icon: element1,
    opacity: "opacity-100"
  },
  {
    text: "No health monitoring leads to higher repair costs",
    icon: element2,
    opacity: "opacity-60"
  },
  {
    text: "Hidden electrical faults increase fire and failure risks",
    icon: null,
    // Just text or maybe a placeholder
    opacity: "opacity-60"
  }
];
function QuickLinksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Auto-loop effect
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % problems.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return <section className="py-3 md:py-6 lg:py-8 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 relative">
          
          {/* Quick Links Column */}
          <div className="md:col-span-1 lg:col-span-5 space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-[32px] lg:text-[42px] xl:text-[42px] 2xl:text-[52px] font-normal text-[#08111f] leading-tight md:leading-[50px] lg:leading-[70px] xl:leading-[70px] 2xl:leading-[86px] text-center md:text-left" style={{fontFamily: 'Avenir LT Std', fontWeight: 400, textShadow: '0px 5px 7px rgba(0, 0, 0, 0.25)'}}>Quick links</h2>
            <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-6 xl:gap-y-6 2xl:gap-y-9 gap-x-2 sm:gap-x-4 md:gap-x-4 lg:gap-x-6 xl:gap-x-6 2xl:gap-x-120 justify-items-center md:justify-items-start">
              {links.map((link, idx) => <a key={idx} href="#" className="flex items-center justify-between group text-[#08111f] text-xs sm:text-sm md:text-xs lg:text-sm xl:text-sm 2xl:text-[28px] hover:text-[#A5FF46] transition-colors py-1 2xl:py-2 whitespace-nowrap min-w-[130px] sm:min-w-[150px] md:min-w-[140px] lg:min-w-[170px] xl:min-w-[180px] 2xl:min-w-[380px]" style={{fontFamily: 'Avenir LT Std', fontWeight: 400, textShadow: '0px 5px 7px rgba(0, 0, 0, 0.25)'}}>
                  <span>{link}</span>
                  <span className="w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 2xl:w-5 2xl:h-5 ml-1 sm:ml-2 md:ml-2 lg:ml-3 xl:ml-3 2xl:ml-12 flex items-center justify-center flex-shrink-0">
                    <GreenArrow />
                  </span>
                </a>)}
            </div>
          </div>

          {/* Vertical Divider - shown on 2xl and up only */}
          <div className="hidden 2xl:block absolute left-2/3 top-0 bottom-0 w-px bg-[#08111f] transform -translate-x-1/2" />

          {/* Horizontal Divider - shown only on mobile */}
          <div className="block md:hidden w-full h-px bg-[#08111f] my-4" />

          {/* Existing Problems Column */}
          <div className="md:col-span-1 lg:col-span-7 space-y-4 md:space-y-6 lg:space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start lg:justify-end gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              <h2 className="text-2xl sm:text-3xl md:text-[24px] lg:text-[32px] xl:text-[40px] font-normal text-[#08111f] leading-tight md:leading-[40px] lg:leading-[60px] xl:leading-[86px] text-center md:text-left" style={{fontFamily: 'Avenir LT Std', fontWeight: 400, textShadow: '0px 5px 7px rgba(0, 0, 0, 0.4)'}}>Existing Problems</h2>
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <NavigationButtons currentSlide={currentIndex} setCurrentSlide={setCurrentIndex} totalSlides={problems.length} />
              </div>
            </div>
            
            <div className="relative bg-white overflow-hidden w-full max-w-[260px] sm:max-w-[280px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[400px] 2xl:max-w-[450px] mx-auto md:mx-0 lg:ml-auto lg:mr-0">
                <div className="flex transition-transform duration-300" style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                    {problems.map((item, idx) => <div key={idx} className={`relative flex flex-col justify-between p-2 md:p-3 lg:p-4 border-2 border-[#08111f] rounded-lg bg-white flex-shrink-0 w-full transition-opacity duration-300 min-h-[150px] sm:min-h-[170px] md:min-h-[180px] lg:min-h-[220px] xl:min-h-[260px] 2xl:min-h-[280px] ${idx === currentIndex ? 'opacity-100' : 'opacity-40'}`}>
                           <div className="h-12 sm:h-16 md:h-16 lg:h-20 xl:h-28 2xl:h-32 w-full relative mb-2 md:mb-3 lg:mb-4">
                               {item.icon && <img src={item.icon} alt="" className="object-contain w-full h-full object-left" />}
                           </div>
                           <p className="text-[#08111f] text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl leading-snug" style={{fontFamily: 'Avenir LT Std', fontWeight: 600, textAlign: 'left', textShadow: '0px 4px 10px rgba(5, 9, 57, 0.46)'}}>
                               {item.text}
                           </p>
                        </div>)}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
export {
  QuickLinksSection
};
