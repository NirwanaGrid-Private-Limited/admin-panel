import imgTechnologyThatWorksForYou from "../assets/techworkforugradient.png";
import { Zap, Shield, ThumbsUp } from "lucide-react";
import { useState } from "react";
import PaginationDots from "./ui/PaginationDots";
import NavigationButtons from "./NavigationButtons";
const techs = [
  {
    title: "Energy saving",
    icon: Zap,
    desc: "Smarter energy usage allows you to track, manage, and optimize power consumption, leading to consistent savings on electricity bills. It helps reduce wastage, control usage better, and lower monthly energy costs over time."
  },
  {
    title: "Safety",
    icon: Shield,
    desc: "Designed to protect your home with built-in fault detection and automatic cut-off. It helps prevent overheating, electrical damage, and fire risks, keeping your appliances and living space safe at all times."
  },
  {
    title: "Reliability",
    icon: ThumbsUp,
    desc: "Works smoothly every day and supports Alexa and Google Assistant. You can control your home easily using voice or the app, and it comes with a minimum warranty for added peace of mind."
  },
  {
    title: "Smart Scheduling",
    icon: Zap,
    desc: "Automate your home routines with smart scheduling features, making your life easier and more efficient."
  },
  {
    title: "Remote Monitoring",
    icon: Shield,
    desc: "Monitor your home from anywhere, anytime, with real-time alerts and status updates."
  },
  {
    title: "Easy Installation",
    icon: ThumbsUp,
    desc: "Quick and hassle-free installation process, so you can start enjoying smart living immediately."
  }
];
function TechSpecs() {
  // Show all cards, no carousel
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const totalCards = techs.length;
  const visibleTechs = techs.slice(startIndex, startIndex + visibleCount);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < totalCards;

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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center md:text-left bg-clip-text text-transparent bg-cover bg-center"
          style={{ backgroundImage: `url(${imgTechnologyThatWorksForYou})`, WebkitBackgroundClip: "text", lineHeight: 1.2, paddingBottom: '0.3em' }}
        >
          Technology That Works for You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {visibleTechs.map((tech, idx) => (
            <div key={startIndex + idx} className="flex flex-col items-center md:items-start h-full">
              {/* Card visual only */}
              <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow w-full min-h-[220px] md:min-h-[260px] flex items-center justify-center" style={{height: '260px'}} />
              {/* Title and Description below card */}
              <h3 className="mt-4 text-2xl font-semibold text-[#08213e] text-center md:text-left">{tech.title}</h3>
              <p className="mt-2 text-[#08213e] text-lg leading-relaxed opacity-90 text-left">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-5xl mx-auto items-center justify-between">
          <div className="flex-1  ">
            <PaginationDots
              total={totalCards - visibleCount + 1}
              current={startIndex}
              onClick={handleDotClick}
              className="flex gap-2 ml-8"
              activeColor="bg-[#08213E]"
              inactiveColor="bg-[#08213E]/40"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <NavigationButtons
              currentSlide={startIndex}
              setCurrentSlide={setStartIndex}
              totalSlides={totalCards - visibleCount + 1}
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

export default TechSpecs;