import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import imgImage7 from "../assets/whatsapp.png";

export default function Hero() {
	const heroImage = "https://images.unsplash.com/photo-1758876018582-e7573baf5306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRhbGtpbmclMjBvbiUyMHBob25lJTIwb2ZmaWNlJTIwbXV0ZWR8ZW58MXx8fHwxNzY5NTc0NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

	return (
		<section className="relative w-full h-screen overflow-hidden bg-gray-900">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0 w-full h-full">
				<img
					src={heroImage}
					alt="Woman on phone"
					className="w-full h-full object-cover opacity-60"
					loading="eager"
				/>
				<div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/90" />
			</div>
			{/* Content */}
			<div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="max-w-4xl mx-auto"
				>
					<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
						Get in Touch
					</h1>
					<p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
						Have a question, partnership idea, or deployment inquiry?
						Reach out and our team will get back to you.
					</p>
				</motion.div>
			</div>
			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
				className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
				onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
					className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1"
				>
					<motion.div 
						animate={{ height: [4, 8, 4] }}
						transition={{ repeat: Infinity, duration: 1.5 }}
						className="w-1 bg-gray-600 rounded-full" 
					/>
				</motion.div>
			</motion.div>
			{/* Floating WhatsApp Icon */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.5, type: "spring" }}
				className="absolute bottom-8 right-8 z-20 cursor-pointer hover:scale-110 transition-transform duration-300"
			>
				<img src={imgImage7} alt="WhatsApp" className="w-16 h-16 drop-shadow-lg" />
			</motion.div>
		</section>
	);
}
