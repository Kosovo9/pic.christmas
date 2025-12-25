import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY!)

export async function sendChristmasEmail(email: string, url: string, hash: string) {
    await resend.emails.send({
        from: 'Holly <holly@pic.christmas>',
        to: email,
        subject: 'Tu foto navideña ya está lista 🎄',
        html: `<p>Abri el link para descargarla: <a href="${url}">${url}</a></p><p>Tu hash de autenticidad: <b>${hash}</b></p>`
    })
}

export async function sendGiftEmail(email: string, code: string) {
    await resend.emails.send({
        from: 'Holly <holly@pic.christmas>',
        to: email,
        subject: 'Tu Tarjeta de Regalo Pic.Christmas 🎁',
        html: `<p>Usá este código para generar tu foto gratis: <b>${code}</b></p>`
    })
}

export async function sendReady(email: string, url: string) {
    await resend.emails.send({
        from: 'Holly <holly@pic.christmas>',
        to: email,
        subject: 'Tu foto navideña ya está lista 🎄',
        html: `<p>Abri el link para descargarla: <a href="${url}">${url}</a></p>`
    })
}

export async function sendReceipt(email: string, amount: number) {
    await resend.emails.send({
        from: 'Holly <holly@pic.christmas>',
        to: email,
        subject: 'Recibo de compra',
        html: `<p>Gracias por tu compra de USD ${amount}</p>`
    })
}

export async function sendCartRecovery(email: string, url: string) {
    await resend.emails.send({
        from: 'Holly <holly@pic.christmas>',
        to: email,
        subject: 'No olvides tu foto navideña',
        html: `<p>Finalizá tu compra en 2 clicks: <a href="${url}">${url}</a></p>`
    })
}
