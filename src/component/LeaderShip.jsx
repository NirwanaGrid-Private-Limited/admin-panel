import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import imgLogo2 from "../assets/logo1.png";

import NavigationButtons from "./NavigationButtons";
import SliderProgress from "./SliderProgress";
import { useState } from "react";

const Leadership = () => {
    const leaders = [1, 2, 3, 4]; // Placeholders
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="py-20 bg-blue-50/30">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-[#08213e] mb-4">
                    Leadership Behind the <span className="text-[#a5ff46]">Vision</span>
                </h2>
                <p className="text-gray-600 mb-12">Experienced leaders turning vision into reliable, real-world solutions.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leaders.map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="w-10 h-10 mb-6">
                                <img src={imgLogo2} alt="NG" className="w-full h-full object-contain object-left" />
                            </div>
                            <h3 className="text-lg font-bold text-[#08213e] mb-1">Abhay Gupta</h3>
                            <p className="text-xs text-gray-500 mb-8">Founding Team Member</p>

                            <a href="#" className="inline-block bg-gray-200 p-2 rounded text-gray-700 hover:bg-[#0077b5] hover:text-white transition-colors">
                                <Linkedin size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination and Navigation */}
                <div className="flex justify-between items-center mt-8">
                    {/* Pagination on Left */}
                    <div className="flex-1">
                        <div className="w-fit">
                            <SliderProgress
                                currentSlide={currentSlide}
                                setCurrentSlide={setCurrentSlide}
                                totalSlides={leaders.length}
                                activeColor="#000"
                                inactiveColor="rgba(0, 0, 0, 0.3)"
                            />
                        </div>
                    </div>

                    {/* Navigation Buttons on Right */}
                    <NavigationButtons
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}
                        totalSlides={leaders.length}
                        borderColor="#000"
                        iconColor="#000"
                    />
                </div>
            </div>

            <div className="text-center mt-20 px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F4584] max-w-4xl mx-auto leading-relaxed">
                    Designed to work quietly in the background so safety and control never need attention
                </h3>
            </div>
        </div>
    );
};

export default Leadership;
