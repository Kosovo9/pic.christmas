"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Gift, Star, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Inicio", href: "#home", icon: Sparkles },
    { name: "Galería", href: "#gallery", icon: Star },
    { name: "Precios", href: "#pricing", icon: Gift },
    { name: "Perfil", href: "#profile", icon: User },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-slate-900" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Christmas<span className="text-gradient-gold">AI</span>
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Studio Premium</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-300 group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                    <span className="font-medium">{item.name}</span>
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex"
            >
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Crear Gratis</span>
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-white/10 text-white hover:bg-slate-700/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-green-500 rounded-lg flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-white">ChristmasAI</h2>
                      <p className="text-xs text-slate-400">Menu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 px-6 py-8 space-y-4">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 border border-white/5 text-white hover:bg-slate-700/50 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center group-hover:from-red-500/20 group-hover:to-green-500/20 transition-all">
                          <IconComponent className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                        </div>
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <p className="text-sm text-slate-400">
                            {item.name === "Inicio" && "Página principal"}
                            {item.name === "Galería" && "Ver ejemplos"}
                            {item.name === "Precios" && "Planes premium"}
                            {item.name === "Perfil" && "Tu cuenta"}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="p-6 border-t border-white/10">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Crear Mi Foto Navideña</span>
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    Gratis • Sin registro • Resultados en 30s
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
