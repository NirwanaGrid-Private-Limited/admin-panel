import React from "react";
import { motion } from "framer-motion";
import SafetyFirstVideo from "../assets/SAFETY FIRST.mp4";
import Subtract from "../assets/Subtract.png";
import Rectangle80 from "../assets/Rectangle 80.png";

const PreventiveSystems = () => {
    return (
        <div className="w-full relative overflow-hidden py-20 lg:py-32">
            {/* Background Video (z-0) */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <video
                    src={SafetyFirstVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradient Overlay (z-5) */}
            <div className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none">
                <img
                    src={Subtract}
                    alt="Gradient Overlay"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 min-h-[500px] items-center">


                {/* Right side - Text Cards */}
                <div className="space-y-8 flex flex-col justify-center items-end lg:pr-12 lg:col-start-2">

                    {/* Card 1: Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ backgroundImage: `url("${Rectangle80}")` }}
                        className="w-full lg:w-[90%] bg-cover bg-center backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-2xl shadow-lg relative"
                    >
                        <p className="text-[#08213e] text-lg md:text-xl leading-relaxed">
                            Electrical systems often fail without warning, leading to fire hazards, equipment loss, downtime, and energy waste. Conventional protection reacts only after faults occur.
                        </p>
                    </motion.div>

                    {/* Card 2: Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        style={{ backgroundImage: `url("${Rectangle80}")` }}
                        className="w-full lg:w-[90%] bg-cover bg-center backdrop-blur-md border border-white/60 p-6 md:p-8 rounded-2xl shadow-xl relative"
                    >
                        <p className="text-[#08213e] text-lg md:text-xl leading-relaxed">
                            NirwanaGrid introduces preventive electrical intelligence systems that recognize early signs of failure and respond autonomously to protect people, assets, and infrastructure.
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default PreventiveSystems;
