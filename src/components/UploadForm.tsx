'use client'
import { useFormState } from 'react-dom'
import { uploadPhoto } from '@/app/actions'
import { track } from '@/lib/analytics'

export function UploadForm() {
    // @ts-ignore
    const [state, formAction] = useFormState(uploadPhoto, null)

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-md">
            <form
                action={(fd) => {
                    const file = fd.get('file') as File;
                    if (file) {
                        track('Upload Started', { size: file.size, type: file.type });
                    }
                    // @ts-ignore
                    formAction(fd);
                }}
                className="flex flex-col gap-4"
            >
                <div className="relative group">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        required
                        className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-red-800 hover:file:bg-gray-100 transition cursor-pointer"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white text-red-800 px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                    Subir 10x
                </button>
                {state?.name && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                        <p className="text-green-300 font-bold">¡Listo! ID: {state.name.slice(0, 8)}</p>
                    </div>
                )}
            </form>
        </div>
    )
}
