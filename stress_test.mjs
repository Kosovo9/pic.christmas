const PLATFORM_URL = 'https://pichristmas.netlify.app';
const CONCURRENT_REQUESTS = 20;

async function stressTest() {
    console.log(`🚀 Starting 100x Stress Test: ${CONCURRENT_REQUESTS} concurrent requests...`);

    const start = Date.now();
    const results = await Promise.allSettled(
        Array(CONCURRENT_REQUESTS).fill(0).map((_, i) =>
            fetch(`${PLATFORM_URL}/api/health`).then(res => ({ id: i, status: res.status }))
        )
    );
    const end = Date.now();

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`\n📊 TEST REPORT:`);
    console.log(`Total Requests: ${CONCURRENT_REQUESTS}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total Time: ${end - start}ms`);
    console.log(`Avg Latency: ${(end - start) / CONCURRENT_REQUESTS}ms`);
}

stressTest();
