"use client";

import Image from "next/image";
import { Upload, Camera, Sparkles, Image as ImageIcon, Loader2, Download, Globe, Lock, ShieldCheck, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { UploadWizard } from "@/components/UploadWizard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { generateChristmasPhoto } from "./actions";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";

type Language = "EN" | "ES" | "PT";

export default function Home() {
  const [lang, setLang] = useState<Language>("ES");
  const [selectedCategory, setSelectedCategory] = useState<string>("woman");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  const t = {
    EN: {
      title: "Christmas AI Studio",
      subtitle: "The World's #1 Hyper-Realistic Holiday Portraits",
      cta: "Create Your Holiday Photo",
      generate: "Generate Now",
      uploadTitle: "1. Upload Your Reference Photo",
      styleTitle: "2. Choose Your 8K Scene Catalog",
      emailHint: "Step 3. Enter Email for Delivery",
      packages: "Exclusive Packages",
      oneShot: "Standard One-Shot",
      diamond: "Diamond Premium",
      disclaimer: "Legal Disclaimer: All AI generated images are artistic and not real. 100% Privacy Guaranteed."
    },
    ES: {
      title: "Estudio AI Navideño",
      subtitle: "Los Retratos Navideños Hiper-Realistas #1 del Mundo",
      cta: "Crea tu Foto Navideña",
      generate: "Generar Ahora",
      uploadTitle: "1. Sube tu Foto de Referencia",
      styleTitle: "2. Elige tu Escena del Catálogo 8K",
      emailHint: "Paso 3. Correo para Entrega",
      packages: "Paquetes Exclusivos",
      oneShot: "Estándar One-Shot",
      diamond: "Diamante Premium",
      disclaimer: "Aviso Legal: Todas las imágenes son generadas por IA artística. Privacidad 100% garantizada."
    },
    PT: {
      title: "Estúdio de Natal de IA",
      subtitle: "Os Retratos de Natal Hiperrealistas #1 do Mundo",
      cta: "Crie sua Foto de Natal",
      generate: "Gerar Agora",
      uploadTitle: "1. Carregue sua Foto de Referência",
      styleTitle: "2. Escolha sua Cena do Catálogo 8K",
      emailHint: "Passo 3. E-mail para Entrega",
      packages: "Pacotes Exclusivos",
      oneShot: "Padrão One-Shot",
      diamond: "Diamante Premium",
      disclaimer: "Aviso Legal: Todas as imagens são geradas por IA artística. Privacidade 100% garantida."
    }
  };

  const categories = [
    { id: "woman", label: "Woman / Mujer" },
    { id: "man", label: "Man / Hombre" },
    { id: "couple_HM", label: "Couples / Parejas" },
    { id: "family", label: "Family / Familias" },
    { id: "stitch", label: "Stitch & Magic" },
    { id: "pets", label: "Pets / Mascotas" }
  ];

  const filteredStyles = CHRISTMAS_PROMPTS.filter(p => p.category === selectedCategory);

  const [snow, setSnow] = useState<any[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 5 + "s",
      duration: Math.random() * 5 + 5 + "s",
      size: Math.random() * 4 + 2 + "px"
    }));
    setSnow(flakes);
  }, []);

  const handleCheckout = async (pkgId: string) => {
    if (!email) {
      alert("Please enter your email first to secure your slot!");
      return;
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ packageId: pkgId, email }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed. Please try again.");
    }
  };

  const handleGenerate = async () => {
    if (!file || !selectedStyle || !email) {
      alert("Please complete all steps (Upload + Style + Email)!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("styleId", selectedStyle);
    formData.append("email", email);

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
    <div className="min-h-screen bg-black text-white selection:bg-christmas-red selection:text-white relative">
      <div className="snow-container">
        {snow.map(f => (
          <div
            key={f.id}
            className="snowflake"
            style={{ left: f.left, animationDelay: f.delay, animationDuration: f.duration, width: f.size, height: f.size }}
          />
        ))}
      </div>

      <MusicPlayer />

      {/* Navbar Premium */}
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-christmas-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(212,175,55,0.5)]">
            C
          </div>
          <span className="font-serif text-2xl tracking-tighter text-christmas-gold">pic.christmas</span>
        </div>

        {/* Stitch Floating Badge */}
        <div className="hidden md:flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full animate-bounce">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter">Stitch Edition Live</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "EN" ? "ES" : lang === "ES" ? "PT" : "EN")}
            className="flex items-center gap-2 border border-white/20 px-3 py-1 rounded-full hover:bg-white/10 transition"
          >
            <Globe className="w-4 h-4" />
            {lang}
          </button>
          <button className="bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium transition">
            Check-In
          </button>
        </div>
      </nav>

      {/* Hero Section 100x */}
      <header className="py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-christmas-gold/10 blur-[120px] rounded-full -z-10" />
        <h1 className="text-6xl md:text-8xl font-serif text-christmas-gold mb-6 tracking-tighter drop-shadow-2xl">
          {t[lang].title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
          {t[lang].subtitle}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-40">

        {/* Results / Generated Section */}
        {generatedImage && (
          <section className="mb-20 animate-in fade-in zoom-in duration-1000">
            <div className="relative aspect-[4/5] max-w-xl mx-auto rounded-3xl overflow-hidden border-8 border-christmas-gold/20 shadow-2xl">
              <Image src={generatedImage} alt="Magic Result" fill className={`object-cover ${!isPaid ? 'blur-sm grayscale' : ''}`} />
              {!isPaid && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md p-10 text-center">
                  <Lock className="w-16 h-16 text-christmas-gold mb-6 animate-pulse" />
                  <h3 className="text-3xl font-serif mb-4">Masterpiece Protected</h3>
                  <p className="text-gray-300 mb-8">Your unique hash is generated. Unlock full 8K resolution without watermark.</p>
                  <button className="bg-christmas-gold text-black font-bold px-10 py-4 rounded-xl text-xl hover:scale-105 transition shadow-2xl">
                    Unlock Now • $9.90
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Upload & Categories */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                <Camera className="text-christmas-gold" /> {t[lang].uploadTitle}
              </h2>
              <UploadWizard onUploadComplete={(f) => setFile(f)} />
              {file && (
                <div className="mt-6 flex items-center gap-3 bg-green-500/20 text-green-400 p-4 rounded-2xl border border-green-500/30">
                  <ShieldCheck /> Photo Secured & Locked
                </div>
              )}
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                <Sparkles className="text-christmas-gold" /> {t[lang].emailHint}
              </h2>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/20 p-4 rounded-2xl focus:border-christmas-gold outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-4 italic">Exclusive delivery for your private hash.</p>
            </div>
          </div>

          {/* Right Column: MEGA CATALOG */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl font-serif flex items-center gap-3">
              <ImageIcon className="text-christmas-gold" /> {t[lang].styleTitle}
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === cat.id ? 'bg-christmas-gold text-black' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid Catalog */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {filteredStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-500 ${selectedStyle === style.id ? 'border-christmas-gold scale-[0.98]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <p className="font-serif text-sm leading-tight">{style.scene_name}</p>
                    <p className="text-[10px] text-christmas-gold uppercase tracking-widest">{style.location}</p>
                  </div>
                  {/* Mock image based on scene - in production these are real samples */}
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white/10 italic text-center p-6 bg-gradient-to-br from-gray-800 to-black">
                    Previewing {style.scene_name}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full h-20 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-2xl font-bold rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all transform hover:scale-[1.01] flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
              {loading ? "Creating Hyper-Magic..." : t[lang].generate}
            </button>
          </div>
        </div>

        {/* High-Gama Packages Table */}
        <section className="mt-40">
          <h2 className="text-4xl font-serif text-center mb-16 text-christmas-gold uppercase tracking-widest">{t[lang].packages}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: t[lang].oneShot, price: "$9.90", items: ["1 High-Realism Photo", "Private Hash Lock", "Email Delivery"], premium: false },
              { name: "Gold Collection", price: "$24.90", items: ["3 Seasonal Portraits", "Identity Lock Pro", "Priority Queue", "Social Share Pack"], premium: false },
              { name: t[lang].diamond, price: "$49.99", items: ["Exclusive Limited Scenes", "8K Cinematic Render", "Video Making-Of", "Custom Styling Audit"], premium: true },
            ].map((p, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border ${p.premium ? 'border-christmas-gold bg-gradient-to-br from-yellow-900/40 to-black shadow-2xl' : 'border-white/10 bg-white/5'} flex flex-col`}>
                <h3 className="text-2xl font-serif mb-2">{p.name}</h3>
                <div className="text-4xl font-bold text-christmas-gold mb-8">{p.price}</div>
                <ul className="flex-1 space-y-4 mb-10">
                  {p.items.map((item, ii) => (
                    <li key={ii} className="flex items-center gap-3 text-gray-400">
                      <Heart className="w-4 h-4 text-christmas-red" /> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout(p.premium ? 'diamond' : (i === 1 ? 'gold' : 'silver'))}
                  className={`w-full py-4 rounded-2xl font-bold transition ${p.premium ? 'bg-christmas-gold text-black' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer & Disclaimers */}
      <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md py-20 px-6 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="max-w-xl mx-auto leading-relaxed">{t[lang].disclaimer}</p>
          <div className="flex justify-center gap-8 uppercase tracking-widest font-semibold text-xs">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Help</a>
          </div>
          <div className="pt-10 border-t border-white/5 opacity-50">
            © 2024 PIC.CHRISTMAS | Powered by Nexora AI Factory | Elon Mode Activated
          </div>
        </div>
      </footer>
    </div>
  );
}
