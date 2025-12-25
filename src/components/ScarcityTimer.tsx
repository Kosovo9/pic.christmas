import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function ScarcityTimer() {
    const { data } = useSWR('/api/scarcity', url => fetch(url).then(r => r.json()))
    const [left, setLeft] = useState(0)

    useEffect(() => {
        if (!data) return
        const interval = setInterval(() => {
            const remaining = data.unix - Date.now()
            setLeft(remaining > 0 ? remaining : 0)
        }, 1000)
        return () => clearInterval(interval)
    }, [data])

    const fmt = (ms: number) => {
        const h = Math.floor(ms / 3600000).toString().padStart(2, '0')
        const m = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0')
        const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')
        return `${h}:${m}:${s}`
    }

    return (
        <div className="text-sm text-white/80">
            ⏰ Quedan {fmt(left)} para el envío gratis
        </div>
    )
}
