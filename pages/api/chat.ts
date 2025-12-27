import { OpenAI } from 'openai'

// Fallback to fetch if OpenAI lib has issues or for edge runtime compatibility if needed
// Assuming process.env.OPENAI_API_KEY is standard
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY! })

export default async function handler(req: any, res: any) {
    const { message, history = [] } = req.body
    const msgs = [
        { role: 'system', content: 'Sos Holly, la elfa ayudante de Pic.Christmas. Respondé siempre en español, breve y amable.' },
        ...history,
        { role: 'user', content: message }
    ]

    try {
        const chat = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', messages: msgs, temperature: 0.7 })
        res.json({ reply: chat.choices[0].message.content })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to chat' })
    }
}
