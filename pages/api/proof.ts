import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: any, res: any) {
    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()

    const names = ['Maria de Madrid', 'Juan de Buenos Aires', 'Ana de Lisboa']
    let idx = 0

    const interval = setInterval(() => {
        const text = `${names[idx % names.length]} acaba de generar un estilo Stitch`
        const data = JSON.stringify({ text })
        res.write(`data: ${data}\n\n`)
        idx++
    }, 4000)

    // Cleanup on client disconnect
    req.on('close', () => {
        clearInterval(interval)
        res.end()
    })
}
