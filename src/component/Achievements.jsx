import React, { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavigationButtons from "./NavigationButtons";
import SliderProgress from "./SliderProgress";
import uptradeshowimg from "../assets/uptradeshowimg.png";

const Achievements = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    // Assuming single slide for now as per image, but keeping structure ready for more
    const totalSlides = 1;

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <h2 className="text-4xl md:text-5xl font-bold text-[#08213e] mb-12">
                    Our <span className="text-[#a5ff46]">Achievements</span>
                </h2>

                {/* Main Content Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                    {/* Background Image (Blurred/Darkened) */}
                    <div className="absolute inset-0">
                        <img
                            src={uptradeshowimg}
                            alt="Background"
                            className="w-full h-full object-cover blur-sm brightness-50 scale-105"
                        />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px]">

                        {/* Framed Image */}
                        <div className="relative w-full max-w-4xl transform transition-transform duration-500 hover:scale-[1.02]">
                            <div className="  shadow-xl overflow-hidden bg-white">
                                <img
                                    src={uptradeshowimg}
                                    alt="UP International Trade Show Award"
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Text Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <p className="text-sm md:text-lg lg:text-xl font-medium leading-relaxed max-w-4xl mx-auto text-center md:text-left drop-shadow-md text-white">
                                    Shines bright at the UP International Trade Show 2025-2026, securing 1st Prize at the Business Expo!
                                </p>
                            </div>

                        </div>

                        {/* Corner Text/Icon if needed, or just keeping the clean look */}
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <MoveUpRight size={48} />
                        </div>
                    </div>
                </div>

                {/* Navigation & Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Pagination Dots */}
                    <div className="order-2 md:order-1">
                        <SliderProgress
                            currentSlide={currentSlide}
                            setCurrentSlide={setCurrentSlide}
                            totalSlides={3} // Mocking 3 slides for visual balance as per design
                            activeColor="#08213e"
                            inactiveColor="#e5e7eb"
                        />
                    </div>

                    {/* Footer Text Link (Centered-ish on desktop, below on mobile) */}
                    <div className="order-3 md:order-2 text-center md:text-left flex-1 md:px-12">
                        <a href="#" className="inline-flex items-center gap-2 text-[#0F4584] hover:text-[#0077b5] transition-colors text-sm md:text-base font-medium group">
                            <span>For deployments | Institutional partnerships | Technical collaboration,<br className="hidden md:block" /> Reach out to the NirwanaGrid team.</span>
                            <MoveUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="order-1 md:order-3">
                        <NavigationButtons
                            currentSlide={currentSlide}
                            setCurrentSlide={setCurrentSlide}
                            totalSlides={3} // Mocking 3 slides
                            borderColor="#e5e7eb"
                            iconColor="#08213e"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Achievements;
