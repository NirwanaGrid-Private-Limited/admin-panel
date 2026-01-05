import { useState, useEffect } from "react";
import { INNOVATIONS_DATA } from "./mockData";
import KnowMoreButton from "./KnowMoreButton";
import GreenArrow from "./GreenArrow";

const categories = ["Commercial", "Industrial"];
function InnovationsSection() {
  const [activeTab, setActiveTab] = useState("Commercial");
  const [items, setItems] = useState([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  
  useEffect(() => {
    const filtered = INNOVATIONS_DATA.filter((item) => item.category === activeTab);
    // Only take first 2 items
    setItems(filtered.slice(0, 2));
  }, [activeTab]);

  return <section className="bg-[#f2f2f2]">
      {/* Heading Section with Dark Background */}
      <div className="bg-[#172D3E]/[0.43] py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-start md:items-start">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold text-white text-center md:text-left leading-tight sm:leading-snug lg:leading-[86px] md:pl-8 lg:pl-16"
            style={{ 
              fontFamily: '"Nexa Bold", sans-serif',
              textShadow: '0px 5px 7px rgba(0, 0, 0, 0.25)'
            }}
          >
            Discover our NirwanaGrid innovations
          </h2>
          
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Tabs Sidebar */}
          <div className="flex flex-row lg:flex-col gap-4 justify-center flex-shrink-0">
            {categories.map((cat) => <KnowMoreButton
    key={cat}
    text={cat}
    onClick={() => setActiveTab(cat)}
    className={activeTab === cat ? "shadow-md" : "opacity-60 hover:opacity-100"}
  />)}
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] bg-[#090D40] self-stretch min-h-[300px] lg:ml-4 xl:ml-8"></div>

          {/* Content Area */}
          <div className="flex-1 flex justify-center lg:justify-start lg:ml-4 xl:ml-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-6 xl:gap-16">
              {items.map((item, idx) => <div 
                key={item.id} 
                className={`flex flex-col w-[280px] sm:w-[300px] md:w-[280px] lg:w-[260px] xl:w-[400px] 2xl:w-[480px] transition-all duration-300 ${hoveredCardIndex === idx ? 'scale-105 -translate-y-2' : ''}`}
                style={{ borderRadius: '0' }}
              >
                <div 
                  className={`group bg-white/80 h-[280px] sm:h-[300px] md:h-[280px] lg:h-[280px] xl:h-[380px] 2xl:h-[420px] transition-all duration-300 relative overflow-hidden ${hoveredCardIndex === idx ? 'shadow-2xl' : 'hover:shadow-lg'}`}
                  style={{ 
                    border: '1.2px solid #08213E',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)'
                  }}
                >
                  <div className={`absolute inset-0 transition-colors duration-300 ${hoveredCardIndex === idx ? 'bg-[#98a8bc]/90' : 'bg-[#b8c0cc]/80 group-hover:bg-[#a8b0bc]/80'}`} />
                  
                  <div className="absolute top-6 left-6 right-6">
                      <h3 className="text-lg font-bold text-[#08213e]">
                          {item.title}
                      </h3>
                  </div>
                </div>

                <div 
                  className={`bg-[#faf9f6] p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${hoveredCardIndex === idx ? 'bg-[#007bff]' : 'hover:bg-white'}`}
                  style={{ 
                    border: '1.2px solid #08213E',
                    borderTop: 'none'
                  }}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <span className={`font-medium text-base ${hoveredCardIndex === idx ? 'text-[#80C537]' : 'text-[#08213e]'}`}>Know More</span>
                  <GreenArrow color={hoveredCardIndex === idx ? "#80C537" : "#000000"} />
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
}
export {
  InnovationsSection
};
