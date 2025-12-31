import { Suspense } from "react";
import { PhotoGrid } from "@/components/PhotoGrid";
import { UploadForm } from "@/components/UploadForm";
import ABTestButton from "@/components/ABTestButton";
import { Sparkles, Star, Gift } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse-slow"></div>
        <div
          className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-green-600/20 border border-yellow-400/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              AI Navideño Premium
            </span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Main Title */}
          <h1 className="text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient-festive">Christmas</span>
            <br />
            <span className="text-white">AI Studio</span>
            <Gift className="inline-block ml-4 w-16 h-16 text-yellow-400 animate-float" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Transforma tus fotos en{" "}
            <span className="text-gradient-gold font-semibold">
              retratos navideños mágicos
            </span>{" "}
            usando inteligencia artificial de última generación
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="glass-effect rounded-full px-6 py-3">
              <span className="text-sm font-medium text-white">
                🎨 IA Premium
              </span>
            </div>
            <div className="glass-effect rounded-full px-6 py-3">
              <span className="text-sm font-medium text-white">
                ⚡ 30 segundos
              </span>
            </div>
            <div className="glass-effect rounded-full px-6 py-3">
              <span className="text-sm font-medium text-white">
                📱 Calidad 8K
              </span>
            </div>
            <div className="glass-effect rounded-full px-6 py-3">
              <span className="text-sm font-medium text-white">
                🌟 60+ Escenarios
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Photo Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Galería de{" "}
              <span className="text-gradient-gold">Magia Navideña</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Descubre las increíbles transformaciones que otros usuarios han
              creado
            </p>
          </div>

          <div className="glass-effect rounded-premium-lg p-8 shadow-premium-lg">
            <Suspense
              fallback={
                <div className="text-center py-20">
                  <div className="inline-flex items-center gap-3 text-slate-400">
                    <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg">Cargando galería mágica...</span>
                  </div>
                </div>
              }
            >
              <PhotoGrid />
            </Suspense>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Crea Tu{" "}
              <span className="text-gradient-gold">Retrato Navideño</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Sube tu foto y deja que nuestra IA cree la magia navideña perfecta
              para ti
            </p>
          </div>

          <div className="glass-effect rounded-premium-lg p-8 lg:p-12 shadow-premium-lg">
            <div className="flex flex-col items-center gap-8">
              {/* A/B Test Button */}
              <div className="w-full max-w-md">
                <ABTestButton />
              </div>

              {/* Upload Form */}
              <div className="w-full">
                <UploadForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
