import imgImage2 from "../assets/downloadappback.png";
import imgMockuup1 from "../assets/downloadappmobil.png";
import imgQrCodeBeeIs11 from "../assets/qrimage.png";
import imgDroneIdr33 from "../assets/downloadappblackgradient.png";
import imgImage5 from "../assets/appstoreicon.png";
import imgImage3 from "../assets/playstoreicon.png";
function DownloadApp() {
  return <section className="relative h-auto min-h-[800px] overflow-hidden bg-[#08111f] py-20">
      {
    /* Background */
  }
      <div className="absolute inset-0 z-0">
        <img
    src={imgImage2}
    alt="Background"
    className="w-full h-full object-cover opacity-30 mix-blend-overlay"
  />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08111f] via-[#08111f]/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full">
        {
    /* Left Text */
  }
        <div className="lg:w-1/2 space-y-8 lg:pr-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Start enjoying the <br />
            <span className="text-[#3a8bca]">Nirwana</span><span className="text-[#a5ff46]">Grid</span> edge
          </h2>
          <p className="text-xl text-white/80 max-w-xl">
            Experience elevated living through a beautifully designed interface that lets you manage your home effortlessly, wherever you are.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            <button className="flex items-center gap-4 border border-[#83b9e3] rounded-lg px-6 py-3 bg-white/5 hover:bg-white/10 transition-colors">
              <img src={imgImage5} alt="Play Store" className="w-8 h-8 object-contain" />
              <div className="text-left">
                <p className="text-xs text-white uppercase tracking-wider">Get it on</p>
                <p className="text-xl font-semibold text-white">Google Play</p>
              </div>
            </button>
            <button className="flex items-center gap-4 border border-[#83b9e3] rounded-lg px-6 py-3 bg-white/5 hover:bg-white/10 transition-colors">
              <img src={imgImage3} alt="App Store" className="w-8 h-8 object-contain" />
              <div className="text-left">
                 <p className="text-xs text-white uppercase tracking-wider">Download on the</p>
                 <p className="text-xl font-semibold text-white">App Store</p>
              </div>
            </button>
          </div>
        </div>

        {
    /* Right Phone + QR */
  }
        <div className="lg:w-1/2 relative mt-16 lg:mt-0 flex justify-center lg:justify-end">
           {
    /* Drone behind phone */
  }
           <img
    src={imgDroneIdr33}
    className="absolute top-[-100px] left-[-100px] w-[500px] opacity-20 animate-pulse pointer-events-none"
    alt=""
  />
           
           <div className="relative">
              <img
    src={imgMockuup1}
    alt="App Mockup"
    className="relative z-10 max-h-[600px] w-auto drop-shadow-2xl"
  />
              
              {
    /* QR Code Card */
  }
              <div className="absolute -bottom-10 -left-10 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl max-w-[220px]">
                 <img src={imgQrCodeBeeIs11} alt="QR Code" className="w-full h-auto rounded-lg mb-4" />
                 <p className="text-white text-center font-semibold text-sm">
                   Scan to download instantly
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>;
}
export default DownloadApp;