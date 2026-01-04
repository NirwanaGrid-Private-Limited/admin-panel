import { useState, useEffect, useRef } from "react";
import { INNOVATIONS_DATA } from "./mockData";
import KnowMoreButton from "./KnowMoreButton";
import GreenArrow from "./GreenArrow";

const categories = ["Commercial", "Industrial"];
function InnovationsSection() {
  const [activeTab, setActiveTab] = useState("Commercial");
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const filtered = INNOVATIONS_DATA.filter((item) => item.category === activeTab);
    setItems(filtered);
    setCurrentIndex(0);
  }, [activeTab]);

  // Auto-loop carousel
  useEffect(() => {
    if (items.length <= 2 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % items.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  // Get current 2 items to display (loops back to start)
  const getVisibleItems = () => {
    if (items.length === 0) return [];
    const visibleItems = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  return <section className="bg-[#f2f2f2] py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-[#08111f] mb-12 text-center md:text-left">
          Discover our NirwanaGrid innovations
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Tabs Sidebar */}
          <div className="flex flex-row md:flex-col gap-4">
            {categories.map((cat) => <KnowMoreButton
    key={cat}
    text={cat}
    onClick={() => setActiveTab(cat)}
    className={activeTab === cat ? "shadow-md" : "opacity-60 hover:opacity-100"}
  />)}
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] bg-[#08111f]/20 self-stretch min-h-[300px]"></div>

          {/* Content Area */}
          <div 
            className="flex-1 flex justify-center md:justify-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {getVisibleItems().map((item, idx) => <div key={`${item.id}-${idx}`} className="flex flex-col w-[280px] md:w-[320px]">
                <div className="group bg-white border border-[#08111f] h-[180px] md:h-[200px] hover:shadow-lg transition-shadow relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#b8c0cc] group-hover:bg-[#a8b0bc] transition-colors" />
                  
                  <div className="absolute top-6 left-6 right-6">
                      <h3 className="text-lg font-bold text-[#08213e]">
                          {item.title}
                      </h3>
                  </div>
                </div>

                <div className="bg-[#faf9f6] p-4 border border-t-0 border-[#08111f] flex items-center justify-between cursor-pointer hover:bg-white transition-colors">
                  <span className="font-medium text-base text-[#08213e]">Know More</span>
                  <GreenArrow color="#000000" />
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
