import React from "react";
import { motion } from "framer-motion";
import  ProductCard  from "./ProductCard";

 const IndustrialProducts = () => {
    const product = {
        id: "ind-1",
        title: "Industrial Energy System",
        images: [
            "https://images.unsplash.com/photo-1582898628998-8190d3d9d614?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop"
        ],
        link: "#"
    };
    return (
        <section className="py-20 bg-white transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#0f4584] mb-4 transition-colors duration-300"
                    >
                        For Industrial Use
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#08213e]/80 max-w-3xl transition-colors duration-300"
                    >
                        Designed for complex environments where reliability and safety matter most.
                    </motion.p>
                </div>
                <div className="w-full">
                    <ProductCard product={product} isWide={true} />
                </div>
            </div>
        </section>
    );
};

export default IndustrialProducts;