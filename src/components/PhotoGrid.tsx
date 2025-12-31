"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Download, Sparkles, Zap, Crown } from "lucide-react";

interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  likes: number;
  style: string;
  isPremium?: boolean;
  blur?: string;
}

export function PhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  // Fotos de ejemplo con diferentes estilos y dimensiones
  const photos: Photo[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=600&auto=format&fit=crop",
      alt: "Retrato navideño en Rockefeller Center",
      width: 400,
      height: 500,
      likes: 234,
      style: "Rockefeller Center",
      isPremium: true,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1577979749830-3c0d72d1db8f?q=80&w=600&auto=format&fit=crop",
      alt: "Con Santa Claus mágico",
      width: 400,
      height: 300,
      likes: 189,
      style: "Con Santa Claus",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
      alt: "Mercado navideño Budapest",
      width: 400,
      height: 450,
      likes: 167,
      style: "Budapest Market",
      isPremium: true,
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600&auto=format&fit=crop",
      alt: "Nochebuena en Tokyo",
      width: 400,
      height: 320,
      likes: 298,
      style: "Tokyo Christmas",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=600&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Villa navideña alpina",
      width: 400,
      height: 380,
      likes: 145,
      style: "Alpine Village",
      isPremium: true,
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=600&auto=format&fit=crop",
      alt: "Estilo vintage navideño",
      width: 400,
      height: 280,
      likes: 203,
      style: "Vintage Christmas",
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&auto=format&fit=crop",
      alt: "Bosque encantado",
      width: 400,
      height: 420,
      likes: 276,
      style: "Enchanted Forest",
      isPremium: true,
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1577979749830-3c0d72d1db8f?q=80&w=600&auto=format&fit=crop&ixid=different",
      alt: "Cena navideña familiar",
      width: 400,
      height: 350,
      likes: 156,
      style: "Family Dinner",
    },
    // Añadir más fotos para completar la grilla
    ...Array.from({ length: 16 }, (_, i) => ({
      id: `${i + 9}`,
      src: `https://images.unsplash.com/photo-${1544275608 + i * 1000}-d22731ee0ae6?q=80&w=600&auto=format&fit=crop`,
      alt: `Retrato navideño estilo ${i + 1}`,
      width: 400,
      height: Math.floor(Math.random() * 200) + 280,
      likes: Math.floor(Math.random() * 300) + 50,
      style: [
        "Winter Wonderland",
        "Cozy Fireplace",
        "Snow Globe",
        "Christmas Market",
      ][i % 4],
      isPremium: Math.random() > 0.6,
    })),
  ];

  const handleLike = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  // Cerrar modal con escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <div className="w-full">
        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative overflow-hidden rounded-premium-lg shadow-premium group-hover:shadow-premium-lg transition-all duration-500 group-hover:scale-105">
                {/* Image */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto object-cover"
                  loading={index < 8 ? "eager" : "lazy"}
                  priority={index < 4}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Style Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                          {photo.isPremium && (
                            <Crown className="w-3 h-3 text-yellow-400" />
                          )}
                          <span className="text-xs font-medium text-white">
                            {photo.style}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => handleLike(photo.id, e)}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group/like"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors group-hover/like:scale-110 ${
                              likedPhotos.has(photo.id)
                                ? "text-red-500 fill-red-500"
                                : "text-white"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-white">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm">8K</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                        <span className="text-xs text-white/80">Ver más</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Badge */}
                {photo.isPremium && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                      <Crown className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse opacity-0 group-hover:opacity-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <button className="glass-effect border border-white/20 text-white px-8 py-4 rounded-premium font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-2 mx-auto group">
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            <span>Ver más creaciones mágicas</span>
          </button>
        </motion.div>
      </div>

      {/* Modal for selected photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-premium-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Info Panel */}
              <div className="p-6 border-t border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {selectedPhoto.style}
                    </h3>
                    <p className="text-slate-400">{selectedPhoto.alt}</p>
                  </div>

                  {selectedPhoto.isPremium && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Heart
                        className={`w-5 h-5 ${likedPhotos.has(selectedPhoto.id) ? "text-red-500 fill-red-500" : ""}`}
                      />
                      <span>
                        {selectedPhoto.likes +
                          (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}{" "}
                        likes
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Calidad 8K</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => handleLike(selectedPhoto.id, e)}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Heart
                        className={`w-4 h-4 ${likedPhotos.has(selectedPhoto.id) ? "text-red-500 fill-red-500" : ""}`}
                      />
                      <span>Like</span>
                    </button>

                    <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
