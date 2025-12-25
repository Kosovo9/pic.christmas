import { supabaseAdmin } from '@/lib/supabase';
import sharp from 'sharp'

export default async function handler(req: any, res: any) {
    const { id } = req.query
    const { data: img } = await supabaseAdmin.from('images').select('storage_path,is_unlocked').eq('id', id).single()
    if (!img) return res.status(404).end()

    const { data } = await supabaseAdmin.storage.from('images').download(img.storage_path)
    if (!data) return res.status(404).end()

    const buf = Buffer.from(await data.arrayBuffer())
    if (img.is_unlocked) return res.setHeader('Content-Type', 'image/png').send(buf)

    const watermark = await sharp(buf)
        .composite([{ input: Buffer.from('<svg><text y="50" font-size="60" fill="#fff" opacity="0.3">PREVIEW</text></svg>'), gravity: 'center' }])
        .png()
        .toBuffer()

    res.setHeader('Content-Type', 'image/png').send(watermark)
}
