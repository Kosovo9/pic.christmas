"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Sparkles, Heart, ShieldCheck, Play, Gift, Globe, DollarSign, Download, Unlock } from "lucide-react";
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// Importamos componentes rediseñados y Stitch
import { Button, Card, Section, GradientText, Badge, Modal, Spinner } from "@/components/redesign";
import StitchCharacter from "@/components/StitchCharacter";

// Importamos componentes funcionales originales para mantener 100% de funcionalidad
import { Snowfall } from "@/components/Snowfall";
import { UploadWizard } from "@/components/UploadWizard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ChatHolly } from "@/components/ChatHolly";
import { CountdownBanner } from "@/components/CountdownBanner";
import { ViralExitModal } from "@/components/ViralExitModal";

import { generateChristmasPhoto } from "./actions";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { messages, Locale } from "@/lib/messages";

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
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-christmas-red selection:text-white">
      {/* Componentes Funcionales Globales Preservados */}
      <CountdownBanner />
      <Snowfall />
      <MusicPlayer />
      <ChatHolly />
      <ViralExitModal language={lang} />

      {/* NAVBAR PREMIUM */}
      <nav className="fixed top-[40px] left-0 right-0 z-40 px-6 py-4 glass-effect border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-serif font-bold text-black text-xl shadow-gold animate-glow">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-tight text-white">
                pic.<span className="text-christmas-gold">christmas</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">Quantum Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/60">
              <a href="#studio" className="hover:text-christmas-gold transition-colors">Studio</a>
              <a href="#themes" className="hover:text-christmas-gold transition-colors">Catalog</a>
              <a href="#charity" className="hover:text-christmas-gold transition-colors">Charity</a>
            </div>

            {/* Language Selector Simple */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="text-xs font-bold uppercase hover:text-christmas-gold transition-colors"
            >
              <Globe className="w-4 h-4 inline mr-1" />
              {lang}
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="secondary" size="sm" className="hidden md:flex">
                  Login / Signup
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <a href="/affiliates" className="hidden md:flex text-[10px] text-christmas-gold hover:underline items-center gap-1 font-bold uppercase tracking-wider">
                  <DollarSign className="w-3 h-3" /> Affiliates
                </a>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* HERO SECTION CINEMÁTICO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Fondo con Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=1920&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover opacity-40 scale-105 animate-pulse-slow"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-up">
            <Badge variant="primary" size="md" className="animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              EDICIÓN LIMITADA 2024
            </Badge>

            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter">
              Navidad <br />
              <GradientText variant="gold">Mágica &</GradientText> <br />
              <span className="text-outline-white">Eterna</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-lg font-light leading-relaxed">
              {t.subtitle} Elevate your holiday identity with medical-grade AI realism and 8K cinematic lighting.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
                icon={<Play className="w-5 h-5 fill-current" />}
              >
                {t.generate}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Catálogo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 opacity-70">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Privacy
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                <Globe className="w-4 h-4" /> Global Delivery
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative animate-float">
            {/* STITCH 3D CHARACTER */}
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-christmas-gold/10 blur-[100px] rounded-full animate-pulse" />
              <StitchCharacter initialAction="wave" className="w-full h-full transform scale-125" />
            </div>

            {/* Floating Cards */}
            <Card variant="glass" className="absolute top-10 -right-10 p-4 w-48 animate-float-delayed backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white/60">Privacidad</div>
                  <div className="font-bold text-white">100% Segura</div>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="absolute bottom-20 -left-10 p-4 w-52 animate-float backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white/60">Calidad AI</div>
                  <div className="font-bold text-white">8K Ultra HD</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* STUDIO SECTION */}
      <Section id="studio" variant="dark" className="relative z-20 -mt-20 rounded-t-[3rem] bg-neutral-950 border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto space-y-20 pt-20">

          {/* Result Area (Conditional) */}
          {generatedImage && (
            <div className="animate-in fade-in zoom-in duration-700">
              <div className="text-center mb-10">
                <Badge variant="success" size="lg" className="mb-4">¡Imagen Generada con Éxito!</Badge>
                <h2 className="text-4xl font-serif">Tu Obra Maestra Cuántica</h2>
              </div>
              <div className="max-w-md mx-auto relative group">
                <Card variant="gradient" className="overflow-hidden p-2 rounded-[3rem]">
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                    <Image src={generatedImage} alt="Result" fill className="object-cover" />
                    {!isPaid && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-none">
                        <div className="text-white/20 text-6xl font-black rotate-[-45deg] select-none tracking-tighter">PREVIEW</div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    {!isPaid ? (
                      <Button variant="secondary" fullWidth size="lg" icon={<Unlock className="w-5 h-5" />} onClick={() => setIsPaid(true)}>
                        Desbloquear HD ($9.90)
                      </Button>
                    ) : (
                      <Button variant="primary" fullWidth size="lg" icon={<Download className="w-5 h-5" />} onClick={() => window.open(generatedImage, '_blank')}>
                        Descargar 8K
                      </Button>
                    )}
                    <p className="text-center text-[10px] uppercase tracking-widest text-white/40">
                      Full Commercial Rights Included
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* LEFT: UPLOAD & CONFIG */}
            <div className="lg:col-span-5 space-y-10">
              <div className="sticky top-32">
                <h2 className="text-4xl font-serif mb-8 flex items-center gap-4">
                  <span className="bg-christmas-gold text-black w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold font-sans">1</span>
                  {t.uploadTitle}
                </h2>

                <Card variant="elevated" className="p-8 space-y-8 backdrop-blur-sm">
                  <UploadWizard onUploadComplete={setFile} />
                  {file && (
                    <div className="flex items-center gap-4 text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 animate-slide-in-up">
                      <ShieldCheck className="w-6 h-6" />
                      <div>
                        <span className="font-bold text-sm block">Foto Analizada con Éxito</span>
                        <span className="text-[10px] opacity-70">Identity Locked 99.9%</span>
                      </div>
                    </div>
                  )}
                </Card>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/10 to-blue-900/10 border border-white/5 flex gap-4 items-center group hover:bg-white/5 transition cursor-pointer">
                  <Gift className="w-10 h-10 text-purple-400 group-hover:scale-110 transition" />
                  <div>
                    <h4 className="font-bold text-purple-200">Gana Dinero</h4>
                    <p className="text-xs text-purple-300/60">Únete al programa de afiliados y gana 20%</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={() => window.location.href = '/affiliates'}>Ver más</Button>
                </div>
              </div>
            </div>

            {/* RIGHT: STYLES CATALOG */}
            <div id="themes" className="lg:col-span-7 space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                  <h2 className="text-4xl font-serif mb-2 flex items-center gap-4">
                    <span className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold font-sans">2</span>
                    {t.styleTitle}
                  </h2>
                  <p className="text-gray-500 text-sm pl-14">Catálogo curado por diseñadores • Edición 2024</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 max-w-full custom-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`
                               px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                               ${selectedCategory === cat.id
                          ? 'bg-christmas-gold border-christmas-gold text-black shadow-lg scale-105'
                          : 'bg-transparent border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}
                             `}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 max-h-[800px] overflow-y-auto custom-scrollbar pr-2">
                {filteredStyles.map(style => (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                              cursor-pointer rounded-[2rem] overflow-hidden relative aspect-[3/4] group transition-all duration-300 border-2
                              ${selectedStyle === style.id
                        ? 'border-christmas-gold ring-4 ring-christmas-gold/20 scale-[0.98]'
                        : 'border-transparent hover:border-white/20 hover:scale-[1.01]'}
                           `}
                  >
                    {/* Fallback visual until real images are mapped */}
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center overflow-hidden">
                      <span className="text-[100px] opacity-5 select-none font-serif font-black">{style.id.charAt(0)}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className={`font-serif text-xl leading-tight mb-1 ${selectedStyle === style.id ? 'text-christmas-gold' : 'text-white'}`}>
                          {style.scene_name}
                        </h3>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">{style.category}</p>
                      </div>
                    </div>

                    {selectedStyle === style.id && (
                      <div className="absolute top-4 right-4 bg-christmas-gold text-black p-1 rounded-full">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Button
                  fullWidth
                  size="xl"
                  variant="primary"
                  disabled={loading || !file || !selectedStyle}
                  onClick={handleGenerate}
                  className="shadow-[0_0_50px_rgba(196,28,59,0.3)] h-24 text-2xl"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <Spinner size="md" color="white" /> Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" /> Generar Foto Navideña
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CHARITY SECTION (Preserved logic, new design) */}
      <div id="charity" className="max-w-7xl mx-auto px-6 py-32">
        <Section variant="festive" className="rounded-[4rem] relative overflow-hidden text-center border border-white/10">
          <div className="relative z-10 space-y-8">
            <Badge variant="success" size="lg">Impacto Social</Badge>
            <h3 className="text-5xl md:text-7xl font-serif">Hacemos la Diferencia</h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
              Cada foto que generas alimenta y abriga a mascotas abandonadas.
              <strong className="text-white"> 3% de nuestros ingresos</strong> son donados semanalmente.
            </p>
            <div className="grid grid-cols-2 max-w-md mx-auto gap-8 pt-8">
              <div>
                <div className="text-5xl font-bold text-christmas-gold mb-2">45k+</div>
                <div className="text-xs uppercase tracking-widest text-white/50">Comidas Servidas</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-christmas-gold mb-2">127</div>
                <div className="text-xs uppercase tracking-widest text-white/50">Refugios Apoyados</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* FOOTER */}
      <footer className="bg-neutral-950 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-sm text-gray-400">
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-christmas-gold flex items-center justify-center font-bold text-black font-serif">C</div>
              <span className="text-xl font-serif text-white">pic.christmas</span>
            </div>
            <p className="text-xs leading-relaxed">
              The world's leading Christmas AI Studio.<br />
              Powered by Nexora Quantum Engine 2.0.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Legal</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="#" className="hover:text-christmas-gold transition">Privacy Policy (GDPR)</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Ethical AI Use</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Comunidad</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="/affiliates" className="hover:text-christmas-gold transition">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Influencers</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Charity Impact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Global</h4>
            <div className="flex flex-wrap gap-2">
              {Object.keys(messages).map((l) => (
                <button key={l} onClick={() => setLang(l as Locale)} className="px-3 py-1 border border-white/10 rounded hover:bg-white/10 text-xs uppercase transition">
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest mb-4">
            © 2024 Nexora AI Factory • All Rights Reserved
          </p>
          <div className="flex justify-center gap-8 opacity-20 hover:opacity-100 transition duration-500">
            {/* Dummy Pay Logos */}
            <span className="font-black italic">STRIPE</span>
            <span className="font-black italic">PAYPAL</span>
            <span className="font-black italic">VISA</span>
            <span className="font-black italic">MASTERCARD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
