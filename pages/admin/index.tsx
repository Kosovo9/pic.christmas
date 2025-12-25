import useSWR from 'swr'
import { Badge, Card, Section, Spinner } from "@/components/redesign"

// Mock admin check - in prod rely on middleware
const useAdmin = () => true

export default function Admin() {
    const { data, error } = useSWR('/api/admin/stats', url => fetch(url).then(r => r.json()))

    if (!data) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <Spinner size="lg" color="gold" />
        </div>
    )

    return (
        <div className="min-h-screen bg-black text-white font-sans p-10">
            <h1 className="text-4xl font-serif text-christmas-gold mb-10">God Mode Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard label="Total Users" value={data.users} />
                <StatsCard label="Total Sales" value={`$${data.totalUSD.toFixed(2)}`} highlight />
                <StatsCard label="Total Donations" value={`$${data.donatedUSD.toFixed(2)}`} />
                <StatsCard label="Conversion Rate" value={`${((data.sales / (data.users || 1)) * 100).toFixed(1)}%`} />
            </div>

            <div className="mt-10 p-4 border border-white/10 rounded-xl bg-white/5 font-mono text-xs overflow-auto">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    )
}

function StatsCard({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) {
    return (
        <div className={`p-6 rounded-2xl border ${highlight ? 'border-christmas-gold bg-christmas-gold/10' : 'border-white/10 bg-white/5'}`}>
            <div className="text-xs uppercase tracking-widest opacity-50 mb-2">{label}</div>
            <div className={`text-4xl font-bold ${highlight ? 'text-christmas-gold' : 'text-white'}`}>{value}</div>
        </div>
    )
}
