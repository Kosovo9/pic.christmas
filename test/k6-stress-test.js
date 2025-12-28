import http from 'k6/http'
import { check } from 'k6'

export const options = {
    stages: [
        { duration: '30s', target: 200 },
        { duration: '1m', target: 1000 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
}

export default function () {
    const res = http.get('https://pichristmas.netlify.app/api/health')
    check(res, { 'status is 200': (r) => r.status === 200 })
}
