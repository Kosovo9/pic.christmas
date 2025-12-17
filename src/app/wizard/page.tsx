"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { trpc } from "@/lib/trpc-client";
import { Loader2, UploadCloud, CreditCard, Lock, Clock, Download, ChevronRight, Sparkles, CheckCircle2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";
import Link from "next/link";
import { TurnstileGate, type TurnstileRef } from "@/components/TurnstileGate";
import { useTurnstileFlow } from "@/components/useTurnstileFlow";

type Step = "upload" | "preview" | "credits" | "results";

const stepsList: { id: Step; label: string; icon: any }[] = [
    { id: "upload", label: "Upload", icon: UploadCloud },
    { id: "preview", label: "Preview", icon: ImageIcon },
    { id: "credits", label: "Credits", icon: CreditCard },
    { id: "results", label: "Result", icon: Sparkles },
];

export default function WizardPage() {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalKey, setOriginalKey] = useState<string | null>(null);
    const [transformationId, setTransformationId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Config Turnstile Ref
    const turnstileGateRef = useRef<TurnstileRef>(null);
    const { verifying, setToken, run } = useTurnstileFlow();

    // Credits State
    const [currency, setCurrency] = useState<"usd" | "mxn">("usd");
    const [selectedPkg, setSelectedPkg] = useState<"10" | "25" | "100">("10");

    // TRPC
    const utils = trpc.useUtils();
    const credits = trpc.credits.getBalance.useQuery();
    const getPresigned = trpc.r2.createUploadUrl.useMutation();
    const createTransformation = trpc.transformations.create.useMutation();
    const startTransformation = trpc.transformations.start.useMutation();
    const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

    // Handle Stripe Return
    useEffect(() => {
        const s = searchParams.get("step") as Step;
        const payment = searchParams.get("payment");
        if (s && ["upload", "preview", "credits", "results"].includes(s)) {
            if (payment === 'success') {
                setStep("credits");
            } else {
                setStep(s);
            }
        }
    }, [searchParams]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const f = acceptedFiles[0];
        if (!f) return;
        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
        setStep("preview");
        setErrorMsg(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
        maxSize: 10 * 1024 * 1024,
        multiple: false
    });

    const handleUpload = async () => {
        if (!file) return;
        setErrorMsg(null);
        try {
            // Intento obtener token. Si falla o timeout, lanza error
            const token = await run({
                exec: () => turnstileGateRef.current?.execute(),
                reset: () => turnstileGateRef.current?.reset()
            });

            if (!token) {
                throw new Error("Security check failed. Please refresh and try again.");
            }

            const { url, key } = await getPresigned.mutateAsync({
                contentType: file.type,
                fileSize: file.size,
                turnstileToken: token,
            });

            await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            setOriginalKey(key);
            const record = await createTransformation.mutateAsync({ originalKey: key });
            setTransformationId(record.id);
            setStep("credits");
        } catch (e: any) {
            console.error(e);
            setErrorMsg(e?.message || "Upload failed. Please try again.");
        }
    };

    const handleTransform = async () => {
        if (!transformationId) return;
        setErrorMsg(null);
        try {
            const token = await run({
                exec: () => turnstileGateRef.current?.execute(),
                reset: () => turnstileGateRef.current?.reset()
            });

            await startTransformation.mutateAsync({
                id: transformationId,
                turnstileToken: token,
            });
            setStep("results");
        } catch (e) {
            setErrorMsg("Transformation failed or insufficient credits.");
        }
    };

    const handleCheckout = async () => {
        const { url } = await createCheckout.mutateAsync({
            currency,
            packageId: selectedPkg
        });
        if (url) window.location.href = url;
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black text-white">
            <TurnstileGate
                ref={turnstileGateRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onToken={setToken}
                onError={(msg) => console.error("Turnstile Gate:", msg)}
            />

            {/* Premium Glass Container */}
            <div className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-20 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 left-0 p-20 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

                {/* Header */}
                <div className="text-center mb-10 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                            Magic Studio
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg">Turn your photos into holiday masterpieces.</p>
                </div>

                {/* Progress Stepper */}
                <div className="flex justify-between items-center mb-12 relative z-10 max-w-2xl mx-auto">
                    {stepsList.map((s, idx) => {
                        const Icon = s.icon;
                        const isActive = s.id === step;
                        const isCompleted = stepsList.findIndex(x => x.id === step) > idx;

                        return (
                            <div key={s.id} className="flex flex-col items-center gap-2 relative group">
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                                    isActive ? "bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" :
                                        isCompleted ? "bg-green-500/20 border-green-500 text-green-400" :
                                            "bg-white/5 border-white/10 text-slate-500"
                                )}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className={cn(
                                    "text-xs font-semibold uppercase tracking-wider transition-colors duration-300 absolute -bottom-8 w-max text-center",
                                    isActive ? "text-blue-400" : isCompleted ? "text-green-400" : "text-slate-600"
                                )}>
                                    {s.label}
                                </span>

                                {/* Connector Line */}
                                {idx < stepsList.length - 1 && (
                                    <div className={cn(
                                        "hidden md:block absolute top-6 left-1/2 w-[calc(100%*3)] h-[2px] -z-0 transition-colors duration-500",
                                        isCompleted ? "bg-green-500/30" : "bg-white/5"
                                    )} style={{ transform: "translateX(50%)" }} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Error Banner */}
                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 flex items-center gap-2 animate-in slide-in-from-top-2">
                        <AlertCircleClassName="w-5 h-5 text-red-400" />
                        <span>{errorMsg}</span>
                        <button onClick={() => setErrorMsg(null)} className="ml-auto text-sm hover:text-white underline">Dismiss</button>
                    </div>
                )}

                {/* Content Area */}
                <div className="relative z-10 min-h-[400px] flex items-center justify-center">

                    {/* STEP 1: UPLOAD */}
                    {step === "upload" && (
                        <div
                            {...getRootProps()}
                            className={cn(
                                "w-full max-w-2xl h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group",
                                isDragActive ? "border-blue-500 bg-blue-500/10 scale-[1.02]" : "border-white/10 bg-white/5 hover:border-blue-400/50 hover:bg-white/10"
                            )}
                        >
                            <input {...getInputProps()} />
                            <div className="p-6 bg-white/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                                <UploadCloud className="w-10 h-10 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Upload your photo</h3>
                            <p className="text-slate-400 mb-6 font-medium">Drag & drop or click to browse</p>
                            <div className="flex gap-3 text-xs text-slate-500 uppercase tracking-widest font-semibold">
                                <span className="bg-white/5 px-2 py-1 rounded">JPG</span>
                                <span className="bg-white/5 px-2 py-1 rounded">PNG</span>
                                <span className="bg-white/5 px-2 py-1 rounded">WEBP</span>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: PREVIEW */}
                    {step === "preview" && previewUrl && (
                        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <div className="relative w-full max-w-2xl aspect-square md:aspect-video rounded-3xl overflow-hidden bg-black/50 shadow-2xl border border-white/10 mb-8 group">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                                    <p className="text-white/80 text-sm flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-amber-400" />
                                        Auto-deletes in 24h
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                {verifying && <p className="text-sm text-blue-400 animate-pulse font-medium flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Security Check...</p>}
                                <button
                                    onClick={handleUpload}
                                    disabled={getPresigned.isPending || verifying}
                                    className={cn(
                                        "px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-3",
                                        (verifying || getPresigned.isPending) && "opacity-70 cursor-wait grayscale"
                                    )}
                                >
                                    {getPresigned.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                    Confirm & Process
                                </button>
                                <button onClick={() => setStep("upload")} className="text-sm text-slate-500 hover:text-white transition">
                                    Choose different photo
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: CREDITS */}
                    {step === "credits" && (
                        <div className="w-full animate-in slide-in-from-right-8 duration-300">
                            <div className="text-center mb-10">
                                <h2 className="text-xl text-slate-400 font-medium mb-2">Available Balance</h2>
                                <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to-amber-500 drop-shadow-sm">
                                    {credits.data ?? 0}
                                </div>
                                <p className="text-sm text-slate-500 mt-2 font-medium uppercase tracking-widest">Premium Credits</p>
                            </div>

                            {(credits.data ?? 0) > 0 ? (
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleTransform}
                                        disabled={startTransformation.isPending}
                                        className="w-full max-w-md py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-3"
                                    >
                                        {startTransformation.isPending ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6 text-yellow-200" />}
                                        Generate Magic (1 Credit)
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                                    <div className="flex justify-center mb-8">
                                        <div className="bg-black/30 p-1.5 rounded-full flex gap-1 border border-white/5">
                                            <button
                                                onClick={() => setCurrency("usd")}
                                                className={cn("px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                                    currency === "usd" ? "bg-white text-black shadow-lg" : "text-slate-400 hover:text-white")}
                                            >USD</button>
                                            <button
                                                onClick={() => setCurrency("mxn")}
                                                className={cn("px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                                    currency === "mxn" ? "bg-white text-black shadow-lg" : "text-slate-400 hover:text-white")}
                                            >MXN</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        {["10", "25", "100"].map((pkg) => {
                                            const prices = {
                                                "10": { usd: 500, mxn: 99 },
                                                "25": { usd: 1000, mxn: 199 },
                                                "100": { usd: 3000, mxn: 499 }
                                            };
                                            // @ts-ignore
                                            const price = prices[pkg][currency] * (currency === 'usd' ? 1 : 100);

                                            return (
                                                <div
                                                    key={pkg}
                                                    onClick={() => setSelectedPkg(pkg as any)}
                                                    className={cn(
                                                        "relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 text-center group overflow-hidden",
                                                        selectedPkg === pkg ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "border-white/5 hover:border-white/20 bg-white/5"
                                                    )}
                                                >
                                                    {pkg === "100" && (
                                                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-400 to-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded-bl-xl">
                                                            BEST VALUE
                                                        </div>
                                                    )}
                                                    <div className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform duration-300">{pkg}</div>
                                                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">Credits</div>
                                                    <div className="text-lg font-bold text-blue-400">{formatCurrency(price, currency)}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="space-y-4 max-w-sm mx-auto">
                                        {currency === 'usd' && (
                                            <div className="flex flex-col gap-4">
                                                <button
                                                    onClick={handleCheckout}
                                                    disabled={createCheckout.isPending}
                                                    className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2"
                                                >
                                                    {createCheckout.isPending ? <Loader2 className="animate-spin" /> : <CreditCard className="w-5 h-5" />}
                                                    Pay securely with Card
                                                </button>

                                                <div className="relative flex items-center py-2">
                                                    <div className="flex-grow border-t border-white/10"></div>
                                                    <span className="flex-shrink-0 mx-4 text-xs text-slate-600 uppercase font-semibold">Or use PayPal</span>
                                                    <div className="flex-grow border-t border-white/10"></div>
                                                </div>

                                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                    <input type="hidden" name="cmd" value="_s-xclick" />
                                                    <input type="hidden" name="hosted_button_id" value="QTUTJTARZMTQU" />
                                                    <input type="hidden" name="custom" value={user?.id} />
                                                    <input type="hidden" name="rm" value="2" />
                                                    <button type="submit" className="w-full py-4 bg-[#0070BA] text-white font-bold rounded-2xl hover:bg-[#005ea6] transition-all hover:scale-[1.02] flex justify-center items-center gap-2 shadow-lg">
                                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.09-3.358 6.049-5.365 6.049h-.75c-.26 0-.456.224-.5.483l-.782 4.87a.782.782 0 0 1-.772.658H7.172a.66.66 0 0 1-.615-.46l-2.766-17.1a.66.66 0 0 1 .643-.762h5.716c1.644 0 2.89.289 3.597 1.05.626.674.839 1.516.634 2.809-.015.096-.03.192-.05.286-.92 5.25-3.084 5.989-4.708 5.989h-1.55a.825.825 0 0 0-.814.694l-.778 4.966a.185.185 0 0 1-.183.155z" /></svg>
                                                        Pay with PayPal
                                                    </button>
                                                </form>
                                            </div>
                                        )}

                                        {currency === 'mxn' && (
                                            <MercadoPagoButton selectedPkg={selectedPkg} />
                                        )}
                                    </div>
                                    <p className="text-center text-xs text-slate-600 mt-6 flex items-center justify-center gap-1">
                                        <Lock className="w-3 h-3" /> Secure 256-bit SSL Encryption
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 4: RESULTS */}
                    {step === "results" && (
                        <div className="text-center w-full animate-in zoom-in duration-500">
                            <h2 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 drop-shadow-lg">
                                It's a Match!
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 hover:border-amber-500 transition-colors duration-500">
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-amber-400 border border-amber-500/30 z-10">
                                        CLASSIC
                                    </div>
                                    <img src={previewUrl!} className="w-full" alt="Result A" />
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none">
                                        <p className="text-6xl font-black -rotate-45 text-white/50">PREVIEW</p>
                                    </div>
                                    <a href={previewUrl!} download className="absolute bottom-6 right-6 bg-white text-black p-4 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                                        <Download className="w-6 h-6" />
                                    </a>
                                </div>

                                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 hover:border-slate-500 transition-colors duration-500">
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-300 border border-slate-500/30 z-10">
                                        NOIR EDITION
                                    </div>
                                    <img src={previewUrl!} className="w-full grayscale contrast-125" alt="Result B" />
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none">
                                        <p className="text-6xl font-black -rotate-45 text-white/50">PREVIEW</p>
                                    </div>
                                    <a href={previewUrl!} download className="absolute bottom-6 right-6 bg-white text-black p-4 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                                        <Download className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex justify-center gap-6">
                                <Link href="/gallery" className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition border border-white/5 hover:border-white/20">
                                    View Gallery
                                </Link>
                                <button onClick={() => setStep("upload")} className="px-8 py-3 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-bold transition border border-blue-500/30">
                                    Create Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-8 text-slate-600 text-sm">© 2024 Pic.Christmas. All rights reserved.</p>
        </div>
    );
}
