import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

// Mapping only 3 for brevity in example, can use full messages list
const locales = { es: 'Español', en: 'English', pt: 'Português', fr: 'Français', de: 'Deutsch' }

export default function LangSwitch() {
    const router = useRouter()
    // Next 13+ app directory usage handles locale differently usually, 
    // but assuming basic client side switch logic or prop based.
    // We'll simulate locale state here as we don't have Next Intl setup fully visible provided in snippet.
    const [currentLocale, setCurrentLocale] = useState('es')

    useEffect(() => {
        const saved = localStorage.getItem('locale')
        if (saved) setCurrentLocale(saved)
    }, [])

    const change = (l: string) => {
        localStorage.setItem('locale', l)
        setCurrentLocale(l)
        // In a real Next Intl App Router setup, you'd redirect to /[locale]/path
        // router.push(`/${l}`) 
        // or trigger a context update. We'll refresh for now or just set state.
        window.location.reload()
    }

    return (
        <div className="relative inline-block">
            <select
                value={currentLocale}
                onChange={e => change(e.target.value)}
                className="appearance-none bg-black/50 border border-white/10 rounded-full pl-8 pr-4 py-1 text-xs text-white outline-none cursor-pointer hover:bg-white/10 transition"
            >
                {Object.entries(locales).map(([k, v]) => <option key={k} value={k} className="bg-neutral-900 text-white">{v}</option>)}
            </select>
            <Globe className="w-3 h-3 text-white/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
    )
}
