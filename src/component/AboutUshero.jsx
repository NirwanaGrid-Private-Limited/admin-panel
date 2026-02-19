import React from "react";
import { motion } from "framer-motion";
import nirwanaGridVideo from "../assets/nirwanagrid video for website.mp4";

const HeroAndProblem = () => {
	return (
		<div className="w-full pt-16">
			{/* Technician Hero Image */}
			<motion.div 
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="w-full h-[400px] md:h-[600px] relative overflow-hidden flex items-center justify-center bg-black"
			>
				<video 
					src={nirwanaGridVideo}
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover object-center rounded-3xl shadow-xl"
				/>
			</motion.div>

			{/* Solving Header */}
			<div className="text-center py-16 px-4">
				<motion.h2 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-4xl md:text-5xl font-bold text-[#08213e]"
				>
					What We Are <span className="text-[#a5ff46]">Solving</span>
				</motion.h2>
			</div>
			
		</div>
	);
};

export default HeroAndProblem;

