import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Products" | "Services" | "Hardware" | "Software" | "News & Events";
type SortOption = "Latest" | "Popular" | "Price";
type BadgeType = "Product" | "Service" | "Event";

interface MarketItem {
  id: number;
  name: string;
  type: BadgeType;
  category: Exclude<Category, "All" | "News & Events">;
  description: string;
  price?: string;
  image: string;
  tag?: string;
  popular?: boolean;
}

interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  preview: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARKET_ITEMS: MarketItem[] = [
  {
    id: 1,
    name: "KraftOS Enterprise Suite",
    type: "Product",
    category: "Software",
    description: "All-in-one enterprise resource planning and workflow automation platform built for scale.",
    price: "KES 45,000 / yr",
    image: "💻",
    tag: "Best Seller",
    popular: true,
  },
  {
    id: 2,
    name: "SmartCam Pro 4K",
    type: "Product",
    category: "Hardware",
    description: "AI-powered 4K security camera with real-time analytics, night vision, and remote monitoring.",
    price: "KES 18,500",
    image: "📷",
    tag: "New",
  },
  {
    id: 3,
    name: "Cloud Deployment Service",
    type: "Service",
    category: "Services",
    description: "End-to-end cloud migration, deployment, and managed hosting for businesses of any size.",
    image: "☁️",
    popular: true,
  },
  {
    id: 4,
    name: "KraftNet Router X1",
    type: "Product",
    category: "Hardware",
    description: "Enterprise-grade dual-band WiFi 6 router with advanced QoS and zero-touch provisioning.",
    price: "KES 12,800",
    image: "📡",
  },
  {
    id: 5,
    name: "BrandForge Package",
    type: "Service",
    category: "Services",
    description: "Full-stack branding identity: logo, brand guide, digital assets, and launch strategy.",
    image: "🎨",
    tag: "Popular",
    popular: true,
  },
  {
    id: 6,
    name: "KraftVault Backup",
    type: "Product",
    category: "Software",
    description: "Automated encrypted cloud backup solution with instant restore and compliance reporting.",
    price: "KES 8,200 / yr",
    image: "🔐",
  },
  {
    id: 7,
    name: "IT Managed Support",
    type: "Service",
    category: "Services",
    description: "24/7 remote and on-site IT support with SLA guarantees and dedicated account manager.",
    image: "🛠️",
    tag: "Hot",
    popular: true,
  },
  {
    id: 8,
    name: "POS Terminal Pro",
    type: "Product",
    category: "Hardware",
    description: "Touch-screen point-of-sale terminal with integrated payments, inventory sync, and analytics.",
    price: "KES 32,000",
    image: "🖥️",
  },
];

