'use client'

import { useState } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function AdminAnalyticsPage() {
    const [timeRange, setTimeRange] = useState('24h')

    // Revenue Chart Data
    const revenueData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [{
            label: 'Revenue ($)',
            data: [120, 450, 780, 1200, 980, 1450, 1890],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4
        }]
    }

    // Generations Chart Data
    const generationsData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Successful',
            data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
        }, {
            label: 'Failed',
            data: [45, 67, 34, 89, 56, 78, 92],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
        }]
    }

    // Provider Distribution
    const providerData = {
        labels: ['Pollinations', 'HuggingFace', 'Segmind', 'Google AI'],
        datasets: [{
            data: [4521, 2341, 1892, 148],
            backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(251, 191, 36, 0.8)'
            ],
            borderWidth: 0
        }]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'rgb(148, 163, 184)',
                    font: { family: 'monospace' }
                }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(51, 65, 85, 0.3)' },
                ticks: { color: 'rgb(148, 163, 184)' }
            },
            y: {
                grid: { color: 'rgba(51, 65, 85, 0.3)' },
                ticks: { color: 'rgb(148, 163, 184)' }
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white font-mono p-4 md:p-8">
            <div className="max-w-[1800px] mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                            ANALYTICS COMMAND CENTER
                        </h1>
                        <p className="text-sm text-slate-400">Real-time business intelligence & performance metrics</p>
                    </div>

                    {/* TIME RANGE SELECTOR */}
                    <div className="flex gap-2">
                        {['1h', '24h', '7d', '30d'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === range
                                        ? 'bg-cyan-500 text-black'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TOP STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Revenue', value: '$12,450', change: '+15.3%', color: 'green' },
                        { label: 'Total Users', value: '8,902', change: '+124', color: 'blue' },
                        { label: 'Generations', value: '8,902', change: '+89', color: 'purple' },
                        { label: 'Success Rate', value: '98.36%', change: '+2.1%', color: 'cyan' }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-slate-900/50 border border-${stat.color}-500/30 rounded-xl p-6 backdrop-blur-xl hover:border-${stat.color}-400/50 transition-all`}>
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">{stat.label}</div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className={`text-sm text-${stat.color}-400`}>{stat.change} vs last period</div>
                        </div>
                    ))}
                </div>

                {/* CHARTS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                    {/* REVENUE CHART */}
                    <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-green-400 mb-4">REVENUE TREND</h3>
                        <div className="h-64">
                            <Line data={revenueData} options={chartOptions} />
                        </div>
                    </div>

                    {/* GENERATIONS CHART */}
                    <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-blue-400 mb-4">GENERATION STATS</h3>
                        <div className="h-64">
                            <Bar data={generationsData} options={chartOptions} />
                        </div>
                    </div>

                    {/* PROVIDER DISTRIBUTION */}
                    <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-purple-400 mb-4">PROVIDER DISTRIBUTION</h3>
                        <div className="h-64 flex items-center justify-center">
                            <Doughnut data={providerData} options={{ ...chartOptions, scales: undefined }} />
                        </div>
                    </div>

                    {/* TOP USERS */}
                    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-cyan-400 mb-4">TOP USERS</h3>
                        <div className="space-y-3">
                            {[
                                { user: 'user_8472', generations: 234, revenue: '$450' },
                                { user: 'user_9103', generations: 189, revenue: '$380' },
                                { user: 'user_7821', generations: 156, revenue: '$320' },
                                { user: 'user_6543', generations: 142, revenue: '$290' },
                                { user: 'user_5432', generations: 128, revenue: '$260' }
                            ].map((user, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            #{i + 1}
                                        </div>
                                        <span className="text-sm text-white">{user.user}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-cyan-400 font-bold">{user.revenue}</div>
                                        <div className="text-xs text-slate-500">{user.generations} gens</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BACK BUTTON */}
                <div className="text-center">
                    <a
                        href="/admin"
                        className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-lg transition-all"
                    >
                        ← BACK TO COMMAND CENTER
                    </a>
                </div>
            </div>
        </div>
    )
}
