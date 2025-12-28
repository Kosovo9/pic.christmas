'use client'
export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="grid h-screen place-items-center bg-red-900 text-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Algo salió mal</h2>
                <button
                    onClick={reset}
                    className="mt-4 bg-white text-red-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
                >
                    Reintentar
                </button>
            </div>
        </div>
    )
}
