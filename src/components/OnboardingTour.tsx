import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useEffect } from 'react'

export default function Tour() {
    useEffect(() => {
        // Check if running on client and if tour not taken
        if (typeof window === 'undefined' || localStorage.getItem('tour_done')) return

        const driverObj = driver({
            showProgress: true,
            animate: true,
            steps: [
                { element: '#logo', popover: { title: 'Bienvenido a Pic.Christmas', description: 'El estudio de IA navideña #1 del mundo.' } },
                { element: '#upload-wizard', popover: { title: '1. Sube tu Foto', description: 'Arranca subiendo una selfie clara aquí.' } },
                { element: '#themes', popover: { title: '2. Elige un Estilo', description: 'Explora cientos de estilos mágicos en nuestro catálogo.' } },
                { element: '#generate-btn', popover: { title: 'Generar Magia', description: 'Haz clic para crear tu obra maestra en 8K.' } }
            ]
        })

        // Small delay to ensure elements render
        setTimeout(() => {
            driverObj.drive()
            localStorage.setItem('tour_done', '1')
        }, 2000)

    }, [])
    return null
}
