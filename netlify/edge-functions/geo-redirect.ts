import type { Context } from 'https://edge.netlify.com'

export default async (request: Request, context: Context) => {
    const country = context.geo.country?.code || 'US'
    const lang = ['ES', 'MX', 'AR', 'CO'].includes(country) ? 'es'
        : ['FR', 'BE', 'CH'].includes(country) ? 'fr'
            : ['DE', 'AT'].includes(country) ? 'de'
                : 'en'
    const url = new URL(request.url)
    if (url.pathname === '/') {
        // Only redirect if explicitly on root and no other logic applies
        // Note: Netlify Edge Functions can return a redirect Response
        return Response.redirect(`${url.origin}/${lang}`, 302)
    }
    return context.next()
}
