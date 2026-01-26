import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ProductCard = ({ product, isWide = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (!isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`group relative flex flex-col bg-white border border-[#08213e] overflow-hidden ${isWide ? 'w-full' : 'w-full'} transition-colors duration-300`}
    >
      {/* Image Area */}
      <div 
        className={`relative overflow-hidden bg-gray-100 ${isWide ? 'h-[300px] md:h-[400px]' : 'h-[300px]'} cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={product.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {/* Content Area */}
      <div className="p-6 flex items-center justify-between border-t border-[#08213e] bg-white relative z-10 transition-colors duration-300">
        <h3 className="text-xl md:text-2xl font-semibold text-[#05021a] transition-colors duration-300">{product.title}</h3>
        <div className="flex items-center gap-2 group/link cursor-pointer opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-sm md:text-base font-semibold text-[#05021a]">Know More</span>
          <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;