"use client";

import Image from "next/image";
import { Upload, Camera, Sparkles, Image as ImageIcon, Loader2, Download, Globe, Lock, ShieldCheck, Heart, User, LogOut, MessageCircle, Info, Gift, Share2, DollarSign, Unlock, ShoppingCart, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { UploadWizard } from "@/components/UploadWizard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Snowfall } from "@/components/Snowfall";
import { ChatHolly } from "@/components/ChatHolly";
import { CountdownBanner } from "@/components/CountdownBanner";
import { ViralExitModal } from "@/components/ViralExitModal";
import { generateChristmasPhoto } from "./actions";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { messages, Locale } from "@/lib/messages";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [lang, setLang] = useState<Locale>("es");
  const [selectedCategory, setSelectedCategory] = useState<string>("stitch");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  const t = messages[lang] || messages["en"];

  const categories = [
    { id: "stitch", label: "Stitch & Magic" },
    { id: "woman", label: "Mujer / Woman" },
    { id: "man", label: "Hombre / Man" },
    { id: "couple_HM", label: "Parejas / Couples" },
    { id: "family", label: "Familia / Family" },
    { id: "pets", label: "Mascotas / Pets" }
  ];

  const filteredStyles = CHRISTMAS_PROMPTS.filter(p => p.category === selectedCategory);

  const handleGenerate = async () => {
    if (!isSignedIn) {
      alert(t.loginRequired);
      return;
    }
    if (!file || !selectedStyle) {
      alert("Please complete all steps!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("styleId", selectedStyle);
    formData.append("email", user?.primaryEmailAddress?.emailAddress || "");
    formData.append("paid", isPaid.toString());

    try {
      const result = await generateChristmasPhoto(formData);
      if (result.success && result.image) {
        setGeneratedImage(result.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Error: " + result.error);
      }
    } catch (e) {
      alert("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-christmas-red relative overflow-x-hidden font-sans">
      <CountdownBanner />
      <Snowfall />
      <MusicPlayer />
      <ChatHolly />
      <ViralExitModal language={lang} />

      {/* Navbar Premium with Clerk & Language Selector */}
      <nav className="border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-xl sticky top-[40px] z-50 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="bg-christmas-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            C
          </div>
          <span className="font-serif text-2xl tracking-tighter text-christmas-gold flex items-center gap-2">
            pic.christmas <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50 font-sans tracking-normal uppercase">Quantum AI</span>
          </span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest font-bold text-white/40">
            <a href="#studio" className="hover:text-christmas-gold transition">Studio</a>
            <a href="#themes" className="hover:text-christmas-gold transition">Themes</a>
            <a href="#charity" className="hover:text-christmas-gold transition">Charity</a>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition uppercase font-bold tracking-widest">
              <Globe className="w-4 h-4" />
              {lang}
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-[#0f172a] border border-white/10 rounded-xl hidden group-hover:block transition shadow-2xl py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {Object.keys(messages).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l as Locale)}
                  className="w-full text-left px-4 py-2 text-xs uppercase hover:bg-white/5 transition"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition border border-white/10 shadow-xl">
                Enter Studio
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <a href="/affiliates" className="text-xs text-christmas-gold hover:underline flex items-center gap-1 font-bold">
                <DollarSign className="w-3 h-3" /> Affiliates
              </a>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* 🎬 NETFLIX-STYLE HERO SECTION */}
      <section className="relative h-[90vh] w-full flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        {/* Cinematic Background (Gradient Overlay) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-60 scale-110 animate-pulse-slow" />
        </div>

        <div className="relative z-20 max-w-5xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-3">
            <div className="bg-christmas-red text-white text-[10px] font-black px-2 py-0.5 rounded tracking-[0.2em] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> QUANTUM SERIES
            </div>
            <span className="text-christmas-gold text-xs font-bold uppercase tracking-widest">Global Premiere #1</span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-serif text-white tracking-tighter leading-[0.85] drop-shadow-2xl">
            {t.title}
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed drop-shadow-lg">
            {t.subtitle} Elevate your holiday identity with medical-grade AI realism and 8K cinematic lighting.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-4 rounded-xl font-black text-xl flex items-center gap-3 hover:bg-christmas-gold transition transform hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <Play className="w-6 h-6 fill-current" /> Start Creating
            </button>
            <button
              onClick={() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-xl flex items-center gap-3 hover:bg-white/20 transition"
            >
              More Info
            </button>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <Heart className="w-4 h-4" /> 3% Donations
            </div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
              <ShieldCheck className="w-4 h-4" /> 100% Privacy
            </div>
            <div className="flex items-center gap-2 text-christmas-gold text-sm font-bold">
              <Star className="w-4 h-4 fill-current" /> Verified Result
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-40 space-y-40 mt-[-100px] relative z-20">

        {/* Result Area */}
        {generatedImage && (
          <section className="animate-in fade-in zoom-in duration-1000 scroll-mt-32">
            <div className="relative aspect-[4/5] max-w-xl mx-auto rounded-[4rem] overflow-hidden border-[16px] border-white/5 shadow-[0_0_150px_rgba(255,255,255,0.1)] bg-white/5 group">
              <Image src={generatedImage} alt="Quantum Result" fill className="object-cover" />

              {/* Simulated Watermark Overlay if not paid */}
              {!isPaid && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-40 transform -rotate-45">
                  <div className="text-6xl md:text-9xl font-serif font-black text-white/10 whitespace-nowrap tracking-tighter">
                    PIC.CHRISTMAS
                  </div>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
                {!isPaid ? (
                  <div className="w-full space-y-4">
                    <button
                      onClick={() => setIsPaid(true)}
                      className="w-full bg-christmas-gold text-black py-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-3 hover:scale-105 transition shadow-[0_0_50px_rgba(212,175,55,0.4)]"
                    >
                      <Unlock className="w-8 h-8" /> Unlock 8K High-Res ($9.90)
                    </button>
                    <p className="text-center text-white/40 text-[10px] uppercase tracking-widest italic">
                      Original file includes full commercial rights & no watermark
                    </p>
                  </div>
                ) : (
                  <div className="w-full space-y-4 text-center">
                    <div className="text-emerald-400 font-bold text-sm mb-4 flex justify-center items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Payment Verified
                    </div>
                    <a
                      href={generatedImage}
                      download
                      className="w-full bg-white text-black py-6 rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:scale-105 transition shadow-2xl"
                    >
                      <Download className="w-6 h-6" /> Download Your Masterpiece
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Studio Grid */}
        <div id="studio" className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-5 space-y-12 md:sticky md:top-32">
            <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group shadow-2xl backdrop-blur-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-christmas-gold/5 rounded-full blur-3xl" />
              <h2 className="text-4xl font-serif mb-10 flex items-center gap-4">
                <span className="bg-christmas-gold text-black w-10 h-10 rounded-full flex items-center justify-center text-xl">1</span>
                {t.uploadTitle}
              </h2>
              <UploadWizard onUploadComplete={(f) => setFile(f)} />
              {file && (
                <div className="mt-10 flex items-center gap-4 bg-emerald-500/10 text-emerald-400 p-6 rounded-3xl border border-emerald-500/20 animate-in slide-in-from-left">
                  <ShieldCheck className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-sm">Identity Locked</div>
                    <div className="text-[10px] text-emerald-400/60 uppercase">Face Analysis Complete (99.8%)</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 flex gap-6 items-center group cursor-pointer hover:bg-white/10 transition">
              <div className="w-16 h-16 bg-christmas-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition">
                <Gift className="w-8 h-8 text-christmas-gold" />
              </div>
              <div>
                <div className="font-bold text-lg mb-1">Affiliate Program</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Earn <span className="text-christmas-gold font-bold font-mono">20% commission</span> per referral.
                  Join 5,000+ partners globally.
                </p>
              </div>
            </div>
          </div>

          <div id="themes" className="lg:col-span-7 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="text-5xl font-serif mb-2 tracking-tighter flex items-center gap-4">
                  <span className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center text-xl">2</span>
                  {t.styleTitle}
                </h2>
                <p className="text-gray-500 text-sm tracking-widest uppercase">10x Curated Style Catalog 2024</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${selectedCategory === cat.id ? 'bg-christmas-gold text-black shadow-xl ring-8 ring-christmas-gold/20' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white/60'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 h-[750px] overflow-y-auto pr-6 custom-scrollbar">
              {filteredStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer border-4 transition-all duration-700 ${selectedStyle === style.id ? 'border-christmas-gold ring-[20px] ring-christmas-gold/10 scale-[0.95]' : 'border-transparent opacity-70 grayscale hover:grayscale-0 hover:opacity-100 shadow-2xl'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <div className="absolute bottom-10 left-10 right-10 z-20">
                    <p className="font-serif text-2xl leading-tight mb-2 tracking-tighter">{style.scene_name}</p>
                    <p className="text-[10px] text-christmas-gold uppercase tracking-[0.3em] font-bold">{style.location}</p>
                  </div>
                  <div className="w-full h-full bg-[#0a0f1c] flex items-center justify-center p-12 text-center text-[10px] text-white/5 font-black uppercase tracking-[0.4em] transition group-hover:bg-white/[0.04] border border-white/5">
                    {style.scene_name}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full h-32 bg-white text-black text-4xl font-serif rounded-[3rem] shadow-[0_0_100px_rgba(255,255,255,0.1)] hover:shadow-[0_0_150px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-6 disabled:opacity-50 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-christmas-gold/0 via-white/40 to-christmas-gold/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {loading ? <Loader2 className="animate-spin w-12 h-12" /> : <Sparkles className="w-12 h-12 text-christmas-gold" />}
                <span className="tracking-tighter">
                  {loading ? "Computing Quantum Art..." : isSignedIn ? t.generate : t.loginRequired}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Charity Section Prominent */}
        <section id="charity" className="bg-white/5 rounded-[4rem] p-20 border border-white/10 text-center relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-8">
            <div className="bg-emerald-500/20 text-emerald-400 w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto border border-emerald-500/30">🐾</div>
            <h3 className="text-6xl font-serif">Making a Difference</h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl font-light">
              Every holiday portrait generated helps feed and shelter abandoned pets. 3% of our revenue is donated weekly to the **International Pet Welfare Alliance**.
            </p>
            <div className="flex justify-center gap-12 pt-8">
              <div>
                <div className="text-4xl font-bold mb-1">45,201</div>
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Meals Provided</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">127</div>
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Shelters Funded</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer with Global Legal Disclaimers */}
      <footer className="bg-black/40 border-t border-white/5 py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-32 text-sm">
          <div className="md:col-span-1 space-y-8">
            <div className="text-christmas-gold font-serif text-4xl tracking-tighter">pic.christmas</div>
            <p className="text-gray-600 font-light leading-relaxed text-xs">
              The world's leading Christmas AI Studio.<br />
              Powered by Nexora Quantum Engine 2.0.<br />
              © 2024 Nexora AI Factory.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">IG</div>
              <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">TK</div>
              <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">FB</div>
            </div>
          </div>
          {["Legal & Privacy", "Our Mission", "Global Access", "Community Support"].map((title, i) => (
            <div key={i} className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-christmas-gold">{title}</h4>
              <ul className="space-y-4 text-gray-500 font-light text-xs">
                {i === 0 && ["Privacy Policy (GDPR)", "Terms & Conditions", "Cookie Preference", "AI Ethical Use", "Legal Disclaimer"].map(l => <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>)}
                {i === 1 && ["3% Charity Alligence", "Zero-Carbon AI Compute", "Zero Log Privacy", "Open Source Initiative", "Identity Verification"].map(l => <li key={l}>{l}</li>)}
                {i === 2 && Object.keys(messages).map(l => <li key={l} className="uppercase text-[10px] cursor-pointer hover:text-white flex items-center gap-2" onClick={() => { setLang(l as Locale); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{l} <span className="text-[8px] opacity-30 tracking-normal">• Native</span></li>)}
                {i === 3 && ["Help Desk 24/7", "WhatsApp for Business", "Affiliate Dashboard", "Influencer Portal", "Enterprise Licensing"].map(l => <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-screen-xl mx-auto text-center border-t border-white/5 pt-20">
          <div className="flex items-center justify-center gap-8 mb-10 opacity-30 grayscale hover:grayscale-0 transition duration-1000">
            <span className="text-xl font-black italic tracking-tighter">STRIPE</span>
            <span className="text-xl font-black italic tracking-tighter">PAYPAL</span>
            <span className="text-xl font-black italic tracking-tighter">MERCADOPAGO</span>
            <span className="text-xl font-black italic tracking-tighter">CLAWBACK</span>
            <span className="text-xl font-black italic tracking-tighter">REPLICATE</span>
          </div>
          <p className="text-gray-700 text-[9px] uppercase tracking-[0.4em] font-sans leading-[2] max-w-4xl mx-auto">
            {t.disclaimer} • GENERATED IMAGES ARE FOR PERSONAL USE ONLY UNLESS COMMERCIAL LICENSE IS PURSUED • NEXORA QUANTUM IS A TRADEMARK OF KOSOVO9 ADVENTURES • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
