// load_test.js
// Simple load test to simulate 100 concurrent users accessing the app.
// Uses built-in https module to avoid extra dependencies.
const https = require('https');
const http = require('http');

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3001; // dev server port
const CONCURRENCY = 20;

function request(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: TARGET_HOST,
            port: TARGET_PORT,
            path: path,
            method: 'GET',
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                resolve({ status: res.statusCode, length: data.length });
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function run() {
    const paths = ['/', '/success']; // endpoints to test
    const promises = [];
    for (let i = 0; i < CONCURRENCY; i++) {
        const p = paths[i % paths.length];
        promises.push(request(p));
    }
    const results = await Promise.all(promises);
    const statusCounts = results.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
    }, {});
    console.log('Load test completed');
    console.log('Status distribution:', statusCounts);
}

run().catch((err) => {
    console.error('Error during load test:', err);
});
