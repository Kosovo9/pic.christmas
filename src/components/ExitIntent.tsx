import { useEffect, useState } from 'react'

export default function ExitIntent({ offer }: { offer: string }) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const onLeave = (e: MouseEvent) => {
            if (e.clientY < 50) setShow(true)
        }
        document.addEventListener('mouseleave', onLeave)
        return () => document.removeEventListener('mouseleave', onLeave)
    }, [])

    if (!show) return null

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-2xl p-6 max-w-sm">
                <h2 className="text-xl mb-2">¡Esperá!</h2>
                <p className="mb-4">Llevate {offer} OFF con el código: <b>NAVIDAD20</b></p>
                <button onClick={() => setShow(false)} className="w-full bg-green-500 text-white rounded py-2">
                    Aceptar
                </button>
            </div>
        </div>
    )
}
