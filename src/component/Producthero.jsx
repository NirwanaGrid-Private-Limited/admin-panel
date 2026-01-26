import React from "react";
import { motion } from "framer-motion";

import imgBlueAndWhiteModernZoomVirtualMeetingBackground1 from "../assets/updowngradient.png";

const Producthero = () => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-white transition-colors duration-300">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10 transition-colors duration-300"></div>
          <img
            src={imgBlueAndWhiteModernZoomVirtualMeetingBackground1} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
      </div>
      {/* Abstract Shapes/Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 blur-3xl rounded-full pointer-events-none transition-colors duration-300"></div>
      <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#08213e] leading-tight mb-6 transition-colors duration-300"
        >
          Smart power solutions designed around{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008fff] via-[#4abcc5] to-[#80c537]">
            how you use your space.
          </span>
        </motion.h1>
      </div>
    </section>
  );
};

export default Producthero;