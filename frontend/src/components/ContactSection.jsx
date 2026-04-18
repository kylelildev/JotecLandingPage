import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ContactSection = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", product_interest: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API}/products`).then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      toast.success("Inquiry sent. Our team will reach out within 24h.");
      setForm({ name: "", email: "", company: "", product_interest: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="mesh-orb" style={{ background: "#004CB6", width: 500, height: 500, top: "10%", left: "-10%", opacity: 0.25 }} />
      <div className="mesh-orb" style={{ background: "#D92822", width: 400, height: 400, bottom: "-10%", right: "-5%", opacity: 0.2 }} />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-4">Contact</div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-white">
            Let's talk <span className="brand-gradient-text">hardware.</span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-md leading-relaxed">
            Post houses, broadcasters and freelance colorists — tell us about your workflow and we'll match you with the right control surface.
          </p>

          <div className="mt-10 space-y-4 text-sm text-zinc-400">
            <div><span className="text-zinc-500">Email</span> · sales@jotec.studio</div>
            <div><span className="text-zinc-500">Phone</span> · +1 (415) 555-0120</div>
            <div><span className="text-zinc-500">Hours</span> · Mon–Fri · 09:00–18:00</div>
          </div>
        </div>

        <form onSubmit={submit} data-testid="contact-form" className="md:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2 block">Name</Label>
              <Input data-testid="contact-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Colorist" className="bg-black/60 border-white/10 text-white focus-visible:ring-[#07A6E6] focus-visible:border-[#07A6E6] h-11" />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2 block">Email</Label>
              <Input data-testid="contact-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@studio.com" className="bg-black/60 border-white/10 text-white focus-visible:ring-[#07A6E6] focus-visible:border-[#07A6E6] h-11" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2 block">Company</Label>
              <Input data-testid="contact-company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Studio name" className="bg-black/60 border-white/10 text-white focus-visible:ring-[#07A6E6] focus-visible:border-[#07A6E6] h-11" />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2 block">Product interest</Label>
              <Select value={form.product_interest} onValueChange={(v) => update("product_interest", v)}>
                <SelectTrigger data-testid="contact-product-select" className="bg-black/60 border-white/10 text-white h-11">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                  {products.map((p) => (
                    <SelectItem key={p.slug} value={p.name} data-testid={`contact-option-${p.slug}`}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2 block">Message</Label>
            <Textarea data-testid="contact-message" value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} placeholder="Tell us about your workflow..." className="bg-black/60 border-white/10 text-white focus-visible:ring-[#07A6E6] focus-visible:border-[#07A6E6]" />
          </div>
          <Button data-testid="contact-submit" disabled={submitting} type="submit" className="w-full md:w-auto rounded-full bg-white text-black hover:bg-zinc-200 px-8 h-11 font-semibold">
            {submitting ? "Sending..." : "Send inquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
