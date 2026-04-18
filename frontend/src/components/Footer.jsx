import { BRAND } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer data-testid="footer" className="relative bg-black border-t border-white/10">
      <div className="h-[3px] brand-gradient-bg" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <img src={BRAND.logoUrl} alt="JOTEC" className="h-8 w-auto mb-5" />
          <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
            Authorized distributor of Blackmagic Design control surfaces. Color, cut, and live production — one workflow.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 font-semibold mb-4">Products</div>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>Speed Editor</li>
            <li>Replay Editor</li>
            <li>Editor Keyboard</li>
            <li>Micro Color Panel</li>
            <li>Mini Panel</li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 font-semibold mb-4">Studio</div>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>sales@jotec.studio</li>
            <li>+1 (415) 555-0120</li>
            <li>123 Post Production Ave, San Francisco</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {BRAND.name}. All product names are trademarks of Blackmagic Design Pty. Ltd.
      </div>
    </footer>
  );
};

export default Footer;
