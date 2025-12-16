"use client";

import { Loader2, CreditCard } from "lucide-react";
import { trpc } from "@/lib/trpc-client";

export function MercadoPagoButton({ selectedPkg }: { selectedPkg: "10" | "25" | "100" }) {
    const createPreference = trpc.mercadopago.createPreference.useMutation();

    const handlePay = async () => {
        try {
            const { initPoint } = await createPreference.mutateAsync({ packageId: selectedPkg });
            if (initPoint) window.location.href = initPoint;
        } catch (e) {
            alert("Error starting Mercado Pago checkout");
        }
    };

    return (
        <button
            onClick={handlePay}
            disabled={createPreference.isPending}
            className="w-full py-3 bg-[#009EE3] text-white font-bold rounded-xl hover:bg-[#008CC9] transition flex justify-center items-center"
        >
            {createPreference.isPending ? <Loader2 className="animate-spin mr-2" /> : <CreditCard className="mr-2 w-5 h-5" />}
            Pagar con Mercado Pago
        </button>
    );
}
