const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../../data');
const dest = path.join(__dirname, '../data');

console.log(`📋 Copying data from ${src} to ${dest}...`);

try {
    if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log('✅ Data copied successfully!');
} catch (err) {
    console.error('❌ Error copying data:', err);
    process.exit(1);
}
