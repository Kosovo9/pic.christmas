"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, Sparkles, Heart, ShieldCheck, Play, Gift, Globe, DollarSign, Download, Unlock, ChevronDown, Check } from "lucide-react";
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


import { Button, Card, Section, GradientText, Badge, Modal, Spinner } from "@/components/redesign";
import StitchCharacter from "@/components/StitchCharacter";

import { Snowfall } from "@/components/Snowfall";
import { UploadWizard } from "@/components/UploadWizard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ChatHolly } from "@/components/ChatHolly";
import PayPalBtn from "@/components/PayPalBtn";
import MPBtn from "@/components/MercadoPagoBtn";
import { CountdownBanner } from "@/components/CountdownBanner";
import { ViralExitModal } from "@/components/ViralExitModal";


import { generateChristmasPhoto } from "./actions";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { messages, Locale } from "@/lib/messages";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [lang, setLang] = useState<Locale>("es");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("stitch");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageHash, setImageHash] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  // Fallback to English if translation missing
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
        setImageHash(result.hash || null);
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
      <ChatHolly language={lang} />
      <ViralExitModal language={lang} />

      {/* NAVBAR PREMIUM */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 backdrop-blur-2xl bg-black/20 border-b border-white/5 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-serif font-bold text-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              C
            </div>
            <div>
              <div className="text-base font-bold tracking-tighter flex items-center gap-1">
                pic<span className="text-christmas-gold">.christmas</span>
              </div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-bold">Quantum Studio</div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              <Link href="#studio" className="hover:text-christmas-gold transition-colors">{t.nav_studio}</Link>
              <Link href="#themes" className="hover:text-christmas-gold transition-colors">{t.nav_catalog}</Link>
              <Link href="#charity" className="hover:text-christmas-gold transition-colors">{t.nav_charity}</Link>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 text-xs font-bold uppercase hover:text-christmas-gold transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 animate-in slide-in-from-top-2 p-1 max-h-80 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 gap-1">
                    {Object.keys(messages).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l as Locale); setIsLangMenuOpen(false); }}
                        className={`px-4 py-2 text-left text-xs uppercase font-bold flex items-center justify-between rounded-lg transition-colors ${lang === l ? 'bg-christmas-gold text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span className="flex items-center gap-2">
                          {l === 'en' && '🇺🇸'} {l === 'es' && '🇪🇸'} {l === 'fr' && '🇫🇷'}
                          {l === 'de' && '🇩🇪'} {l === 'it' && '🇮🇹'} {l === 'pt' && '🇧🇷'}
                          {l === 'ru' && '🇷🇺'} {l === 'zh' && '🇨🇳'} {l === 'ja' && '🇯🇵'}
                          {l === 'ar' && '🇸🇦'} {l === 'hi' && '🇮🇳'} {l === 'ko' && '🇰🇷'}
                          {l === 'tr' && '🇹🇷'} {l === 'nl' && '🇳🇱'} {l === 'vi' && '🇻🇳'}
                          {l}
                        </span>
                        {lang === l && <Check className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Backdrop to close menu */}
            {isLangMenuOpen && (
              <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsLangMenuOpen(false)} />
            )}

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="secondary" size="sm" className="hidden md:flex">
                  Login / Signup
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href="/affiliates" className="hidden md:flex text-[10px] text-christmas-gold hover:underline items-center gap-1 font-bold uppercase tracking-wider">
                  <DollarSign className="w-3 h-3" /> {t.nav_affiliates}
                </Link>
                <div className="flex items-center gap-2 bg-white/5 pr-3 rounded-full border border-white/10">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter hidden lg:block">{user?.firstName || 'Account'}</span>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>


      {/* HERO SECTION CINEMÁTICO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
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
            <Badge variant="primary" size="md" className="animate-pulse tracking-[0.2em] font-bold">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              LIMITED EDITION 2024
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight">
              {t.hero_title_line1} <br />
              <GradientText variant="gold" className="py-2 drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                {t.hero_title_line2}
              </GradientText> <br />
              <span className="text-outline-white opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-default">
                {t.hero_title_line3}
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-lg font-light leading-relaxed">
              {t.subtitle} <br />
              <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-3 block font-bold">
                Medical-Grade AI Realism • 8K Cinematic
              </span>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
                icon={<Play className="w-5 h-5 fill-current" />}
                className="bg-gradient-to-r from-christmas-gold to-yellow-600 border-none text-black shadow-[0_0_40px_rgba(255,215,0,0.5)] hover:scale-110 transition-transform"
              >
                {t.generate}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => alert("Generando Pack Viral 10x...")}
                icon={<Sparkles className="w-5 h-5 text-christmas-gold" />}
                className="border-white/20 hover:border-christmas-gold group"
              >
                <span className="group-hover:text-christmas-gold transition-colors">Generar Pack Viral (5 Estilos)</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.nav_catalog}
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
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 bg-christmas-gold/10 blur-[80px] rounded-full animate-pulse" />
              <StitchCharacter initialAction="wave" className="w-full h-full transform scale-110" />
            </div>

            {/* Floating Cards */}
            <Card variant="glass" className="absolute top-10 -right-8 p-3 w-40 animate-float-delayed backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-white/60">{t.footer_legal}</div>
                  <div className="font-bold text-white text-xs">100% Safe</div>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="absolute bottom-20 -left-8 p-3 w-44 animate-float backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white/60">AI Quality</div>
                  <div className="font-bold text-white">8K Ultra HD</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - 3 COLUMNS PREMIUM */}
      <Section variant="dark" className="border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="primary">Innovación Cuántica</Badge>
            <h2 className="text-5xl md:text-7xl font-serif">Por qué elegir <GradientText variant="gold">Quantum Studio</GradientText></h2>
            <p className="text-white/40 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">Tecnología de vanguardia para momentos inolvidables</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna 1: IA Ultra Realista */}
            <Card variant="glass" className="p-10 space-y-6 group hover:border-christmas-gold/50 transition-all duration-700 border-white/5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-christmas-gold to-yellow-600 flex items-center justify-center shadow-[0_10px_30px_rgba(255,215,0,0.3)] group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-serif text-white group-hover:text-christmas-gold transition-colors">IA Ultra Realista 8K</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Nuestro motor <span className="text-christmas-gold">Nexora 2.0</span> procesa cada píxel para mantener tu esencia facial con un realismo médico y cinematográfico inigualable.
              </p>
            </Card>

            {/* Columna 2: Seguridad y Privacidad */}
            <Card variant="glass" className="p-10 space-y-6 group hover:border-emerald-500/50 transition-all duration-700 border-white/5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-serif text-white group-hover:text-emerald-400 transition-colors">Privacidad Blindada</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Tus fotos son procesadas encriptadamente y eliminadas automáticamente. Cumplimos con los estándares globales de seguridad biométrica.
              </p>
            </Card>

            {/* Columna 3: Entrega Instantánea */}
            <Card variant="glass" className="p-10 space-y-6 group hover:border-blue-500/50 transition-all duration-700 border-white/5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-serif text-white group-hover:text-blue-400 transition-colors">Magia sin Fronteras</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Desde Stitch hasta lujo solo en segundos. Descarga digital instantánea optimizada para redes sociales y redes de impresión profesional.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* STUDIO SECTION */}
      <Section id="studio" variant="dark" className="relative z-20 -mt-20 rounded-t-[3rem] bg-neutral-950 border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto space-y-20 pt-20">

          {/* Result Area (Conditional) */}
          {generatedImage && (
            <div className="animate-in fade-in zoom-in duration-700">
              <div className="text-center mb-10">
                <Badge variant="success" size="lg" className="mb-4">Success / Éxito!</Badge>
                <h2 className="text-4xl font-serif">Tu Obra Maestra Cuántica</h2>
                {imageHash && <p className="text-[10px] text-white/30 font-mono mt-2 uppercase tracking-widest">Hash ID: {imageHash}</p>}
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
                      <div className="flex flex-col gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-center text-xs text-white/50 uppercase tracking-widest mb-4">Instant Unlock</p>
                          <PayPalBtn amount={9.90} orderId={imageHash!} clerkId={user?.id || ""} />
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-center text-xs text-white/50 uppercase tracking-widest mb-4">Pago en MXN (Instantáneo)</p>
                          <MPBtn amount={9.90 * 20} orderId={imageHash!} clerkId={user?.id || ""} />
                        </div>
                        <p className="text-[10px] text-center text-white/40 uppercase tracking-widest mt-2">
                          Unlock High-Res & Remove Watermark
                        </p>
                      </div>
                    ) : (
                      <Button variant="primary" fullWidth size="lg" icon={<Download className="w-5 h-5" />} onClick={() => window.open(generatedImage, '_blank')}>
                        Download 8K
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


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* LEFT: UPLOAD & CONFIG */}
            <div className="lg:col-span-4 space-y-10">
              <div className="sticky top-32">
                <h2 className="text-4xl font-serif mb-8 flex items-center gap-4">
                  <span className="bg-christmas-gold text-black w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold font-sans">1</span>
                  {t.uploadTitle}
                </h2>

                <Card variant="elevated" className="p-8 space-y-8 backdrop-blur-sm">
                  <UploadWizard onUploadComplete={setFile} />

                  {/* Quality & Format Specs */}
                  <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> {t.studio_resolutions}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest text-right justify-end">
                      <Download className="w-4 h-4 text-blue-500" /> {t.studio_formats}
                    </div>
                  </div>

                  {file && (
                    <div className="flex items-center gap-4 text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 animate-slide-in-up mt-6">
                      <ShieldCheck className="w-6 h-6" />
                      <div>
                        <span className="font-bold text-sm block">Success Analysis</span>
                        <span className="text-[10px] opacity-70">Identity Locked 99.9%</span>
                      </div>
                    </div>
                  )}
                </Card>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/10 to-blue-900/10 border border-white/5 flex gap-4 items-center group hover:bg-white/5 transition cursor-pointer" onClick={() => window.location.href = '/affiliates'}>
                  <Gift className="w-10 h-10 text-purple-400 group-hover:scale-110 transition" />
                  <div>
                    <h4 className="font-bold text-purple-200">{t.nav_affiliates}</h4>
                    <p className="text-xs text-purple-300/60">Join & Earn 20%</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">Go</Button>
                </div>
              </div>
            </div>

            {/* RIGHT: STYLES STUDIO */}
            <div className="lg:col-span-8 space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                  <h2 className="text-4xl font-serif mb-2 flex items-center gap-4">
                    <span className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold font-sans">2</span>
                    {t.styleTitle}
                  </h2>
                  <p className="text-gray-500 text-sm pl-14">Hundreds of locations available</p>
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[900px] overflow-y-auto custom-scrollbar pr-4">
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
                    <div className="absolute inset-0 bg-neutral-800">
                      <Image
                        src={`https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=400&auto=format&fit=crop`}
                        alt={style.scene_name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className={`font-serif text-sm md:text-base leading-tight mb-1 ${selectedStyle === style.id ? 'text-christmas-gold' : 'text-white'}`}>
                          {style.scene_name}
                        </h3>
                        <p className="text-[8px] text-white/40 uppercase tracking-[0.2em]">{style.location || style.category}</p>
                      </div>
                    </div>

                    {selectedStyle === style.id && (
                      <div className="absolute top-4 right-4 bg-christmas-gold text-black p-1 rounded-full">
                        <Check className="w-4 h-4" />
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
                  className="shadow-[0_0_60px_rgba(255,255,255,0.1)] h-28 text-3xl uppercase tracking-[0.1em] font-black"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <Spinner size="md" color="white" /> Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" /> {t.generate}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CATALOG SECTION (TOP 15 VIRAL) */}
      <Section id="themes" variant="dark" className="border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">{t.nav_catalog}</Badge>
            <h2 className="text-5xl md:text-7xl font-serif text-christmas-gold">{t.catalog_top_title}</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">{t.catalog_curated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CHRISTMAS_PROMPTS.filter(p => p.tags.includes('viral')).slice(0, 15).map((p, i) => (
              <Card key={p.id} variant="glass" className="p-0 overflow-hidden group hover:scale-105 transition-all duration-500 aspect-[4/5] flex flex-col">
                <div className="flex-1 relative">
                  <Image
                    src={`https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=300&auto=format&fit=crop`}
                    alt={p.scene_name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded-md text-[8px] font-bold text-christmas-gold uppercase tracking-widest border border-christmas-gold/30">
                    #{i + 1} Trending
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-t from-neutral-900 to-transparent">
                  <h4 className="font-serif text-sm line-clamp-1">{p.scene_name}</h4>
                  <p className="text-[8px] text-white/30 uppercase mt-1">Ready for 8K Generation</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}>
              Access Full Studio Catalog (200+ styles)
            </Button>
          </div>
        </div>
      </Section>

      {/* CHARITY SECTION */}
      <div id="charity" className="max-w-7xl mx-auto px-6 py-32">
        <Section variant="festive" className="rounded-[4rem] relative overflow-hidden text-center border border-white/10">
          <div className="relative z-10 space-y-8">
            <Badge variant="success" size="lg">Social Impact</Badge>
            <h3 className="text-5xl md:text-7xl font-serif">{t.impact_title}</h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
              {t.impact_text}
            </p>
            <div className="grid grid-cols-2 max-w-md mx-auto gap-8 pt-8">
              <div>
                <div className="text-5xl font-bold text-christmas-gold mb-2">45k+</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{t.impact_stat1}</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-christmas-gold mb-2">127</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{t.impact_stat2}</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* FOOTER */}
      <footer className="bg-black py-32 border-t border-white/5 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 text-[11px] text-white/40 uppercase tracking-widest font-bold">
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-christmas-gold flex items-center justify-center font-bold text-black font-serif">C</div>
              <span className="text-xl font-serif text-white">pic.christmas</span>
            </div>
            <p className="text-xs leading-relaxed">
              {t.subtitle}<br />
              Powered by Nexora Quantum Engine 2.0.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">{t.footer_legal}</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="#" className="hover:text-christmas-gold transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Ethical AI Use</a></li>
              <li className="text-white/30">{t.disclaimer}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">{t.footer_community}</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="/affiliates" className="hover:text-christmas-gold transition">{t.nav_affiliates}</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">Influencers</a></li>
              <li><a href="#" className="hover:text-christmas-gold transition">{t.nav_charity}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">{t.footer_global}</h4>
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
            © 2024 Nexora AI Factory • {t.footer_rights}
          </p>
          <div className="flex justify-center gap-12 opacity-30 hover:opacity-100 transition duration-700">
            {/* Payment Logos */}
            <span className="font-black italic tracking-tighter text-xl">PAYPAL</span>
            <span className="font-black italic tracking-tighter text-xl">MERCADO PAGO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
