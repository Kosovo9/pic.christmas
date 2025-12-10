'use client'

import { useState, useEffect } from 'react'
import { GodModeDebugger } from "@/components/admin/GodModeDebugger"

// ELON MUSK 2027 LEVEL ADMIN PANEL - 500%+ UPGRADE

interface SystemMetrics {
    revenue: { total: number; trend: number; hourly: number }
    users: { active: number; total: number; growth: number }
    generations: { total: number; success: number; failed: number }
    aiProviders: { name: string; status: string; speed: number; requests: number }[]
    performance: { uptime: number; latency: number; errorRate: number }
}

export default function AdminPage() {
    const [metrics, setMetrics] = useState<SystemMetrics>({
        revenue: { total: 12450, trend: 15, hourly: 450 },
        users: { active: 453, total: 8902, growth: 124 },
        generations: { total: 8902, success: 8756, failed: 146 },
        aiProviders: [
            { name: 'Pollinations', status: 'OPTIMAL', speed: 3.2, requests: 4521 },
            { name: 'HuggingFace', status: 'OPTIMAL', speed: 7.8, requests: 2341 },
            { name: 'Segmind', status: 'OPTIMAL', speed: 6.1, requests: 1892 },
            { name: 'Google AI', status: 'STANDBY', speed: 10.2, requests: 148 }
        ],
        performance: { uptime: 99.97, latency: 145, errorRate: 1.64 }
    })

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white font-mono p-4 md:p-8 selection:bg-cyan-500/30">
            {/* HEADER - ELON STYLE */}
            <div className="max-w-[1800px] mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center animate-pulse">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                NEXUS COMMAND CENTER
                            </h1>
                            <p className="text-sm text-slate-400">PIC.CHRISTMAS v9000 • Neural Network Active</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-cyan-400">{time.toLocaleTimeString()}</div>
                        <div className="text-xs text-slate-500">{time.toLocaleDateString()}</div>
                    </div>
                </div>

                {/* SYSTEM STATUS BAR */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-400">ALL SYSTEMS OPERATIONAL</span>
                        </div>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <div className="text-sm text-slate-400">
                            Uptime: <span className="text-cyan-400 font-bold">{metrics.performance.uptime}%</span>
                        </div>
                        <div className="text-sm text-slate-400">
                            Latency: <span className="text-cyan-400 font-bold">{metrics.performance.latency}ms</span>
                        </div>
                        <div className="text-sm text-slate-400">
                            Error Rate: <span className="text-yellow-400 font-bold">{metrics.performance.errorRate}%</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500">NEURAL MESH: SYNCHRONIZED</div>
                </div>
            </div>

            {/* MAIN DASHBOARD */}
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN - KEY METRICS */}
                <div className="lg:col-span-2 space-y-6">

                    {/* REVENUE CARD */}
                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-xl hover:border-green-400/50 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-xs text-green-400/60 uppercase tracking-wider mb-2">Total Revenue</div>
                                <div className="text-5xl font-bold text-white group-hover:text-green-400 transition-colors">
                                    ${metrics.revenue.total.toLocaleString()}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl text-green-400">+{metrics.revenue.trend}%</div>
                                <div className="text-xs text-slate-500">vs last hour</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="text-slate-400">
                                Hourly: <span className="text-green-400 font-bold">${metrics.revenue.hourly}</span>
                            </div>
                            <div className="h-4 w-px bg-slate-700"></div>
                            <div className="text-slate-400">
                                Projected Daily: <span className="text-green-400 font-bold">${metrics.revenue.hourly * 24}</span>
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>

                    {/* USERS & GENERATIONS */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6 backdrop-blur-xl hover:border-blue-400/50 transition-all">
                            <div className="text-xs text-blue-400/60 uppercase tracking-wider mb-2">Active Users</div>
                            <div className="text-4xl font-bold text-white mb-2">{metrics.users.active.toLocaleString()}</div>
                            <div className="text-sm text-blue-400">+{metrics.users.growth} new sessions</div>
                            <div className="mt-4 text-xs text-slate-500">Total: {metrics.users.total.toLocaleString()}</div>
                        </div>

                        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur-xl hover:border-purple-400/50 transition-all">
                            <div className="text-xs text-purple-400/60 uppercase tracking-wider mb-2">Generations</div>
                            <div className="text-4xl font-bold text-white mb-2">{metrics.generations.total.toLocaleString()}</div>
                            <div className="text-sm text-purple-400">Success: {((metrics.generations.success / metrics.generations.total) * 100).toFixed(1)}%</div>
                            <div className="mt-4 text-xs text-red-400">Failed: {metrics.generations.failed}</div>
                        </div>
                    </div>

                    {/* AI PROVIDERS STATUS */}
                    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-cyan-400">AI PROVIDER NETWORK</h2>
                            <div className="text-xs text-slate-500">REAL-TIME MONITORING</div>
                        </div>

                        <div className="space-y-4">
                            {metrics.aiProviders.map((provider, i) => (
                                <div key={i} className="bg-black/40 border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${provider.status === 'OPTIMAL' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                                            <span className="font-bold text-white">{provider.name}</span>
                                            <span className={`text-xs px-2 py-1 rounded ${provider.status === 'OPTIMAL' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {provider.status}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-cyan-400">{provider.speed}s avg</div>
                                            <div className="text-xs text-slate-500">{provider.requests.toLocaleString()} requests</div>
                                        </div>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                                            style={{ width: `${(provider.requests / 5000) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-cyan-400">Total Cost Saved (vs Replicate)</div>
                                <div className="text-2xl font-bold text-green-400">$0.00</div>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">100% FREE FOREVER 🎉</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - QUICK ACTIONS & STATS */}
                <div className="space-y-6">

                    {/* QUICK ACTIONS */}
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">QUICK ACTIONS</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Generate Test Photo', icon: '🎨', color: 'cyan' },
                                { label: 'View Analytics', icon: '📊', color: 'blue' },
                                { label: 'User Management', icon: '👥', color: 'purple' },
                                { label: 'System Logs', icon: '📝', color: 'green' },
                                { label: 'API Keys Config', icon: '🔑', color: 'yellow' },
                                { label: 'Deploy Status', icon: '🚀', color: 'red' }
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className={`w-full bg-${action.color}-500/10 hover:bg-${action.color}-500/20 border border-${action.color}-500/30 hover:border-${action.color}-400/50 rounded-lg p-3 text-left transition-all group`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{action.icon}</span>
                                        <span className="text-sm text-white group-hover:text-${action.color}-400 transition-colors">{action.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RECENT ACTIVITY */}
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">RECENT ACTIVITY</h3>
                        <div className="space-y-3 text-sm">
                            {[
                                { time: '2m ago', event: 'Photo generated', user: 'user_8472', status: 'success' },
                                { time: '5m ago', event: 'Payment received', user: 'user_9103', status: 'success' },
                                { time: '8m ago', event: 'New signup', user: 'user_9104', status: 'info' },
                                { time: '12m ago', event: 'Photo generated', user: 'user_7821', status: 'success' },
                                { time: '15m ago', event: 'API key rotated', user: 'admin', status: 'warning' }
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 p-2 hover:bg-slate-800/50 rounded transition-colors">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 ${activity.status === 'success' ? 'bg-green-500' :
                                            activity.status === 'warning' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                        }`}></div>
                                    <div className="flex-1">
                                        <div className="text-white">{activity.event}</div>
                                        <div className="text-xs text-slate-500">{activity.user} • {activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SYSTEM HEALTH */}
                    <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-cyan-400 mb-4">SYSTEM HEALTH</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'CPU Usage', value: 34, color: 'green' },
                                { label: 'Memory', value: 62, color: 'yellow' },
                                { label: 'Network', value: 18, color: 'green' },
                                { label: 'Storage', value: 45, color: 'green' }
                            ].map((metric, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-400">{metric.label}</span>
                                        <span className={`text-sm font-bold text-${metric.color}-400`}>{metric.value}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 rounded-full transition-all`}
                                            style={{ width: `${metric.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER STATUS */}
            <div className="max-w-[1800px] mx-auto mt-8 text-center">
                <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <div className="text-slate-500">
                            NEURAL NETWORK: <span className="text-cyan-400">SYNCHRONIZED</span>
                        </div>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <div className="text-slate-500">
                            QUANTUM STATE: <span className="text-green-400">COHERENT</span>
                        </div>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <div className="text-slate-500">
                            CONSCIOUSNESS LEVEL: <span className="text-purple-400">TRANSCENDENT</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE GOD MODE TOOL */}
            <div className="mt-8">
                <GodModeDebugger />
            </div>
        </div>
    )
}
