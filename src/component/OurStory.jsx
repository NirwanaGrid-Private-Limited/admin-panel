import React from "react";
import { motion } from "framer-motion";
import Stack from "./Stack";

const OurStory = () => {
    const images = [
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    ];

    const timelineEvents = [
        {
            year: "2024",
            title: "Vision & Team Formation",
            points: [
                "Identified gaps in electrical safety, fire prevention, and energy efficiency",
                "Conceptualized NirwanaGrid and formed a focused five-member core team",
            ],
        },
        {
            year: "2025",
            title: "Product Development & Validation",
            points: [
                "Built the core hardware and software platform with safety and monitoring features",
                "Conducted pilot deployments and optimized for offline and online reliability",
            ],
        },
        {
            year: "August", // Using string for month/year mix as per design
            title: "Company Incorporated",
            points: [
                "NirwanaGrid officially registered with a defined product roadmap",
                "Transitioned from prototype to product-ready development",
            ],
        },
    ];

    return (
        <section className="w-full py-20 bg-[#434547] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Title, Quote, and Stack */}
                    <div className="flex flex-col space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold"
                        >
                            Our <span className="text-[#3b82f6]">Story</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-gray-200 text-lg leading-relaxed max-w-md"
                        >
                            From early prototypes to 100+ real-world deployments, we have
                            automated and safeguarded over 300 appliances across real
                            environments.
                        </motion.p>

                        {/* Quote Icon */}
                        <div className="text-6xl text-gray-800 font-serif leading-none opacity-50">
                            “
                        </div>

                        {/* Stack Component */}
                        <div className="relative w-full max-w-[300px] h-[300px] mx-auto lg:mx-0">
                            <Stack
                                randomRotation={true}
                                sensitivity={180}
                                sendToBackOnClick={true}
                                cards={images.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`story-image-${i + 1}`}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ))}
                                autoplay={true}
                                autoplayDelay={4000}
                                pauseOnHover={true}
                            />
                        </div>
                    </div>

                    {/* Right Column: Timeline */}
                    {/* Right Column: Timeline (Scrolling) */}
                    <div className="relative h-[400px] overflow-hidden mask-gradient">
                        {/* Static Vertical Line Track with Animation */}
                        <div className="absolute left-[20px] lg:left-[21px] top-0 bottom-0 w-[2px] bg-gray-600 z-0">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-t from-transparent via-[#3b82f6] to-transparent"
                                animate={{ top: ["100%", "-40%"] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "linear",
                                }}
                            />
                        </div>

                        {/* Scrolling Content */}
                        <motion.div
                            className="pl-12 py-4"
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 15,
                                ease: "linear",
                            }}
                            whileHover={{ animationPlayState: "paused" }} // Note: framer-motion pause is tricky, simpler to just use fast duration or trust user doesn't hover-text-read too aggressively during auto-scroll
                        >
                            {[...timelineEvents, ...timelineEvents].map((event, index) => (
                                <div key={index} className="relative mb-12 last:mb-0">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[37px] lg:-left-[36px] top-2 w-4 h-4 bg-white rounded-full border-2 border-[#6b7280] z-10" />

                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-2">
                                        <span className="text-2xl font-bold text-white shrink-0 w-24">
                                            {event.year}
                                        </span>
                                        <h3 className="text-xl font-semibold text-white">
                                            {event.title}
                                        </h3>
                                    </div>

                                    <ul className="list-disc list-outside ml-4 md:ml-32 space-y-2 text-gray-200">
                                        {event.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
