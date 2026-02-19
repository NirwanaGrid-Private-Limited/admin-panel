import React from "react";
import { motion } from "framer-motion";

const WhatMakesUsDifferent = () => {
    const differentials = [
        {
            title: "1. Beyond Basic Control",
            description:
                "Most solutions focus only on switching devices on and off. We go further by adding intelligence that understands how power is actually used.",
        },
        {
            title: "2. One Unified System",
            description:
                "Control, monitoring, safety, and energy insights come together in a single system that works across homes, offices, and commercial spaces.",
        },
        {
            title: "3. Built for Real Spaces",
            description:
                "Designed to be practical, affordable, and reliable, the system fits into existing setups without disruption or appliance replacement.",
        },
    ];

    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-[#08213e] mb-16"
                >
                    What Makes <span className="text-[#3b82f6]">Us</span> <span className="text-[#a5ff46]">Different</span>
                </motion.h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {differentials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            {/* Placeholder Image Box */}
                            <div className="w-full aspect-[4/3] bg-gray-300 rounded-sm mb-6 shadow-sm"></div>

                            {/* Text Content */}
                            <h3 className="text-xl md:text-2xl font-bold text-[#08213e] mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatMakesUsDifferent;
