'use client'
import Image from 'next/image'

export function PhotoGrid() {
    const photos = Array.from({ length: 24 }, (_, i) => ({
        src: `https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=1280&auto=format&fit=crop`,
        alt: `Christmas ${i + 1}`,
        width: 400,
        height: 300,
    }))

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            {photos.map((p, i) => (
                <Image
                    key={i}
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="rounded-xl shadow-lg hover:scale-105 transition duration-300"
                    loading={i === 0 ? undefined : "lazy"}
                    priority={i === 0}
                />
            ))}
        </div>
    )
}
