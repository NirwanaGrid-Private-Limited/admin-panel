import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const HomeProducts = () => {
  const products = [
    {
      id: "1",
      title: "Single Chip",
      images: [
        "https://images.unsplash.com/photo-1598845685288-98d5e7128987?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1597207837475-ea1f19435b50?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop"
      ],
      link: "#"
    },
    {
      id: "2",
      title: "Master Chip",
      images: [
        "https://images.unsplash.com/photo-1613483187636-c2024013d54a?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1754821130717-60c970da55dc?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop"
      ],
      link: "#"
    },
    {
      id: "3",
      title: "Customizable Chip",
      images: [
        "https://images.unsplash.com/photo-1763372278600-fd0b0997a7b8?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562877773-a37120131ec4?ixlib=rb-4.1.0&q=80&w=1080&auto=format&fit=crop"
      ],
      link: "#"
    }
  ];

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
            For Home Use
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#08213e]/80 max-w-3xl transition-colors duration-300"
          >
            <p>Make your existing appliances safer and smarter without replacing anything.</p>
            <p className="mt-2 font-medium">
              <span className="text-[#0373ca]">Clear pricing.</span>{" "}
              <span className="text-[#5bb000]">Easy setup.</span>
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;