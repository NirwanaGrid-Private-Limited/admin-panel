import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

 const CTA = () => {
  return (
    <section className="py-24 bg-white text-center transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f4584] tracking-wide mb-6 transition-colors duration-300"
        >
          Not Sure Which One Fits?
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[#08213e]/80 mb-12 transition-colors duration-300"
        >
          Tell us about your space. We’ll guide you.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block"
        >
            <button className="group relative overflow-hidden bg-white border-2 border-[#08111f] text-[#192f41] text-xl font-semibold py-4 px-12 flex items-center gap-4 hover:bg-[#061e30] hover:text-white transition-all duration-300 shadow-[8px_8px_0px_#061e30]">
                <span>Connect To Us Directly</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;