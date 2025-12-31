"use client";

import { useFormState } from "react-dom";
import { useState, useRef, useCallback } from "react";
import { uploadPhoto } from "@/app/actions";
import { track } from "@/lib/analytics";
import { Upload, Image, Sparkles, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UploadForm() {
  const [state, formAction] = useFormState(uploadPhoto, null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        handleFileSelect(file);
      }
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("El archivo es demasiado grande. Máximo 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Update the file input
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const file = formData.get("file") as File;
    if (!file) return;

    setIsUploading(true);
    track("Upload Started", { size: file.size, type: file.type });

    try {
      await formAction(formData);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form action={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative group transition-all duration-300 ${
            isDragging
              ? "scale-105 shadow-2xl shadow-yellow-400/20"
              : "hover:scale-102 shadow-xl"
          }`}
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative cursor-pointer rounded-premium-lg border-2 border-dashed transition-all duration-300 overflow-hidden
              ${
                isDragging
                  ? "border-yellow-400 bg-yellow-400/5"
                  : preview
                    ? "border-green-400/50 bg-green-400/5"
                    : "border-slate-600 bg-slate-800/20 hover:border-yellow-400/50 hover:bg-slate-700/30"
              }
            `}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-slate-800/20"></div>

            {/* Content */}
            <div className="relative p-8 lg:p-12 text-center">
              <AnimatePresence mode="wait">
                {preview ? (
                  // Preview Mode
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-4"
                  >
                    <div className="relative inline-block">
                      <img
                        src={preview}
                        alt="Vista previa de la imagen seleccionada"
                        className="w-32 h-32 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        ¡Foto seleccionada!
                      </h3>
                      <p className="text-slate-300">
                        Haz clic en "Crear Magia Navideña" para comenzar
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  // Upload Mode
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-6"
                  >
                    {/* Icon */}
                    <div className="relative inline-flex">
                      <div
                        className={`
                          w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                          ${
                            isDragging
                              ? "bg-yellow-400/20 scale-110"
                              : "bg-slate-700/50 group-hover:bg-slate-600/50 group-hover:scale-105"
                          }
                        `}
                      >
                        {isDragging ? (
                          <Upload className="w-10 h-10 text-yellow-400 animate-bounce" />
                        ) : (
                          <Image
                            className="w-10 h-10 text-slate-300 group-hover:text-white transition-colors"
                            aria-label="Upload icon"
                          />
                        )}
                      </div>
                      <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {isDragging
                          ? "¡Suelta tu foto aquí!"
                          : "Sube tu foto mágica"}
                      </h3>
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        Arrastra y suelta tu imagen o{" "}
                        <span className="text-yellow-400 font-medium">
                          haz clic para seleccionar
                        </span>
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                        <span className="bg-slate-800/50 px-3 py-1 rounded-full">
                          JPG
                        </span>
                        <span className="bg-slate-800/50 px-3 py-1 rounded-full">
                          PNG
                        </span>
                        <span className="bg-slate-800/50 px-3 py-1 rounded-full">
                          WEBP
                        </span>
                        <span className="bg-slate-800/50 px-3 py-1 rounded-full">
                          Max 10MB
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Drag Overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-yellow-400/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Upload className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                  <p className="text-xl font-bold text-yellow-400">
                    ¡Suelta aquí tu foto!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            type="submit"
            disabled={!preview || isUploading}
            className={`
              w-full py-4 px-8 rounded-premium font-bold text-lg transition-all duration-300 shadow-lg
              flex items-center justify-center space-x-3 group relative overflow-hidden
              ${
                !preview || isUploading
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transform hover:scale-105 active:scale-95 shadow-red hover:shadow-xl"
              }
            `}
          >
            {/* Background Animation */}
            {!isUploading && preview && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            )}

            {/* Button Content */}
            <div className="relative flex items-center space-x-3">
              {isUploading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creando magia navideña...</span>
                </>
              ) : preview ? (
                <>
                  <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                  <span>Crear Magia Navideña</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6" />
                  <span>Selecciona una foto primero</span>
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {state?.name && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-effect rounded-premium p-6 border border-green-400/30 bg-green-400/5"
            >
              <div className="flex items-center space-x-3 text-center justify-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-green-300 font-bold text-lg">
                    ¡Foto procesada exitosamente!
                  </p>
                  <p className="text-green-400 text-sm">
                    ID: {state.name.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-400 space-y-2"
        >
          <p>
            💡 <strong>Consejo:</strong> Para mejores resultados, usa fotos con
            buena iluminación y el rostro claramente visible
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Procesamiento seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Calidad 8K</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>30 segundos</span>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
