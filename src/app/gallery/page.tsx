"use client";

import { trpc } from "@/lib/trpc-client";
import { Loader2, Download, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function GalleryPage() {
    const { data: items, isLoading } = trpc.transformations.list.useQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Gallery</h1>

            {items?.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl">
                    <p className="text-gray-400 mb-4">No transformations yet.</p>
                    <Link href="/wizard" className="px-6 py-2 bg-blue-600 rounded-full font-bold">Start New</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items?.map((item) => {
                        const isExpired = item.status === 'expired' || new Date(item.expiresAt) < new Date();

                        return (
                            <div key={item.id} className="bg-black/40 border border-gray-800 rounded-xl overflow-hidden group">
                                <div className="relative aspect-square bg-gray-900">
                                    {isExpired ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                                            <div className="text-center">
                                                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                                <p className="font-bold text-red-500">Expired</p>
                                            </div>
                                        </div>
                                    ) : (
                                        item.status === 'completed' && item.resultAUrl ? (
                                            <img src={item.resultAUrl} alt="Result" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-500">
                                                {item.status}
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="p-4 flex justify-between items-center bg-white/5">
                                    <div className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                    {!isExpired && item.status === 'completed' && item.resultAUrl && (
                                        <a href={item.resultAUrl} download className="text-blue-400 hover:text-white">
                                            <Download className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
