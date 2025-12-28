'use client'
import { useEffect, useState } from 'react'

export default function ABTestButton() {
    const [variant, setVariant] = useState<'A' | 'B'>('A')
    useEffect(() => {
        const v = localStorage.getItem('ab-variant') || (Math.random() < 0.5 ? 'A' : 'B')
        setVariant(v as 'A' | 'B')
        localStorage.setItem('ab-variant', v)
    }, [])

    return (
        <button className={`px-8 py-4 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 ${variant === 'A' ? 'bg-red-600 hover:bg-red-500' : 'bg-yellow-500 hover:bg-yellow-400 text-black'}`}>
            {variant === 'A' ? 'Subir Navidad' : 'Subir Foto'}
        </button>
    )
}
