import * as tf from '@tensorflow/tfjs'
import * as blazeface from '@tensorflow-models/blazeface'
import { useEffect, useState } from 'react'

let model: blazeface.BlazeFaceModel

export default function FaceCheck({ file }: { file: File }) {
    const [msg, setMsg] = useState('Analizando biométrica...')
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')

    useEffect(() => { check() }, [file])

    async function check() {
        try {
            await tf.ready() // Ensure backend is ready
            if (!model) model = await blazeface.load()

            const img = document.createElement('img')
            img.src = URL.createObjectURL(file)
            await img.decode()

            // returnTensors: false gives us nice probability/bounding box data
            const faces = await model.estimateFaces(img, false)

            if (faces.length === 0) {
                setMsg('❌ No detectamos ninguna cara. Subí otra foto.')
                setStatus('error')
            } else if (faces.length > 1) {
                setMsg('❌ Detectamos más de una cara. Subí una foto individual.')
                setStatus('error')
            } else {
                // Check face size relative to image
                const face = faces[0] as any // Adjust type if needed
                const topLeft = face.topLeft as [number, number]
                const bottomRight = face.bottomRight as [number, number]

                const width = Math.abs(bottomRight[0] - topLeft[0])
                const height = Math.abs(bottomRight[1] - topLeft[1])
                const faceArea = width * height
                const imgArea = img.width * img.height

                if (faceArea < 0.05 * imgArea) {
                    setMsg('⚠️ La cara se ve muy chica. Probá con una más cercana.')
                    setStatus('error')
                } else {
                    setMsg('✅ Cara perfecta. Continuá con el estilo.')
                    setStatus('success')
                }
            }
        } catch (e) {
            console.error("Face Check Error", e)
            setMsg('⚠️ No pudimos analizar la cara automáticamente.')
            setStatus('error')
        }
    }

    return (
        <div className={`text-xs mt-2 font-bold px-3 py-2 rounded-lg border ${status === 'loading' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
                status === 'error' ? 'text-red-400 border-red-400/20 bg-red-400/10' :
                    'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'
            }`}>
            {msg}
        </div>
    )
}
