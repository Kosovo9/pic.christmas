'use client'

import { GodModeDebugger } from "@/components/admin/GodModeDebugger"

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-8 selection:bg-green-500/30">
            <div className="max-w-7xl mx-auto border border-green-500/20 rounded-lg p-6 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

                <h1 className="text-4xl font-bold mb-8 tracking-tighter flex items-center gap-3">
                    <span className="animate-pulse">⚡</span>
                    ADMIN_CONSOLE_v9000
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Cards */}
                    {[
                        { label: 'Total Revenue', value: '$12,450.00', trend: '+15%' },
                        { label: 'Active Sessions', value: '453', trend: '+124' },
                        { label: 'Generations', value: '8,902', trend: '+89' },
                    ].map((stat, i) => (
                        <div key={i} className="border border-green-500/20 bg-black/40 p-6 rounded-lg hover:border-green-500/50 transition-colors group cursor-pointer">
                            <div className="text-xs text-green-500/60 uppercase mb-2">{stat.label}</div>
                            <div className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">{stat.value}</div>
                            <div className="text-xs text-emerald-400 mt-2">{stat.trend} vs last hour</div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t border-green-500/20 pt-8 text-center text-slate-500 text-sm">
                    SYSTEM STATUS: <span className="text-green-500">HOMEOSTASIS OPTIMAL</span>
                </div>
            </div>

            {/* THE GOD MODE TOOL */}
            <GodModeDebugger />
        </div>
    )
}
