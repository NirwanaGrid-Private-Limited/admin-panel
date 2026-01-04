import imgLayer22 from "../assets/manstanding.png";
import whychooselogo from "../assets/whychooselogo.png";
import whychooselogo1 from "../assets/Whychooselogo1.png";
import whychooselogo2 from "../assets/Whychooselogo2.png";
import whychooselogo3 from "../assets/Whychooselogo3.png";

const features = [
  {
    title: "Predictive electrical intelligence that identifies risks before failures occur",
    icon: whychooselogo
  },
  {
    title: "Transforms legacy appliances into AI-enabled systems without rewiring",
    icon: whychooselogo1
  },
  {
    title: "Autonomous safety & smart scheduling for zero-effort energy control",
    icon: whychooselogo2
  },
  {
    title: "Always-on reliability with seamless offline and online operation",
    icon: whychooselogo3
  }
];
function WhyChoose() {
  return <section className="bg-white py-20 relative overflow-hidden">
        {
    /* Background Gradients/Effects could go here */
  }
        
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-[#0B1037] mb-16">
          Why <span className="text-[#62baff]">Nirwana</span><span className="text-[#a3ff43]">Grid</span> Stands Apart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {
    /* Features Grid */
  }
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => <div
    key={idx}
    className="bg-[#0B103714] backdrop-blur-md border border-[#0B1037]/20 rounded-3xl p-8 flex flex-col justify-start items-start hover:bg-[#0B103724] transition-colors"
  >
                <div className="w-[96px] h-[96px] mb-6">
                    <img src={feature.icon} alt="feature icon" className="w-[96px] h-[96px] object-contain opacity-100" />
                </div>
                <p className="text-[#0B1037]/90 text-lg md:text-xl font-medium leading-snug">
                  {feature.title}
                </p>
              </div>)}
          </div>

          {
    /* Image Side */
  }
          <div className="relative h-[600px] flex items-center justify-center">
            <img
    src={imgLayer22}
    alt="Worker with Question Mark"
    className="max-h-full max-w-full object-contain drop-shadow-2xl"
  />
          </div>
        </div>
      </div>
    </section>;
}
export default WhyChoose

