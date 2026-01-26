import { Play } from "lucide-react";
import PaginationDots from "./ui/PaginationDots";
import NavigationButtons from "./NavigationButtons";
import { useState } from "react";
const videos = [
  "Power Module Installation",
  "Smart Switch Configuration",
  "App Setup & Pairing",
  "Voice Assistant Integration",
  "Remote Monitoring Demo",
  "Energy Saving Tips"
];
function VideosSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const totalVideos = videos.length;
  const visibleVideos = videos.slice(startIndex, startIndex + visibleCount);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < totalVideos;

  const goToPrev = () => {
    if (canGoPrev) setStartIndex(startIndex - 1);
  };
  const goToNext = () => {
    if (canGoNext) setStartIndex(startIndex + 1);
  };
  const handleDotClick = (idx) => {
    setStartIndex(idx);
  };

  return (
    <section className="py-0 bg-white text-black mb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#08213E]">Simplifying</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008fff] via-[#4abcc5] to-[#a5ff46]">Smart Living</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-4xl">
            Explore guided videos that show how smart automation blends effortlessly into your space, with simple installation and intuitive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {visibleVideos.map((title, idx) => (
            <div key={startIndex + idx} className="group cursor-pointer">
              <div
                className="relative aspect-video border border-[#312e75] overflow-hidden mb-4"
                style={{ background: '#0A093433' }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold border-l-4 border-[#83b9e3] pl-3">
                {title}
              </h3>
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-5xl mx-auto items-center justify-between">
          <div className="flex justify-start w-1/2">
            <PaginationDots
              total={totalVideos - visibleCount + 1}
              current={startIndex}
              onClick={handleDotClick}
              className="flex gap-2"
              activeColor="bg-[#08213E]"
              inactiveColor="bg-[#08213E]/40"
            />
          </div>
          <div className="flex justify-end w-1/2">
            <NavigationButtons
              currentSlide={startIndex}
              setCurrentSlide={setStartIndex}
              totalSlides={totalVideos - visibleCount + 1}
              goToPrevious={goToPrev}
              goToNext={goToNext}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              borderColor="#08213E"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export {
  VideosSection
};
