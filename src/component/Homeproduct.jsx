
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/product/all?category=home`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products.map(p => ({
            ...p,
            title: p.name,
            images: p.images || [],
            price: p.price
          })));
        }
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        {loading ? (
          <div className="text-center py-10 text-lg text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProducts;