#!/usr/bin/env node
/**
 * 🔥 STRESS TEST SUITE - NASA-GRADE LOAD TESTING
 * Tests all endpoints with 200 concurrent requests
 * Simulates 50%+ global traffic spike
 */

const BACKEND_URL = process.env.BACKEND_URL || 'https://pic-christmas-backend.onrender.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pic-christmas.vercel.app';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

const stats = {
    total: 0,
    success: 0,
    failed: 0,
    errors: [],
    durations: [],
    statusCodes: {},
};

async function makeRequest(url, options = {}, testName = '') {
    const startTime = Date.now();
    stats.total++;
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
        
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        const duration = Date.now() - startTime;
        stats.durations.push(duration);
        
        const status = response.status;
        stats.statusCodes[status] = (stats.statusCodes[status] || 0) + 1;
        
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            // Not JSON, that's ok
        }
        
        if (response.ok) {
            stats.success++;
            return { success: true, status, duration, data };
        } else {
            stats.failed++;
            const error = { testName, status, duration, url, message: data.message || 'Request failed' };
            stats.errors.push(error);
            return { success: false, status, duration, error };
        }
    } catch (error) {
        const duration = Date.now() - startTime;
        stats.failed++;
        const errorObj = { testName, error: error.message, duration, url };
        stats.errors.push(errorObj);
        return { success: false, error: error.message, duration };
    }
}

// Test Functions (200 iterations each)
async function testHealthEndpoint(iterations = 200) {
    log(`\n🧪 Testing /health endpoint (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        promises.push(makeRequest(`${BACKEND_URL}/health`, {}, `Health-${i}`));
    }
    await Promise.all(promises);
}

async function testPromptsEndpoint(iterations = 200) {
    log(`\n🧪 Testing /api/prompts endpoint (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        promises.push(makeRequest(`${BACKEND_URL}/api/prompts`, {}, `Prompts-${i}`));
    }
    await Promise.all(promises);
}

async function testOrdersEndpoint(iterations = 200) {
    log(`\n🧪 Testing /api/orders endpoint (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        // POST with empty body (should return 400, but endpoint exists)
        promises.push(makeRequest(`${BACKEND_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }, `Orders-${i}`));
    }
    await Promise.all(promises);
}

async function testUploadsEndpoint(iterations = 200) {
    log(`\n🧪 Testing /api/uploads endpoint (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        // POST without files (should return 400, but endpoint exists)
        promises.push(makeRequest(`${BACKEND_URL}/api/uploads`, {
            method: 'POST',
        }, `Uploads-${i}`));
    }
    await Promise.all(promises);
}

async function testPaymentsEndpoint(iterations = 200) {
    log(`\n🧪 Testing /api/payments endpoint (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        // POST without orderId (should return 400, but endpoint exists)
        promises.push(makeRequest(`${BACKEND_URL}/api/payments/create-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }, `Payments-${i}`));
    }
    await Promise.all(promises);
}

async function testAIEndpoint(iterations = 200) {
    log(`\n🧪 Testing /api/ai/enhance-prompt endpoint (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        // POST with minimal data
        promises.push(makeRequest(`${BACKEND_URL}/api/ai/enhance-prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userPrompt: 'test prompt',
                config: { adults: 1, children: 0, pets: 0 }
            }),
        }, `AI-${i}`));
    }
    await Promise.all(promises);
}

async function testFrontendProxy(iterations = 200) {
    log(`\n🧪 Testing Frontend Proxy /api/health (${iterations} requests)...`, 'cyan');
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        promises.push(makeRequest(`${FRONTEND_URL}/api/health`, {}, `Proxy-${i}`));
    }
    await Promise.all(promises);
}

async function runStressTest() {
    log('\n' + '='.repeat(80), 'magenta');
    log('🔥 NASA-GRADE STRESS TEST SUITE - PIC.CHRISTMAS', 'magenta');
    log('='.repeat(80) + '\n', 'magenta');
    
    log(`Backend: ${BACKEND_URL}`, 'blue');
    log(`Frontend: ${FRONTEND_URL}\n`, 'blue');
    
    const startTime = Date.now();
    
    // Run all tests concurrently (simulating real-world traffic)
    await Promise.all([
        testHealthEndpoint(200),
        testPromptsEndpoint(200),
        testOrdersEndpoint(200),
        testUploadsEndpoint(200),
        testPaymentsEndpoint(200),
        testAIEndpoint(200),
        testFrontendProxy(200),
    ]);
    
    const totalTime = Date.now() - startTime;
    
    // Calculate statistics
    const avgDuration = stats.durations.length > 0
        ? stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length
        : 0;
    const minDuration = stats.durations.length > 0 ? Math.min(...stats.durations) : 0;
    const maxDuration = stats.durations.length > 0 ? Math.max(...stats.durations) : 0;
    const successRate = stats.total > 0 ? (stats.success / stats.total * 100).toFixed(2) : 0;
    
    // Print Results
    log('\n' + '='.repeat(80), 'cyan');
    log('📊 STRESS TEST RESULTS', 'cyan');
    log('='.repeat(80) + '\n', 'cyan');
    
    log(`Total Requests: ${stats.total}`, 'blue');
    log(`✅ Successful: ${stats.success} (${successRate}%)`, stats.success > stats.total * 0.95 ? 'green' : 'yellow');
    log(`❌ Failed: ${stats.failed} (${(100 - parseFloat(successRate)).toFixed(2)}%)`, stats.failed < stats.total * 0.05 ? 'green' : 'red');
    log(`⏱️  Total Time: ${(totalTime / 1000).toFixed(2)}s`, 'blue');
    log(`⚡ Avg Response Time: ${avgDuration.toFixed(2)}ms`, 'blue');
    log(`🚀 Min Response Time: ${minDuration.toFixed(2)}ms`, 'green');
    log(`🐌 Max Response Time: ${maxDuration.toFixed(2)}ms`, maxDuration < 5000 ? 'green' : 'yellow');
    log(`📈 Requests/sec: ${(stats.total / (totalTime / 1000)).toFixed(2)}`, 'blue');
    
    log('\n📋 Status Code Distribution:', 'cyan');
    Object.entries(stats.statusCodes).sort((a, b) => b[1] - a[1]).forEach(([code, count]) => {
        const color = code.startsWith('2') ? 'green' : code.startsWith('4') ? 'yellow' : 'red';
        log(`  ${code}: ${count} (${((count / stats.total) * 100).toFixed(2)}%)`, color);
    });
    
    if (stats.errors.length > 0) {
        log(`\n⚠️  Errors (showing first 20):`, 'yellow');
        stats.errors.slice(0, 20).forEach((err, i) => {
            log(`  ${i + 1}. ${err.testName}: ${err.error || err.message || err.status}`, 'red');
        });
        if (stats.errors.length > 20) {
            log(`  ... and ${stats.errors.length - 20} more errors`, 'yellow');
        }
    }
    
    // Performance Analysis
    log('\n' + '='.repeat(80), 'cyan');
    log('🎯 PERFORMANCE ANALYSIS', 'cyan');
    log('='.repeat(80) + '\n', 'cyan');
    
    const performanceIssues = [];
    
    if (avgDuration > 2000) {
        performanceIssues.push('⚠️  Average response time > 2s (consider optimization)');
    }
    if (maxDuration > 10000) {
        performanceIssues.push('⚠️  Max response time > 10s (timeout risk)');
    }
    if (successRate < 95) {
        performanceIssues.push('⚠️  Success rate < 95% (reliability issues)');
    }
    if (stats.statusCodes['429']) {
        performanceIssues.push('⚠️  Rate limiting triggered (429 errors detected)');
    }
    if (stats.statusCodes['500'] || stats.statusCodes['502'] || stats.statusCodes['503']) {
        performanceIssues.push('⚠️  Server errors detected (5xx status codes)');
    }
    
    if (performanceIssues.length === 0) {
        log('✅ All performance metrics within acceptable ranges!', 'green');
    } else {
        performanceIssues.forEach(issue => log(issue, 'yellow'));
    }
    
    log('\n' + '='.repeat(80), 'magenta');
    if (successRate >= 95 && avgDuration < 2000) {
        log('🎉 STRESS TEST PASSED - System ready for production!', 'green');
    } else {
        log('⚠️  STRESS TEST COMPLETED - Review issues above', 'yellow');
    }
    log('='.repeat(80) + '\n', 'magenta');
    
    return successRate >= 95;
}

// Run stress test
runStressTest()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        log(`\n❌ Fatal error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });

