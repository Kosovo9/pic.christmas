import { Suspense } from 'react'
import { PhotoGrid } from '@/components/PhotoGrid'
import { UploadForm } from '@/components/UploadForm'
import ABTestButton from '@/components/ABTestButton'

export default function Home() {
    return (
        <main className="min-h-screen bg-red-800 text-white p-4">
            <h1 className="text-6xl font-bold text-center mt-10 mb-8">Pic-Christmas 10x</h1>
            <Suspense fallback={<div className="text-center p-10">Cargando...</div>}>
                <PhotoGrid />
            </Suspense>
            <div className="max-w-md mx-auto mt-10 flex flex-col items-center gap-6">
                <ABTestButton />
                <UploadForm />
            </div>
        </main>
    )
}
