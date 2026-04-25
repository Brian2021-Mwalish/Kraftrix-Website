import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Quote request received! We'll be in touch within 24h.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" className="py-28 bg-muted/40">
      <div className="container-x grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Get in touch</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Let's build <span className="text-gradient">something legendary</span>.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tell us about your project and we'll get back within one business day.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { Icon: Mail, label: "Email", value: "hello@kraftrix.africa" },
              { Icon: Phone, label: "Phone", value: "+254 700 000 000" },
              { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly" },
              { Icon: MapPin, label: "HQ", value: "Nairobi, Kenya — serving all of Africa" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground shadow-glow shrink-0">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form id="quote" onSubmit={onSubmit} className="rounded-3xl bg-card border border-border/70 p-8 shadow-soft">
          <h3 className="font-display text-2xl font-bold">Request a quote</h3>
          <p className="text-sm text-muted-foreground mt-1">Fill in a few details — no commitment.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required maxLength={100} className="mt-1.5" placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required maxLength={255} className="mt-1.5" placeholder="you@company.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" maxLength={30} className="mt-1.5" placeholder="+254..." />
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <select id="service" required className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Website Development</option>
                <option>Software Development</option>
                <option>IT Support</option>
                <option>Networking</option>
                <option>CCTV Installation</option>
                <option>Branding</option>
                <option>SEO & Marketing</option>
                <option>Cloud Solutions</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="budget">Budget</Label>
              <select id="budget" className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Under $1,000</option>
                <option>$1,000 – $5,000</option>
                <option>$5,000 – $20,000</option>
                <option>$20,000+</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required maxLength={1000} rows={4} className="mt-1.5" placeholder="Tell us about your project..." />
            </div>
          </div>

          <Button type="submit" variant="brand" size="lg" className="mt-6 w-full" disabled={loading}>
            {loading ? "Sending..." : <>Send request <Send /></>}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
