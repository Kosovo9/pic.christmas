"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UploadWizardProps {
    onUploadComplete: (file: File) => void;
}

export function UploadWizard({ onUploadComplete }: UploadWizardProps) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        setFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onUploadComplete(file); // Notify parent
    };

    const clearFile = () => {
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div
                className={cn(
                    "relative group w-full aspect-[4/3] rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center overflow-hidden cursor-pointer",
                    dragActive
                        ? "border-christmas-gold bg-christmas-gold/10 scale-[1.02]"
                        : "border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-christmas-gold/50",
                    preview ? "border-none" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !preview && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                {preview ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFile();
                                }}
                                className="bg-red-500/80 p-3 rounded-full text-white hover:bg-red-600 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <div className="w-20 h-20 rounded-full bg-christmas-gold/10 flex items-center justify-center group-hover:bg-christmas-gold/20 transition-colors duration-300">
                            <Upload className="w-10 h-10 text-christmas-gold" />
                        </div>
                        <div>
                            <p className="text-xl font-medium text-white mb-2">
                                Click or Drop your photo here
                            </p>
                            <p className="text-sm text-gray-400">
                                Supports JPG, PNG (Max 10MB)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
