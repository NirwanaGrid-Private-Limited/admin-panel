import React from "react";
import { motion } from "framer-motion";
import { ChartNoAxesCombined, Settings, ShieldCheck, Wifi } from "lucide-react";

// Placeholder images - using existing assets where appropriate or generic placeholders if needed
import img1 from "../assets/manstanding.png";
import img2 from "../assets/houseinstall.png";
import img3 from "../assets/bg2.jpg";
import img4 from "../assets/houseinstall2.png"; // Using available assets as placeholders

const OurApproach = () => {
    const features = [
        {
            icon: <ChartNoAxesCombined className="w-8 h-8 text-[#a5ff46]" />,
            text: "Real-time electrical intelligence across connected appliances",
        },
        {
            icon: <Settings className="w-8 h-8 text-[#a5ff46]" />,
            text: "Early fault detection and risk recognition before failures occur",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#a5ff46]" />,
            text: "Autonomous safety actions to prevent damage and hazards",
        },
        {
            icon: <Wifi className="w-8 h-8 text-[#a5ff46]" />,
            text: "Secure global control and visibility of appliances from any location",
        },
    ];

    const images = [img1, img2, img3, img4];

    return (
        <div className="w-full py-20 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Content */}
                <div className="space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-[#08213e]"
                    >
                        Our <span className="text-[#3b82f6]">Approach</span>
                    </motion.h2>

                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center p-4 bg-[#333333] rounded-full shadow-lg hover:bg-[#404040] transition-colors group cursor-default"
                            >
                                <div className="p-3 bg-white/10 rounded-full mr-6 group-hover:bg-white/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <p className="text-white text-lg font-medium pr-4">
                                    {feature.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Image Slices */}
                <div className="h-[500px] md:h-[600px] flex justify-center items-center gap-4">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                            viewport={{ once: true }}
                            className="relative h-full w-full rounded-[40px] overflow-hidden shadow-xl odd:mt-12 even:mb-12"
                        >
                            <img
                                src={img}
                                alt={`Approach ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300"></div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default OurApproach;