const SERVICES: ServiceItem[] = [
  { id: 1, icon: "⚙️", title: "Software Development", description: "Custom web, mobile, and enterprise software built to your specifications with agile delivery." },
  { id: 2, icon: "🛡️", title: "IT Support", description: "Responsive helpdesk and on-site technical support keeping your operations running smoothly." },
  { id: 3, icon: "🌐", title: "Networking Solutions", description: "Structured cabling, LAN/WAN setup, and network security for offices and data centers." },
  { id: 4, icon: "📹", title: "CCTV Installation", description: "Professional surveillance system design, installation, and monitoring across all property types." },
  { id: 5, icon: "📣", title: "Branding & Marketing", description: "Digital marketing, social media management, and brand identity that drives real growth." },
  { id: 6, icon: "☁️", title: "Cloud Solutions", description: "AWS, Azure, and GCP migrations with architecture design and ongoing managed cloud services." },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "Kraftrix Launches New AI-Powered Analytics Dashboard",
    date: "Apr 20, 2026",
    category: "Product Update",
    preview: "Our latest dashboard update brings machine-learning forecasting and real-time KPI tracking to all enterprise clients.",
  },
  {
    id: 2,
    title: "Tech Summit Nairobi 2026 — Kraftrix is Exhibiting",
    date: "May 5, 2026",
    category: "Event",
    preview: "Join us at the Kenyatta International Convention Centre. Live demos, giveaways, and exclusive partner announcements.",
  },
  {
    id: 3,
    title: "Partnership with AfriCloud for Regional Expansion",
    date: "Apr 10, 2026",
    category: "News",
    preview: "Kraftrix and AfriCloud join forces to bring enterprise-grade cloud infrastructure to East Africa's growing SME sector.",
  },
  {
    id: 4,
    title: "Free CCTV Security Audit — Limited Offer",
    date: "Apr 1, 2026",
    category: "Promotion",
    preview: "Book a complimentary security assessment for your business premises and receive a customized surveillance proposal.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Badge = ({ type }: { type: BadgeType | string }) => {
  const colors: Record<string, string> = {
    Product: "bg-[#413584] text-white",
    Service: "bg-[#5644AE] text-white",
    Event: "bg-[#F8492D] text-white",
    "Product Update": "bg-[#413584] text-white",
    News: "bg-gray-700 text-white",
    Promotion: "bg-[#F8492D] text-white",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${colors[type] ?? "bg-gray-400 text-white"}`}>
      {type}
    </span>
  );
};

const TagPill = ({ label }: { label: string }) => (
  <span className="text-[9px] font-extrabold uppercase tracking-widest bg-[#F8492D] text-white px-2 py-0.5 rounded-sm">
    {label}
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Solutions() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("Latest");
  const [selectedItem, setSelectedItem] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const categories: Category[] = ["All", "Products", "Services", "Hardware", "Software", "News & Events"];

  // Filter + search market items
  const filtered = MARKET_ITEMS.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" ||
      activeCategory === "News & Events"
        ? true
        : activeCategory === "Products"
        ? item.type === "Product"
        : activeCategory === "Services"
        ? item.type === "Service"
        : item.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (sort === "Popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    if (sort === "Price") {
      const ap = a.price ? parseInt(a.price.replace(/\D/g, "")) : 999999;
      const bp = b.price ? parseInt(b.price.replace(/\D/g, "")) : 999999;
      return ap - bp;
    }
    return b.id - a.id;
  });

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => setInquirySubmitted(false), 3500);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSelectedItem("");
  };

  return (
  <div id="solutions" className="bg-[#FBFAF9] min-h-screen font-sans text-[#000000] relative scroll-mt-20">

      {/* ── Section Header ── */}
      <div className="bg-[#413584] px-6 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#F8492D] text-xs font-black uppercase tracking-[0.3em] mb-2">Marketplace</p>
          <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Kraftrix Solutions
          </h2>
          <p className="text-purple-200 mt-3 text-base md:text-lg max-w-2xl">
            Explore our full range of products, services, and technology offerings — all in one place.
          </p>
        </div>
      </div>

      {/* ── 1. TOP FILTER BAR ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search products, services, solutions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#413584] focus:border-transparent transition"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 flex-wrap justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[#413584] text-white border-[#413584] shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#5644AE] hover:text-[#5644AE]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#413584] cursor-pointer"
          >
            {(["Latest", "Popular", "Price"] as SortOption[]).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-20">

        {/* ── 2. FEATURED GRID ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-black text-[#413584]">Featured Marketplace</h3>
              <p className="text-gray-500 text-sm mt-0.5">{filtered.length} items available</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-semibold text-lg">No results found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:border-[#5644AE] hover:-translate-y-1 cursor-pointer"
                >
                  {/* Image area */}
                  <div className="relative bg-gradient-to-br from-[#413584]/10 to-[#5644AE]/5 h-44 flex items-center justify-center text-6xl">
                    {item.image}
                    {item.tag && (
                      <div className="absolute top-3 left-3">
                        <TagPill label={item.tag} />
                      </div>
                    )}
                    {item.popular && !item.tag && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-bold bg-[#5644AE]/20 text-[#413584] px-2 py-0.5 rounded-full">
                          ★ Popular
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-black text-sm leading-tight text-[#000000] group-hover:text-[#413584] transition-colors">
                        {item.name}
                      </h4>
                      <Badge type={item.type} />
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.description}</p>

                    <div className="flex items-center justify-between">
                      {item.price ? (
                        <span className="text-[#413584] font-black text-sm">{item.price}</span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Request Price</span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 flex-col">
                      <div className="flex gap-2">
                        <button
                          className="flex-1 text-xs font-bold py-2 px-3 rounded-lg border-2 border-[#413584] text-[#413584] hover:bg-[#413584] hover:text-white transition-all duration-200"
                          onClick={() => {
                            setSelectedItem(item.name);
                            document.getElementById("inquiry-panel")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          View Details
                        </button>
                        <button
                          className="flex-1 text-xs font-bold py-2 px-3 rounded-lg bg-[#F8492D] text-white hover:bg-[#d93a21] transition-all duration-200 hover:shadow-lg hover:shadow-orange-200"
                          onClick={() => {
                            setSelectedItem(item.name);
                            document.getElementById("inquiry-panel")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Request Demo
                        </button>
                      </div>
                      <button
                        className="w-full text-xs font-bold py-2 px-3 rounded-lg bg-[#413584]/10 text-[#413584] hover:bg-[#413584]/20 transition-all duration-200"
                        onClick={() => {
                          setSelectedItem(item.name);
                          document.getElementById("inquiry-panel")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item.price ? "Order Now" : "Ask for Price"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 3. SERVICES SECTION ── */}
        {(activeCategory === "All" || activeCategory === "Services") && (
          <section>
            <div className="mb-6">
              <p className="text-[#F8492D] text-xs font-black uppercase tracking-[0.25em] mb-1">What We Do</p>
              <h3 className="text-2xl font-black text-[#413584]">Core Services</h3>
              <p className="text-gray-500 text-sm mt-1">Professional technology services tailored for your business needs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:border-[#5644AE] hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#413584]/15 to-[#5644AE]/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-base text-[#000000] group-hover:text-[#413584] transition-colors mb-2">
                      {service.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <button
                    className="w-full py-2.5 rounded-xl bg-[#F8492D] text-white text-sm font-bold hover:bg-[#d93a21] transition-all duration-200 hover:shadow-lg hover:shadow-orange-200"
                    onClick={() => {
                      setSelectedItem(service.title);
                      document.getElementById("inquiry-panel")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Request Service →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 4. REQUEST ACTION PANEL ── */}
        <section id="inquiry-panel" className="scroll-mt-20">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* Left info panel */}
              <div className="bg-gradient-to-br from-[#413584] to-[#5644AE] p-8 lg:p-10 lg:w-80 flex flex-col gap-6 text-white">
                <div>
                  <p className="text-purple-200 text-xs font-black uppercase tracking-widest mb-2">Get in Touch</p>
                  <h3 className="text-2xl font-black leading-tight">Quick Inquiry</h3>
                  <p className="text-purple-200 text-sm mt-2 leading-relaxed">
                    Tell us what you need and our team will respond within 2 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: "🚀", label: "Request Demo", desc: "See our solutions live" },
                    { icon: "💬", label: "Request Pricing", desc: "Custom quotes, no surprises" },
                    { icon: "🤝", label: "Partner With Us", desc: "Reseller & affiliate programs" },
                  ].map((cta) => (
                    <div key={cta.label} className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                      <span className="text-xl">{cta.icon}</span>
                      <div>
                        <p className="font-bold text-sm">{cta.label}</p>
                        <p className="text-purple-200 text-xs">{cta.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/254707728143?text=Hello%20Kraftrix%20I%20need%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg text-sm"
                >
                  <span className="text-xl">💬</span>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Right form */}
              <div className="flex-1 p-8 lg:p-10">
                {inquirySubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                      ✅
                    </div>
                    <h4 className="text-xl font-black text-[#413584]">Inquiry Sent!</h4>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Thanks! Our team will get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquiry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="John Kamau"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#413584] focus:border-transparent bg-gray-50 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#413584] focus:border-transparent bg-gray-50 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="+254 7XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#413584] focus:border-transparent bg-gray-50 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                          Interested In
                        </label>
                        <select
                          value={selectedItem}
                          onChange={(e) => setSelectedItem(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#413584] focus:border-transparent bg-gray-50 transition text-gray-600 cursor-pointer"
                        >
                          <option value="">Select a product/service</option>
                          {[...MARKET_ITEMS.map((i) => i.name), ...SERVICES.map((s) => s.title)].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                        Message
                      </label>
                      <textarea
                        placeholder="Tell us more about your requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#413584] focus:border-transparent bg-gray-50 transition resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-[#F8492D] text-white font-black rounded-xl hover:bg-[#d93a21] transition-all duration-200 hover:shadow-xl hover:shadow-orange-200 text-sm tracking-wide"
                      >
                        Send Inquiry →
                      </button>
                      <a
                        href="https://wa.me/254707728143?text=Hello%20Kraftrix%20I%20need%20your%20services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 bg-green-500 text-white font-black rounded-xl hover:bg-green-600 transition-all duration-200 text-sm text-center tracking-wide"
                      >
                        💬 WhatsApp Us
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. NEWS & EVENTS ── */}
        {(activeCategory === "All" || activeCategory === "News & Events") && (
          <section>
            <div className="mb-6">
              <p className="text-[#F8492D] text-xs font-black uppercase tracking-[0.25em] mb-1">Stay Updated</p>
              <h3 className="text-2xl font-black text-[#413584]">News & Events</h3>
              <p className="text-gray-500 text-sm mt-1">The latest from Kraftrix — updates, events, and partnerships.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {NEWS_ITEMS.map((news) => (
                <div
                  key={news.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:border-[#5644AE] hover:-translate-y-1 cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-[#413584]/10 to-[#5644AE]/5 h-28 flex items-center justify-center text-4xl">
                    {news.category === "Event" ? "🎪" : news.category === "Promotion" ? "🎁" : news.category === "Product Update" ? "🚀" : "📰"}
                  </div>
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <div className="flex items-center justify-between">
                      <Badge type={news.category} />
                      <span className="text-gray-400 text-[10px]">{news.date}</span>
                    </div>
                    <h4 className="font-black text-sm leading-snug text-[#000000] group-hover:text-[#413584] transition-colors flex-1">
                      {news.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{news.preview}</p>
                    <button className="mt-1 text-[#413584] text-xs font-bold hover:text-[#5644AE] transition-colors text-left">
                      Read more →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── 6. FLOATING WHATSAPP BUTTON ── */}
      <a
        href="https://wa.me/254707728143?text=Hello%20Kraftrix%20I%20need%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-full shadow-2xl shadow-green-300 hover:shadow-green-400 transition-all duration-300 hover:scale-105 group"
        title="Chat on WhatsApp"
      >
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="text-sm hidden sm:inline">Chat with us</span>
      </a>

    </div>
  );
}