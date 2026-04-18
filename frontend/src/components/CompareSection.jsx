import { useEffect, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const CompareSection = () => {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios.get(`${API}/products`).then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  if (!products.length) return null;
  const current = products[active];

  return (
    <section id="compare" data-testid="compare-section" className="relative py-24 md:py-32 bg-black border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-4">Specifications</div>
        <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-white mb-12">
          Built to <span className="brand-gradient-text">broadcast standards.</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {products.map((p, i) => (
            <button
              key={p.slug}
              data-testid={`compare-tab-${p.slug}`}
              onClick={() => setActive(i)}
              className={`text-sm px-4 py-2 rounded-full border transition-all ${
                active === i
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-400 border-white/15 hover:border-white/40 hover:text-white"
              }`}
            >
              {p.name.replace("DaVinci Resolve ", "")}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 brand-ring">
            <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={current.image_url} alt={current.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-7">
            <h3 data-testid="compare-product-name" className="font-display font-bold text-3xl md:text-4xl text-white mb-3">{current.name}</h3>
            <p className="text-zinc-400 mb-8 max-w-2xl">{current.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {current.specs?.map((s) => (
                <div key={s.label} className="bg-[#0a0a0a] p-5">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-semibold">{s.label}</div>
                  <div className="text-white font-display font-bold text-lg mt-2">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-semibold mb-4">Key features</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {current.features?.map((f) => (
                  <li key={f} className="text-sm text-zinc-300 flex items-start gap-3">
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full brand-gradient-bg shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareSection;
