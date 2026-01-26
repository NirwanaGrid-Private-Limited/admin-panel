import { useState, useEffect } from "react";
import imgTestimonialSectionImg from "../assets/tetstimonialsec.png";
import imgStandingMan from "../assets/gifdownlaodsec.gif";
import { TESTIMONIALS_DATA } from "./mockData";
import NavigationButtons from "./NavigationButtons";
import PaginationDots from "./ui/PaginationDots";

function Testimonial() {
  const textTestimonials = TESTIMONIALS_DATA.filter((t) => !t.isVideo);
  const videoTestimonials = TESTIMONIALS_DATA.filter((t) => t.isVideo);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isVideoSliding, setIsVideoSliding] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  // Wrapper for setCurrentVideoIndex that also pauses the loop
  const handleSetVideoIndex = (indexOrFn) => {
    setIsArrowClicked(true);
    setIsVideoSliding(true);
    setTimeout(() => {
      if (typeof indexOrFn === 'function') {
        setCurrentVideoIndex(indexOrFn);
      } else {
        setCurrentVideoIndex(indexOrFn);
      }
      setIsVideoSliding(false);
    }, 300);
  };

  // Handle mouse leave from video section - resume loop
  const handleVideoSectionMouseLeave = () => {
    setIsVideoHovered(false);
    setIsArrowClicked(false);
  };

  // Auto-loop through text testimonials - shows each one, then repeats from beginning
  useEffect(() => {
    // Only start loop if there's more than one testimonial and not hovered
    if (textTestimonials.length <= 1 || isTextHovered) return;
    
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex >= textTestimonials.length ? 0 : nextIndex;
        });
        setIsSliding(false);
      }, 300);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [textTestimonials.length, isTextHovered]);

  // Auto-loop through video testimonials
  useEffect(() => {
    if (videoTestimonials.length <= 1 || isVideoHovered || isArrowClicked) return;
    
    const interval = setInterval(() => {
      setIsVideoSliding(true);
      setTimeout(() => {
        setCurrentVideoIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex >= videoTestimonials.length ? 0 : nextIndex;
        });
        setIsVideoSliding(false);
      }, 300);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [videoTestimonials.length, isVideoHovered, isArrowClicked]);

  // Get current testimonial, fallback to first one if index is invalid
  const currentTestimonial = textTestimonials[currentIndex] || textTestimonials[0];
  
  // Get current and next video card to display (one full, one half-peeking)
  const getVisibleVideos = () => {
    if (videoTestimonials.length === 0) return [];
    const current = videoTestimonials[currentVideoIndex] || videoTestimonials[0];
    // Next index wraps around
    const nextIndex = (currentVideoIndex + 1) % videoTestimonials.length;
    const next = videoTestimonials[nextIndex];
    // If only one video, show just one
    if (videoTestimonials.length === 1) return [current];
    return [current, next];
  };
  return <>
    {/* Heading Section with Dark Background - Same as Innovation section */}
    <div className="bg-[#172D3E]/[0.43] py-4 sm:py-5 md:py-6">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-start md:items-start">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold text-white text-center md:text-left leading-tight sm:leading-snug lg:leading-[86px] md:pl-8 lg:pl-16"
          style={{ 
            fontFamily: '"Nexa Bold", sans-serif',
            textShadow: '0px 5px 7px rgba(0, 0, 0, 0.25)'
          }}
        >
          What Our Customers Say
        </h2>
      </div>
    </div>

    {/* Content Section */}
    <section className="relative py-6 bg-[#172D3E]/[0.43] overflow-hidden">
      {
    /* Background Image */
  }
      <div className="absolute inset-0 opacity-20">
        <img
    src={imgTestimonialSectionImg}
    alt="Background"
    className="w-full h-full object-cover"
  />
      </div>

      <div className="container mx-auto px-4 md:px-2 lg:px-16  relative z-10">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center flex-wrap ">
          
          {/* Standing Man Image - Left Side */}
          <div className="hidden lg:flex pl-2 flex-shrink-0 items-center">
            <img 
              src={imgStandingMan} 
              alt="Customer" 
              className="w-[373px] h-[370px]"
              style={{
                objectFit: 'cover',
                boxShadow: '0px 25px 30.1px 0px rgba(0, 0, 0, 0.25)'
              }}
            />
            {/* Vertical white line */}
            <div style={{
              width: '2px',
              height: '380px',
              background: 'white',
              marginLeft: '24px',
              borderRadius: '1px',
              opacity: 0.7
            }} />
          </div>

          {
    /* Main Card */
  }
          <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-[400px]">
             {currentTestimonial && <div 
               className={`bg-white/10 backdrop-blur-md border border-[#312e75] rounded-[40px] p-8 md:p-12 text-white transition-all duration-500 ${isSliding ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
               onMouseEnter={() => setIsTextHovered(true)}
               onMouseLeave={() => setIsTextHovered(false)}
             >
                  <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gray-300 rounded-full" />
                      <div>
                          <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                          <p className="text-white/60 text-sm">{currentTestimonial.date}</p>
                      </div>
                  </div>
                  <p className="text-xl leading-relaxed">
                      "{currentTestimonial.content}"
                  </p>
                  <div className="mt-8 flex gap-2">
                       {textTestimonials.map((_, idx) => (
                         <div 
                           key={idx}
                           onClick={() => {
                             setIsSliding(true);
                             setTimeout(() => {
                               setCurrentIndex(idx);
                               setIsSliding(false);
                             }, 300);
                           }}
                           className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#3a8bca]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                         />
                       ))}
                  </div>
               </div>}
          </div>

          {
    /* Video Cards (Right Side) with Navigation Arrows */
  }
          <div 
            className="w-full lg:w-auto flex flex-col items-end justify-center  pr-0 lg:pr-2 xl:pr-8 2xl:pr-16"
            style={{ alignItems: 'flex-end', marginLeft: 'auto' }}
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={handleVideoSectionMouseLeave}
          >
            {/* Video Cards */}
            <div className="relative overflow-hidden w-full mt-16 md:mt-24 lg:mt-32 rounded-[32px]" style={{ maxWidth: 320 }}>
              <div
                className={`flex transition-transform duration-500`}
                style={{
                  width: `${videoTestimonials.length * 320}px`,
                  transform: `translateX(-${currentVideoIndex * 320}px)`
                }}
              >
                {videoTestimonials.map((video, idx) => (
                  <div
                    key={`${video.id}-${idx}`}
                    className="flex-shrink-0 w-[320px] h-[260px] md:h-[280px] lg:h-[300px] bg-white/10 backdrop-blur-md border border-[#312e75] rounded-[32px] shadow-xl transition-transform duration-300 relative overflow-hidden"
                    
                  >
                    {/* User info row */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#bcd6f7"/><ellipse cx="12" cy="17" rx="7" ry="4" fill="#bcd6f7"/></svg>
                        </div>
                        <span className="font-semibold text-base text-[#172D3E]">{video.name}</span>
                      </div>
                      <span className="text-xs text-[#172D3E] opacity-70">{video.date}</span>
                    </div>
                    {/* Video/image section */}
                    <div className="relative w-full h-[140px] md:h-[160px] lg:h-[180px] flex items-center justify-center px-6">
                      {video.videoThumbnail && (
                        <img
                          src={video.videoThumbnail}
                          alt="Video Review"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 cursor-pointer hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Optional testimonial text overlay (if present) */}
                    {video.content && (
                      <div className="px-6 pb-4 pt-2">
                        <p className="text-base text-[#172D3E] opacity-90 leading-snug">{video.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <PaginationDots
              total={videoTestimonials.length}
              current={currentVideoIndex}
              onClick={(idx) => {
                setIsArrowClicked(true);
                setIsVideoSliding(true);
                setTimeout(() => {
                  setCurrentVideoIndex(idx);
                  setIsVideoSliding(false);
                }, 300);
              }}
            />

            {/* Navigation Buttons - Below dots, aligned to the right */}
            <div className="mt-20 flex justify-end pr-0">
              <NavigationButtons 
                currentSlide={currentVideoIndex}
                setCurrentSlide={handleSetVideoIndex}
                totalSlides={videoTestimonials.length}
              />
            </div>
          </div>
        </div>

        {
    /* Stats */
  }
        <div className="mt-8 flex flex-col md:flex-row flex-wrap justify-between items-start border-t border-white/10 pt-4 relative z-50 border border-white/30 rounded-lg p-4 sm:p-6 md:p-8 gap-6 md:gap-8 lg:gap-0">
            {/* See how NirwanaGrid text - Left Side */}
            <div className="pl-2 sm:pl-4 md:pl-8 mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
              <h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-[120%] opacity-90 whitespace-nowrap"
                style={{ 
                  fontFamily: '"Nexa Bold", sans-serif',
                  textShadow: '0px 5px 7px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
              >
                <span className="block text-white">See how <span style={{color:'#3a8bca'}}>Nirwana</span><span style={{color:'#A5FF46'}}>Grid</span> is</span>
                <span className="block text-white">changing everyday living</span>
              </h2>
            </div>

            {/* Stats - Right Side */}
            <div className="flex flex-col md:flex-row flex-wrap gap-6 sm:gap-16 md:gap-32 lg:gap-48 w-full md:w-auto justify-center md:justify-end items-center md:items-start">
                <div className="relative z-50 mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
                    <h3 
                      className="text-5xl md:text-[81px] font-normal bg-clip-text text-transparent leading-[100%] relative z-50"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        backgroundImage: 'linear-gradient(105.69deg, #09083C -1.83%, rgba(18, 24, 83, 0.59) 105.27%)'
                      }}
                    >
                        200+
                    </h3>
                    <p 
                      className="text-lg md:text-[22px] mt-2 leading-[100%] font-normal bg-clip-text text-transparent relative z-50"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        backgroundImage: 'linear-gradient(105.69deg, #09083C -1.83%, rgba(18, 24, 83, 0.59) 105.27%)'
                      }}
                    >
                      Project Completed
                    </p>
                </div>
                <div className="text-center md:text-right relative z-50 w-full md:w-auto min-w-[120px]">
                    <h3 
                      className="text-5xl md:text-[81px] font-normal bg-clip-text text-transparent leading-[100%] relative z-50"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        backgroundImage: 'linear-gradient(105.69deg, #09083C -1.83%, rgba(18, 24, 83, 0.59) 105.27%)'
                      }}
                    >
                        100+
                    </h3>
                    <p 
                      className="text-lg md:text-[22px] mt-2 leading-[100%] font-normal bg-clip-text text-transparent relative z-50"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        backgroundImage: 'linear-gradient(105.69deg, #09083C -1.83%, rgba(18, 24, 83, 0.59) 105.27%)'
                      }}
                    >
                      Clients Satisfied
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  </>;
}
export {
  Testimonial
};