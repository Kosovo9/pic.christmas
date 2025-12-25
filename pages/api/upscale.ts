import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: any, res: any) {
    const { imageId } = req.body
    const { data: img } = await supabaseAdmin.from('images').select('storage_path').eq('id', imageId).single()
    if (!img) return res.status(404).end()

    const r = await fetch('https://api.magnific.ai/v1/upscale', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.MAGNIFIC_KEY}` },
        body: JSON.stringify({ input_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${img.storage_path}`, scale: 4 })
    })
    const { output_url } = await r.json()

    const up = await fetch(output_url)
    const upBuf = Buffer.from(await up.arrayBuffer())
    const { data: upData, error } = await supabaseAdmin.storage.from('upscaled').upload(`${imageId}.png`, upBuf, { upsert: true })
    if (error) return res.status(500).json({ error })

    await supabaseAdmin.from('images').update({ upscaled_path: upData.path }).eq('id', imageId)
    res.json({ ok: true, url: upData.path })
}
