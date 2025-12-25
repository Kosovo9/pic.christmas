import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: any, res: any) {
    const { id } = req.query
    if (!id) return res.status(400).end()

    const { data: img } = await supabase.from('images').select('storage_path').eq('id', id).single()
    if (!img) return res.status(404).end()

    const { data } = await supabase.storage.from('images').download(img.storage_path)
    if (!data) return res.status(404).json({ error: "Image not found in storage" })

    const buf = Buffer.from(await data.arrayBuffer())

    const story = await sharp(buf)
        .resize(1080, 1920, { fit: 'cover', position: 'center' })
        .composite([
            {
                input: Buffer.from(`<svg width="1080" height="1920"><text x="50" y="1850" font-size="60" fill="#fff" stroke="#000" stroke-width="2">pic.christmas</text></svg>`),
                gravity: 'south'
            }
        ])
        .jpeg()
        .toBuffer()

    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.send(story)
}
