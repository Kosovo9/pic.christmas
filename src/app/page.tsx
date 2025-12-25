"use client";

import Image from "next/image";
import { Upload, Camera, Sparkles, Image as ImageIcon, Loader2, Download, Globe, Lock, ShieldCheck, Heart, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { UploadWizard } from "@/components/UploadWizard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Snowfall } from "@/components/Snowfall";
import { generateChristmasPhoto } from "./actions";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

type Language = "EN" | "ES" | "PT";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [lang, setLang] = useState<Language>("ES");
  const [selectedCategory, setSelectedCategory] = useState<string>("stitch");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const t = {
    EN: {
      title: "Christmas AI Studio",
      subtitle: "The World's #1 Open-Source Holiday Portraits",
      cta: "Create Your Holiday Photo",
      generate: "Generate Magic (8K)",
      uploadTitle: "1. Upload Your Reference",
      styleTitle: "2. Select Style Catalog",
      disclaimer: "Legal: All images are AI-generated. 100% Privacy. Deleted after 24h.",
      loginRequired: "Please Login to Generate"
    },
    ES: {
      title: "Estudio AI Navideño",
      subtitle: "Los Retratos Navideños Open-Source #1 del Mundo",
      cta: "Crea tu Foto Navideña",
      generate: "Generar Magia (8K)",
      uploadTitle: "1. Sube tu Referencia",
      styleTitle: "2. Selecciona tu Estilo",
      disclaimer: "Aviso: Imágenes generadas por IA. Privacidad total. Se borran en 24h.",
      loginRequired: "Inicia Sesión para Generar"
    },
    PT: {
      title: "Estúdio de Natal de IA",
      subtitle: "Os Retratos de Natal Open-Source #1 do Mundo",
      cta: "Crie sua Foto de Natal",
      generate: "Gerar Magia (8K)",
      uploadTitle: "1. Envie sua Referência",
      styleTitle: "2. Selecione o Estilo",
      disclaimer: "Aviso: IA artística. Privacidade garantida. Excluido em 24h.",
      loginRequired: "Inicie Sessão para Gerar"
    }
  };

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
      alert("Debes iniciar sesión para usar el estudio.");
      return;
    }
    if (!file || !selectedStyle) {
      alert("Completa todos los pasos (Foto + Estilo)");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("styleId", selectedStyle);
    formData.append("email", user?.primaryEmailAddress?.emailAddress || "");

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
    <div className="min-h-screen bg-[#020617] text-white selection:bg-christmas-red relative overflow-x-hidden">
      <Snowfall />
      <MusicPlayer />

      {/* Navbar Premium with Clerk */}
      <nav className="border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="bg-christmas-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            C
          </div>
          <span className="font-serif text-2xl tracking-tighter text-christmas-gold flex items-center gap-2">
            pic.christmas <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50 font-sans tracking-normal">QUANTUM</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setLang(lang === "EN" ? "ES" : lang === "ES" ? "PT" : "EN")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            <Globe className="w-4 h-4" />
            {lang}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition border border-white/10 shadow-xl">
                Enter Studio
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero 100x Quantum */}
      <header className="pt-24 pb-12 text-center px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full -z-10" />
        <h1 className="text-7xl md:text-9xl font-serif text-white mb-6 tracking-tighter drop-shadow-2xl">
          {t[lang].title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
          {t[lang].subtitle}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-40">

        {/* Result Area */}
        {generatedImage && (
          <section className="mb-24 animate-in fade-in zoom-in duration-1000">
            <div className="relative aspect-[4/5] max-w-xl mx-auto rounded-[3rem] overflow-hidden border-[12px] border-white/5 shadow-[0_0_100px_rgba(255,255,255,0.05)] bg-white/5">
              <Image src={generatedImage} alt="Quantum Result" fill className="object-cover" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-10">
                <a
                  href={generatedImage}
                  download
                  className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition shadow-2xl"
                >
                  <Download className="w-5 h-5" /> Download 8K Masterpiece
                </a>
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 backdrop-blur-sm p-1">

          {/* Upload & Auth Check */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition">
                <Camera className="w-20 h-20" />
              </div>
              <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
                {t[lang].uploadTitle}
              </h2>

              <UploadWizard onUploadComplete={(f) => setFile(f)} />

              {file && (
                <div className="mt-8 flex items-center gap-3 bg-blue-500/10 text-blue-400 p-5 rounded-3xl border border-blue-500/20">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="font-bold text-sm">Target Identity Confirmed</span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-[2.5rem] border border-white/10">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-christmas-gold" /> Quantum Security
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                Your identity is analyzed locally via Gemini Nano. Data is purged automatically from Supabase every 24 hours.
              </p>
            </div>
          </div>

          {/* Catalog & Generate */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-serif mb-2 tracking-tight">{t[lang].styleTitle}</h2>
                <p className="text-gray-500">Curated 10x Open Source Models</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-white text-black ring-4 ring-white/10' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] overflow-y-auto pr-4 custom-scrollbar">
              {filteredStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-700 ${selectedStyle === style.id ? 'border-christmas-gold ring-8 ring-christmas-gold/10' : 'border-transparent opacity-60'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <p className="font-serif text-lg leading-tight mb-1 group-hover:text-christmas-gold transition">{style.scene_name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">{style.location}</p>
                  </div>
                  <div className="w-full h-full bg-[#0a0f1c] flex items-center justify-center p-8 text-center text-xs text-white/5 italic">
                    {style.scene_name} PREVIEW 8K
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full h-24 bg-white text-black text-3xl font-serif rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.01] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-christmas-gold/0 via-white/50 to-christmas-gold/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? <Loader2 className="animate-spin w-10 h-10" /> : <Sparkles className="w-10 h-10" />}
              {loading ? "Quantum Computing..." : isSignedIn ? t[lang].generate : t[lang].loginRequired}
            </button>
          </div>
        </div>

        {/* Global Catalog Feature / Why Open Source */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Globe className="text-christmas-gold" />
            </div>
            <h3 className="text-2xl font-serif">Global Icons</h3>
            <p className="text-gray-500 font-light leading-relaxed">Integrated prompts for Paris, NYC, London, and Tokyo. All high-fashion curated.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <ShieldCheck className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-serif">Privacy Engine</h3>
            <p className="text-gray-500 font-light leading-relaxed">No tracking. No permanent storage. Your face data remains yours. 24h auto-purge.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Sparkles className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-serif">Nano Banana™</h3>
            <p className="text-gray-500 font-light leading-relaxed">10x faster prompt compression. Higher fidelity identity locking without lag.</p>
          </div>
        </section>
      </main>

      <footer className="bg-black/40 border-t border-white/5 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text- christmas-gold font-serif text-3xl mb-8">pic.christmas</div>
          <p className="text-gray-500 max-w-lg mx-auto mb-12 italic leading-relaxed">{t[lang].disclaimer}</p>
          <div className="flex justify-center gap-12 font-bold text-[10px] uppercase tracking-[0.3em] text-white/40 mb-20">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">API</a>
            <a href="#" className="hover:text-white transition">Status</a>
          </div>
          <div className="text-[10px] text-gray-700 font-sans tracking-widest uppercase">
            © MMXXIV NEXORA AI FACTORY | QUANTUM EDITION | ZERO-DEBT 100X
          </div>
        </div>
      </footer>
    </div>
  );
}
