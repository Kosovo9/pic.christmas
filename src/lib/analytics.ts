import mixpanel from 'mixpanel-browser'

if (typeof window !== 'undefined') {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '00000000000000000000000000000000', {
        debug: process.env.NODE_ENV !== 'production',
        track_pageview: true,
        persistence: 'localStorage'
    })
}

export const track = (event: string, props?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        mixpanel.track(event, props)
    }
}
