'use client';

import React, { useEffect, useState } from 'react';

// Mock data types matching supabase-payments
interface DashboardData {
    stats: {
        totalEarned: number;
        pendingBalance: number;
        totalTransactions: number;
    };
    affiliate: {
        affiliate_code: string;
    };
    transactions: any[];
}

export default function AffiliatesPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you would fetch this from /api/affiliates/dashboard
        // For now, we mock it to show the UI
        setTimeout(() => {
            setData({
                stats: {
                    totalEarned: 150.00,
                    pendingBalance: 45.00,
                    totalTransactions: 12
                },
                affiliate: {
                    affiliate_code: "XMAS2024"
                },
                transactions: [
                    { id: 1, amount: 5.00, status: 'pending', created_at: new Date().toISOString() },
                    { id: 2, amount: 5.00, status: 'paid', created_at: new Date(Date.now() - 86400000).toISOString() }
                ]
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-red-50 flex items-center justify-center">
                <div className="text-xl text-red-600 font-semibold">Loading Dashboard...</div>
            </div>
        );
    }

    if (!data) return <div>Error loading dashboard</div>;

    return (
        <div className="min-h-screen bg-zinc-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900">Affiliate Dashboard</h1>
                    <p className="text-zinc-500">Track your earnings and referrals</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
                        <div className="text-sm text-zinc-500 mb-1">Total Earnings</div>
                        <div className="text-3xl font-bold text-green-600">${data.stats.totalEarned.toFixed(2)}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
                        <div className="text-sm text-zinc-500 mb-1">Pending Balance</div>
                        <div className="text-3xl font-bold text-amber-600">${data.stats.pendingBalance.toFixed(2)}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
                        <div className="text-sm text-zinc-500 mb-1">Referrals</div>
                        <div className="text-3xl font-bold text-blue-600">{data.stats.totalTransactions}</div>
                    </div>
                </div>

                {/* Referral Link */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-xl shadow-lg text-white mb-8">
                    <h2 className="text-xl font-bold mb-2">Your Referral Link</h2>
                    <p className="mb-4 opacity-90">Share this link to earn 15% commission on every sale!</p>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between">
                        <code className="font-mono text-lg">pic.christmas/?ref={data.affiliate.affiliate_code}</code>
                        <button
                            onClick={() => navigator.clipboard.writeText(`https://pic.christmas/?ref=${data.affiliate.affiliate_code}`)}
                            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                        >
                            Copy Link
                        </button>
                    </div>
                </div>

                {/* Transactions */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="p-6 border-b border-zinc-100">
                        <h2 className="font-bold text-zinc-900">Recent Transactions</h2>
                    </div>
                    <table className="w-full">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Commission</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {data.transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                                        {new Date(tx.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${tx.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 text-right">
                                        ${tx.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
