#!/usr/bin/env node
/**
 * 🧪 Deployment Verification Script
 * Tests all critical endpoints to verify deployment is working
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
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

function logSection(title) {
    console.log('\n' + '='.repeat(60));
    log(title, 'cyan');
    console.log('='.repeat(60) + '\n');
}

async function testEndpoint(url, options = {}) {
    try {
        const startTime = Date.now();
        const response = await fetch(url, {
            ...options,
            signal: AbortSignal.timeout(10000), // 10s timeout
        });
        const duration = Date.now() - startTime;
        const data = await response.json().catch(() => ({}));
        
        return {
            success: response.ok,
            status: response.status,
            duration,
            data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}

async function runTests() {
    logSection('🚀 PIC.CHRISTMAS DEPLOYMENT VERIFICATION');
    
    logInfo(`Backend URL: ${BACKEND_URL}`);
    logInfo(`Frontend URL: ${FRONTEND_URL}\n`);

    // Test 1: Backend Health (Direct)
    logSection('TEST 1: Backend Health (Direct)');
    const healthDirect = await testEndpoint(`${BACKEND_URL}/health`);
    if (healthDirect.success) {
        logSuccess(`Backend health check: ${healthDirect.status} (${healthDirect.duration}ms)`);
        logInfo(`Uptime: ${healthDirect.data.uptime?.toFixed(2)}s`);
        logInfo(`Environment: ${healthDirect.data.environment}`);
    } else {
        logError(`Backend health check failed: ${healthDirect.error || healthDirect.status}`);
        return false;
    }

    // Test 2: Backend Root
    logSection('TEST 2: Backend Root');
    const rootDirect = await testEndpoint(`${BACKEND_URL}/`);
    if (rootDirect.success) {
        logSuccess(`Backend root: ${rootDirect.status} (${rootDirect.duration}ms)`);
    } else {
        logError(`Backend root failed: ${rootDirect.error || rootDirect.status}`);
    }

    // Test 3: Frontend Health (via Proxy)
    logSection('TEST 3: Frontend Health (via Proxy)');
    const healthProxy = await testEndpoint(`${FRONTEND_URL}/api/health`);
    if (healthProxy.success) {
        logSuccess(`Frontend proxy health: ${healthProxy.status} (${healthProxy.duration}ms)`);
    } else {
        logError(`Frontend proxy health failed: ${healthProxy.error || healthProxy.status}`);
        logInfo('This might be expected if frontend is not deployed yet');
    }

    // Test 4: Prompts Endpoint
    logSection('TEST 4: Prompts Endpoint');
    const prompts = await testEndpoint(`${BACKEND_URL}/api/prompts`);
    if (prompts.success) {
        logSuccess(`Prompts endpoint: ${prompts.status} (${prompts.duration}ms)`);
        const promptCount = prompts.data?.prompts?.length || prompts.data?.length || 0;
        logInfo(`Loaded ${promptCount} prompts`);
    } else {
        logError(`Prompts endpoint failed: ${prompts.error || prompts.status}`);
    }

    // Test 5: Orders Endpoint (POST - should fail without data, but endpoint should exist)
    logSection('TEST 5: Orders Endpoint');
    const orders = await testEndpoint(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    });
    // 400/422 is expected for empty body, but means endpoint exists
    if (orders.status === 400 || orders.status === 422 || orders.success) {
        logSuccess(`Orders endpoint exists: ${orders.status} (${orders.duration}ms)`);
        logInfo('(400/422 expected for empty request body)');
    } else {
        logError(`Orders endpoint failed: ${orders.error || orders.status}`);
    }

    // Test 6: Uploads Endpoint
    logSection('TEST 6: Uploads Endpoint');
    const uploads = await testEndpoint(`${BACKEND_URL}/api/uploads`, {
        method: 'POST',
    });
    // 400 is expected for empty body, but means endpoint exists
    if (uploads.status === 400 || uploads.success) {
        logSuccess(`Uploads endpoint exists: ${uploads.status} (${uploads.duration}ms)`);
        logInfo('(400 expected for empty request body)');
    } else {
        logError(`Uploads endpoint failed: ${uploads.error || uploads.status}`);
    }

    // Summary
    logSection('📊 SUMMARY');
    const tests = [
        { name: 'Backend Health', result: healthDirect.success },
        { name: 'Backend Root', result: rootDirect.success },
        { name: 'Frontend Proxy', result: healthProxy.success },
        { name: 'Prompts', result: prompts.success },
        { name: 'Orders', result: orders.status === 400 || orders.status === 422 || orders.success },
        { name: 'Uploads', result: uploads.status === 400 || uploads.success },
    ];

    const passed = tests.filter(t => t.result).length;
    const total = tests.length;

    tests.forEach(test => {
        if (test.result) {
            logSuccess(`${test.name}`);
        } else {
            logError(`${test.name}`);
        }
    });

    console.log('\n' + '='.repeat(60));
    log(`Tests Passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');
    console.log('='.repeat(60) + '\n');

    if (passed === total) {
        logSuccess('🎉 ALL TESTS PASSED! Deployment is working correctly.');
        return true;
    } else {
        logError('⚠️  Some tests failed. Check the errors above.');
        return false;
    }
}

// Run tests
runTests()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        logError(`Fatal error: ${error.message}`);
        console.error(error);
        process.exit(1);
    });
