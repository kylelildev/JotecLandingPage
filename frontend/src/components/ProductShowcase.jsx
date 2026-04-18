import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    axios.get(`${API}/products`).then((r) => setProducts(r.data)).catch(() => setProducts([]));
  }, []);

  const count = products.length || 5;
  const x = useTransform(scrollYProgress, [0, 1], ["2%", `-${(count - 1) * 100}%`]);

  return (
    <section id="showcase" ref={containerRef} data-testid="product-showcase-section" style={{ height: `${count * 100}vh` }} className="relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-8 left-6 md:left-10 z-20 flex items-center gap-4">
          <div className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold">The Lineup</div>
          <div className="h-px w-24 bg-white/20" />
        </div>

        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {products.map((p, i) => (
            <ProductSlide key={p.slug} product={p} index={i} total={count} />
          ))}
        </motion.div>

        {/* progress bar */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-10 z-20">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-full brand-gradient-bg" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductSlide = ({ product, index, total }) => {
  return (
    <div className="relative flex-none w-screen h-screen flex items-center">
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <div className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-6">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <h2 data-testid={`product-title-${product.slug}`} className="font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-white">
            {product.name}
          </h2>
          <p className="mt-6 text-xl md:text-2xl brand-gradient-text font-display font-bold">{product.tagline}</p>
          <p className="mt-6 text-zinc-400 max-w-xl leading-relaxed">{product.description}</p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
            {product.features?.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-1 inline-block w-2 h-2 rounded-full brand-gradient-bg shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#compare"
            data-testid={`product-cta-${product.slug}`}
            className="mt-10 inline-flex items-center gap-2 text-white group"
          >
            <span className="border-b border-white/40 group-hover:border-white pb-1">See full specs</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="md:col-span-7">
          <div className="relative brand-ring">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a]">
              <img
                src={product.image_url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-xs tracking-[0.25em] uppercase text-white/80 font-semibold">
                Blackmagic Design
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
