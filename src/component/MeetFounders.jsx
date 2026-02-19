import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import abhayImg from "../assets/abhaysirimg.png";
import logo1 from "../assets/logo1.png";

const MeetFounders = () => {
    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#08213e] mb-4"
                    >
                        Meet our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Founders</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-700 text-lg md:text-xl max-w-3xl"
                    >
                        Driven by purpose and powered by passion, meet the visionaries
                        shaping the future of smart living.
                    </motion.p>
                </div>

                {/* Founders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Founder Card 1: Abhay Gupta */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row bg-white rounded-[40px] shadow-lg border border-gray-100 overflow-hidden"
                    >
                        {/* Image Section */}
                        <div className="md:w-2/5 h-64 md:h-auto relative bg-gray-100">
                            <img
                                src={abhayImg}
                                alt="Abhay Gupta"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center gap-4">
                            <div className="mb-4">
                                <img src={logo1} alt="NirwanaGrid" className="h-10 object-contain mb-3" />
                            </div>

                            <h3 className="text-2xl font-bold text-[#08213e] mb-1">
                                Abhay Gupta
                            </h3>
                            <p className="text-[#08213e] font-medium text-sm mb-4">
                                Founder, Products & Operations
                            </p>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Abhay leads Nirwana Grid's product vision and operations,
                                blending innovation with execution. He believes in
                                empowering young talent and building a culture of ownership.
                            </p>

                            <a
                                href="#"
                                className="text-gray-700 hover:text-[#0a66c2] transition-colors text-3xl"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </motion.div>

                    {/* Founder Card 2: Abhay Gupta (Duplicate as requested) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row bg-white rounded-[40px] shadow-lg border border-gray-100 overflow-hidden"
                    >
                        {/* Image Section */}
                        <div className="md:w-2/5 h-64 md:h-auto relative bg-gray-100">
                            <img
                                src={abhayImg}
                                alt="Abhay Gupta"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center gap-4">
                            <div className="mb-4">
                                <img src={logo1} alt="NirwanaGrid" className="h-10 object-contain mb-3" />
                            </div>

                            <h3 className="text-2xl font-bold text-[#08213e] mb-1">
                                Abhay Gupta
                            </h3>
                            <p className="text-[#08213e] font-medium text-sm mb-4">
                                Founder, Products & Operations
                            </p>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Abhay leads Nirwana Grid's product vision and operations,
                                blending innovation with execution. He believes in
                                empowering young talent and building a culture of ownership.
                            </p>

                            <a
                                href="#"
                                className="text-gray-700 hover:text-[#0a66c2] transition-colors text-3xl"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MeetFounders;
