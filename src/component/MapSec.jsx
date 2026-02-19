
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import mapimgg from "../assets/mapimg.png";

export default function MapSection() {
	const mapImage = mapimgg;

	return (
		<>
			<section className="relative w-full h-[500px] overflow-hidden bg-gray-100">
				<img 
					src={mapImage} 
					alt="Map Location" 
					className="w-full h-full object-cover" 
					loading="lazy"
				/>
				{/* Gradient overlay removed as requested */}
			</section>
			<div className="w-full text-center mt-16 mb-20">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="group relative bg-white border-2 border-[#092337] px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto my-6"
				>
					<span className="text-[#092337] font-bold text-lg">Explore Our Products Now</span>
					<ArrowRight className="w-5 h-5 text-[#80c537] group-hover:translate-x-1 transition-transform" />
					{/* Removed blue border on hover */}
				</motion.button>
			</div>
		</>
	);
}
