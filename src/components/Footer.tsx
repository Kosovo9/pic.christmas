"use client";

import { Heart, Gift, Star, Mail, Twitter, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/christmasai" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/christmasai" },
    { name: "GitHub", icon: Github, href: "https://github.com/christmasai" },
    { name: "Email", icon: Mail, href: "mailto:hello@pic.christmas" },
  ];

  const footerLinks = {
    "Producto": [
      { name: "Cómo funciona", href: "#how-it-works" },
      { name: "Galería", href: "#gallery" },
      { name: "Precios", href: "#pricing" },
      { name: "API", href: "/api" },
    ],
    "Soporte": [
      { name: "Centro de ayuda", href: "/help" },
      { name: "Contacto", href: "/contact" },
      { name: "Estado del servicio", href: "/status" },
      { name: "Reportar problema", href: "/report" },
    ],
    "Legal": [
      { name: "Términos de servicio", href: "/terms" },
      { name: "Política de privacidad", href: "/privacy" },
      { name: "Cookies", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-green-900/5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-2.5 h-2.5 text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Christmas<span className="text-gradient-gold">AI</span>
                    </h3>
                    <p className="text-sm text-slate-400">Studio Premium</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed max-w-sm">
                  Transforma tus fotos en retratos navideños mágicos usando la
                  inteligencia artificial más avanzada. Calidad profesional,
                  resultados instantáneos.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 group"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                    {category}
                    <div className="ml-2 w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-slate-400 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.name}
                          </span>
                          <div className="ml-1 w-0 group-hover:w-1 h-1 bg-yellow-400 rounded-full transition-all duration-300"></div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-8 border-t border-slate-800">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-gold mb-2">150K+</div>
              <div className="text-sm text-slate-400">Fotos generadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-gold mb-2">50K+</div>
              <div className="text-sm text-slate-400">Usuarios felices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-gold mb-2">4.9★</div>
              <div className="text-sm text-slate-400">Valoración promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-gold mb-2">30s</div>
              <div className="text-sm text-slate-400">Tiempo promedio</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-sm text-slate-400"
            >
              <span>© {currentYear} Christmas AI Studio.</span>
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>para la magia navideña</span>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/30 px-3 py-1 rounded-full border border-slate-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Todos los sistemas operativos</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/30 px-3 py-1 rounded-full border border-slate-700">
                <Star className="w-3 h-3 text-yellow-400" />
                <span>Calidad premium</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
