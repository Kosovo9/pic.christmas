import { useState } from 'react'

export default function ShareRef({ code }: { code: string }) {
    const url = `${process.env.NEXT_PUBLIC_HOST}/r/${code}`
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            alert('Enlace copiado al portapapeles')
        } catch (e) {
            console.error('Copy failed', e)
        }
    }
    return (
        <div className="flex gap-2 items-center">
            <input
                readOnly
                value={url}
                className="flex-1 rounded px-2 py-1 text-sm text-black bg-white/80"
            />
            <button
                onClick={copy}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
                Copiar
            </button>
        </div>
    )
}
