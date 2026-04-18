import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`).then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  return (
    <section id="products" data-testid="product-grid-section" className="relative py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-4">Products</div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-white">
              Five tools. <span className="brand-gradient-text">One workflow.</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-400">
            From the cut page to the grading suite, every Blackmagic control surface is engineered for speed, tactile precision and broadcast reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.a
              key={p.slug}
              href="#showcase"
              data-testid={`grid-card-${p.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="brand-ring group"
            >
              <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-2">0{i + 1}</div>
                  <h3 className="font-display font-bold text-2xl text-white leading-tight">{p.name}</h3>
                  <p className="mt-3 text-sm text-zinc-400">{p.tagline}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
