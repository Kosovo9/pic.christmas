"use client";

import { useState, useCallback, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { trpc } from "@/lib/trpc-client";
import { Loader2, UploadCloud, CreditCard, Lock, Clock, Download, ChevronRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";

type Step = "upload" | "preview" | "credits" | "results";

export default function WizardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalKey, setOriginalKey] = useState<string | null>(null);
    const [transformationId, setTransformationId] = useState<string | null>(null);

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
            // If coming back from payment, we likely lost the 'file' state if not persisted.
            // handling this full persistence is P1.
            // For P0, we just redirect to gallery or credits page.
            if (payment === 'success') {
                // Ideally they go to upload again or we have persisted state. 
                // Let's send them to upload but with a toast "Credits Added!"
                // Or if we persist state in localStorage (not implemented P0).
                // We'll just show the Credits View which will show the new balance.
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
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
        maxSize: 10 * 1024 * 1024,
        multiple: false
    });

    const handleUpload = async () => {
        if (!file) return;
        try {
            // 1. Get Presigned
            const { url, key } = await getPresigned.mutateAsync({
                contentType: file.type,
                fileSize: file.size,
            });

            // 2. Upload to R2
            await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            setOriginalKey(key);

            // 3. Create Record
            const record = await createTransformation.mutateAsync({ originalKey: key });
            setTransformationId(record.id);

            setStep("credits");
        } catch (e) {
            alert("Upload failed");
        }
    };

    const handleTransform = async () => {
        if (!transformationId) return;
        try {
            await startTransformation.mutateAsync({ id: transformationId });
            setStep("results");
        } catch (e) {
            alert("Transformation failed or no credits");
        }
    };

    const handleCheckout = async () => {
        const { url } = await createCheckout.mutateAsync({
            currency,
            packageId: selectedPkg
        });
        if (url) window.location.href = url;
    };

    // --- RENDER STEPS ---

    return (
        <div className="min-h-screen pt-12 pb-20 px-4 flex flex-col items-center max-w-3xl mx-auto">
            {/* Stepper Indicator - simplified */}
            <div className="flex w-full justify-between mb-8 text-sm text-gray-500">
                <span className={cn(step === 'upload' && "text-blue-400 font-bold")}>1. Upload</span>
                <span className={cn(step === 'preview' && "text-blue-400 font-bold")}>2. Preview</span>
                <span className={cn(step === 'credits' && "text-blue-400 font-bold")}>3. Credits</span>
                <span className={cn(step === 'results' && "text-blue-400 font-bold")}>4. Result</span>
            </div>

            {/* STEP 1: UPLOAD */}
            {step === "upload" && (
                <div {...getRootProps()} className="w-full h-64 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-white/5 transition">
                    <input {...getInputProps()} />
                    <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-300 font-medium">Drag & drop your photo</p>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP (Max 10MB)</p>
                </div>
            )}

            {/* STEP 2: PREVIEW */}
            {step === "preview" && previewUrl && (
                <div className="w-full flex flex-col items-center">
                    <div className="relative w-full aspect-square md:aspect-video rounded-2xl overflow-hidden bg-black mb-6">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-amber-400 text-sm mb-6 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Original file will be deleted automatically in 24 hours.
                    </p>
                    <button
                        onClick={handleUpload}
                        disabled={getPresigned.isPending}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold flex items-center gap-2"
                    >
                        {getPresigned.isPending && <Loader2 className="animate-spin w-4 h-4" />}
                        Confirm & Upload
                    </button>
                </div>
            )}

            {/* STEP 3: CREDITS */}
            {step === "credits" && (
                <div className="w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Your Balance</h2>
                        <div className="text-4xl font-extrabold text-amber-400">{credits.data ?? 0} Credits</div>
                    </div>

                    {(credits.data ?? 0) > 0 ? (
                        <div className="flex justify-center">
                            <button
                                onClick={handleTransform}
                                disabled={startTransformation.isPending}
                                className="w-full max-w-md py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition flex justify-center items-center gap-2"
                            >
                                {startTransformation.isPending ? <Loader2 className="animate-spin" /> : <Sparkles />}
                                Transform Now (1 Credit)
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <div className="flex justify-center mb-6 bg-gray-800 p-1 rounded-full w-fit mx-auto gap-1">
                                <button
                                    onClick={() => setCurrency("usd")}
                                    className={cn("px-4 py-1 rounded-full text-sm font-medium transition", currency === "usd" ? "bg-white text-black" : "text-gray-400")}
                                >USD (Stripe)</button>
                                <button
                                    onClick={() => setCurrency("mxn")}
                                    className={cn("px-4 py-1 rounded-full text-sm font-medium transition", currency === "mxn" ? "bg-white text-black" : "text-gray-400")}
                                >MXN (Mercado Pago)</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {["10", "25", "100"].map((pkg) => {
                                    const prices = {
                                        "10": { usd: 500, mxn: 99 },
                                        "25": { usd: 1000, mxn: 199 },
                                        "100": { usd: 3000, mxn: 499 }
                                    };
                                    // @ts-ignore
                                    const price = prices[pkg][currency] * (currency === 'usd' ? 1 : 100); // formatCurrency expects cents

                                    return (
                                        <div
                                            key={pkg}
                                            onClick={() => setSelectedPkg(pkg as any)}
                                            className={cn("border-2 rounded-xl p-4 cursor-pointer hover:bg-white/5 transition text-center", selectedPkg === pkg ? "border-blue-500 bg-blue-500/10" : "border-gray-700")}
                                        >
                                            <div className="text-2xl font-bold mb-1">{pkg} Credits</div>
                                            <div className="text-gray-400">{formatCurrency(price, currency)}</div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="space-y-4">
                                {currency === 'usd' && (
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleCheckout}
                                            disabled={createCheckout.isPending}
                                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition flex justify-center items-center gap-2"
                                        >
                                            {createCheckout.isPending ? <Loader2 className="animate-spin" /> : <CreditCard className="w-5 h-5" />}
                                            Pay with Card (Stripe)
                                        </button>

                                        {/* PayPal Hosted Button */}
                                        <div className="text-center pt-2">
                                            <div className="flex items-center gap-2 justify-center mb-3">
                                                <div className="h-px bg-gray-800 w-full"></div>
                                                <span className="text-xs text-gray-500 whitespace-nowrap">OR PAYPAL</span>
                                                <div className="h-px bg-gray-800 w-full"></div>
                                            </div>

                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="QTUTJTARZMTQU" />
                                                <input type="hidden" name="custom" value={credits.data ? "existing_user" : "new_user"} />
                                                {/* Note: We need the actual userId here. We can get it from client side user object or trpc context but trpc is easiest if we had it in props. 
                                                    Actually, let's use the Clerk helper in the component. 
                                                */}
                                                <PayPalCustomField />
                                                <button type="submit" className="w-full py-3 bg-[#0070BA] text-white font-bold rounded-xl hover:bg-[#005ea6] transition flex justify-center items-center gap-2">
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.09-3.358 6.049-5.365 6.049h-.75c-.26 0-.456.224-.5.483l-.782 4.87a.782.782 0 0 1-.772.658H7.172a.66.66 0 0 1-.615-.46l-2.766-17.1a.66.66 0 0 1 .643-.762h5.716c1.644 0 2.89.289 3.597 1.05.626.674.839 1.516.634 2.809-.015.096-.03.192-.05.286-.92 5.25-3.084 5.989-4.708 5.989h-1.55a.825.825 0 0 0-.814.694l-.778 4.966a.185.185 0 0 1-.183.155z" /></svg>
                                                    Pay with PayPal
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {currency === 'mxn' && (
                                    <MercadoPagoButton selectedPkg={selectedPkg} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* STEP 4: RESULTS */}
            {step === "results" && (
                <div className="text-center w-full">
                    <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">Santa Approved!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Mock Results - in real app we would query list or use the result keys */}
                        {/* Since we returned originalKey as result in Mock Logic, we just show Preview Url for demo */}
                        <div className="relative group">
                            <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">Option A</div>
                            <img src={previewUrl!} className="w-full rounded-xl border border-gray-700" alt="Result A" />
                            {/* Watermark */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none">
                                <p className="text-4xl font-black -rotate-45 text-white">NEXORA</p>
                            </div>
                            <a href={previewUrl!} download className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                                <Download className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="relative group">
                            <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">Option B (Black & White)</div>
                            <img src={previewUrl!} className="w-full rounded-xl border border-gray-700 grayscale" alt="Result B" />
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none">
                                <p className="text-4xl font-black -rotate-45 text-white">NEXORA</p>
                            </div>
                            <a href={previewUrl!} download className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                                <Download className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <Link href="/gallery" className="text-gray-400 hover:text-white underline">
                        View in Gallery
                    </Link>
                </div>
            )}
        </div>
    );
}
