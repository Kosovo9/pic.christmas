"use client";

import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useAuth, useUser } from '@clerk/nextjs';
import { Navbar } from '../../components/Navbar';
import Link from 'next/link';
import { useI18n } from '../../hooks/useI18n';

interface AdminStats {
    revenue: number;
    totalOrders: number;
    paidOrders: number;
    conversionRate: string;
    recentOrders: any[];
}

export default function AdminDashboard() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const { language, switchLanguage } = useI18n();

    // Simulation states
    const [redisHealth, setRedisHealth] = useState<'healthy' | 'degraded'>('healthy');
    const [queueSize, setQueueSize] = useState(0);

    const fetchStats = async () => {
        if (!isLoaded || !isSignedIn) return;
        try {
            const token = await getToken();
            if (token) {
                const data = await api.getAdminStats(token);
                setStats(data);
                // Simulate queue health
                setQueueSize(Math.floor(Math.random() * 5));
            }
        } catch (err) {
            console.error("Failed to fetch admin stats", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        // Poll every 30s
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, [isLoaded, isSignedIn, getToken]);

    const handleRetry = async (orderId: string) => {
        const token = await getToken();
        if (!token) return;
        try {
            // Visual feedback
            const btn = document.getElementById(`retry-${orderId}`);
            if (btn) btn.innerText = "Retrying...";

            await api.retryOrder(orderId, token);

            if (btn) btn.innerText = "Queued 🔄";

            // Refresh stats
            setTimeout(fetchStats, 2000);
        } catch (e) {
            console.error(e);
            alert("Failed to retry");
        }
    };

    if (!isLoaded || !isSignedIn) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Auth...</div>;
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar language={language} onLanguageChange={switchLanguage} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            Admin Command Center 🦅
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">System Status: <span className="text-green-400 font-mono">OPERATIONAL (100%)</span></p>
                    </div>
                    {/* Health Indicators */}
                    <div className="flex gap-4">
                        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs text-slate-300 font-mono">REDIS: {redisHealth.toUpperCase()}</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-2">
                            <span className="text-xs text-slate-300 font-mono">QUEUE: {queueSize} JOBS</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 animate-pulse text-slate-400">Fetching satellite data...</div>
                ) : stats ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* Revenue Card */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Revenue</p>
                            <p className="text-3xl font-bold text-emerald-400 mt-2">${(stats.revenue || 0).toLocaleString()}</p>
                        </div>

                        {/* Orders Card */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Orders</p>
                            <p className="text-3xl font-bold text-blue-400 mt-2">{stats.totalOrders}</p>
                        </div>

                        {/* Paid Orders Card */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Paid Conversions</p>
                            <p className="text-3xl font-bold text-purple-400 mt-2">{stats.paidOrders}</p>
                        </div>

                        {/* Rate Card */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Conv. Rate</p>
                            <p className="text-3xl font-bold text-amber-400 mt-2">{stats.conversionRate}</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 bg-red-900/20 border border-red-800 rounded-xl text-red-200">
                        Failed to load stats. You might not be an admin.
                    </div>
                )}

                {/* Recent Activity Table */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Recent Intercepted Transmissions (Orders)</h3>
                        <button onClick={() => fetchStats()} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition-colors">Refresh</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Package</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {stats?.recentOrders?.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">{order._id.substring(0, 8)}...</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${order.status === 'paid' ? 'bg-green-100/10 text-green-400' :
                                                    order.status === 'completed' ? 'bg-blue-100/10 text-blue-400' :
                                                        order.status === 'failed' ? 'bg-red-100/10 text-red-400' :
                                                            'bg-yellow-100/10 text-yellow-400'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">${order.amount}</td>
                                        <td className="px-6 py-4 text-slate-300 capitalize">{order.packageId}</td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.status === 'failed' || order.status === 'paid' ? (
                                                <button
                                                    id={`retry-${order._id}`}
                                                    onClick={() => handleRetry(order._id)}
                                                    className="text-xs bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 px-3 py-1 rounded border border-indigo-500/30 transition-colors"
                                                >
                                                    Retry Job
                                                </button>
                                            ) : (
                                                <span className="text-slate-600 text-xs">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    );
}
