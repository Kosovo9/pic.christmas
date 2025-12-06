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

    useEffect(() => {
        const fetchStats = async () => {
            if (!isLoaded || !isSignedIn) return;
            try {
                const token = await getToken();
                if (token) {
                    const data = await api.getAdminStats(token);
                    setStats(data);
                }
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [isLoaded, isSignedIn, getToken]);

    if (!isLoaded || !isSignedIn) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Auth...</div>;
    }

    // Simple protection: Check if user has "admin" metadata or specific email
    // For MVP, just show the dashboard if they are logged in (Backend will restrict actual data if we implemented strict roles)
    // TODO: Add stricter frontend check for "admin" role

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar language={language} onLanguageChange={switchLanguage} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Admin Command Center 🦅
                </h1>

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
                    <div className="p-6 border-b border-slate-800">
                        <h3 className="text-xl font-bold">Recent Intercepted Transmissions (Orders)</h3>
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {stats?.recentOrders?.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">{order._id.substring(0, 8)}...</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">${order.amount}</td>
                                        <td className="px-6 py-4 text-slate-300 capitalize">{order.packageId}</td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
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
