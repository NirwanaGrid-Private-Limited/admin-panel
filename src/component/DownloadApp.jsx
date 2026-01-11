import imgImage5 from "../assets/appstoreicon.png";
import imgImage3 from "../assets/playstoreicon.png";

import bgImage from "../assets/AppDownload.png"; // Update path if needed

function DownloadApp() {
  return (
    <section className="relative overflow-hidden p-0 m-0">
      <div className="w-full overflow-hidden p-0 m-0" style={{position: 'relative', display: 'inline-block'}}>
        <img
          src={bgImage}
          alt="Isometric Smart Home View"
          className="w-full h-auto object-cover block p-0 m-0 align-top"
          style={{display: 'block', margin: 0, padding: 0, width: '100%', height: 'auto'}}
        />
        {/* Button container absolutely positioned on the image, left corner, responsive */}
           <div className="absolute top-1/2 sm:top-1/2 md:top-1/2 left-8 sm:left-16 md:left-24 flex flex-col md:flex-row gap-1 sm:gap-2 md:gap-4 items-center -translate-y-1/2 sm:-translate-y-1/2 md:-translate-y-1/2 z-10"
             style={{ top: '55%' }}>
          <button className="flex items-center gap-0.5 sm:gap-1 md:gap-2 border border-[#83b9e3] rounded-lg px-1 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur w-20 sm:w-10 md:w-32 lg:w-44 min-h-0">
            <img src={imgImage3} alt="Play Store" className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 object-contain" />
            <div className="text-left whitespace-nowrap md:text-xs lg:text-lg">
              <p className="text-[10px] sm:text-xs md:text-xs lg:text-lg font-semibold text-white">Google Play</p>
            </div>
          </button>
          <button className="flex items-center gap-0.5 sm:gap-1 md:gap-2 border border-[#83b9e3] rounded-lg px-1 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur w-20 sm:w-24 md:w-32 lg:w-44 min-h-0">
            <img src={imgImage5} alt="App Store" className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 object-contain" />
            <div className="text-left whitespace-nowrap md:text-xs lg:text-lg">
              <p className="text-[10px] sm:text-xs md:text-xs lg:text-lg font-semibold text-white">App Store</p>
            </div>
          </button>
        </div>
      </div>
    </section>




  );
}

export default DownloadApp;

