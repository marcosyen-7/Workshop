
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

function binaryPath() {
  const name = 'nodejs-devops-workshop';
  const platform = process.platform;
  const filename = platform === 'win32' ? `${name}.exe` : name;
  return path.join('.', filename);
}

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const bin = binaryPath();
  console.log('Launching packaged binary:', bin);
  const child = spawn(bin, [], { stdio: 'inherit' });
  await wait(1200);
  const req = http.get('http://127.0.0.1:3000/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.message === 'Hello DevOps Workshop!') {
          console.log('✅ Installation verification passed');
          child.kill();
          process.exit(0);
        } else {
          console.error('❌ Unexpected response:', json);
          child.kill();
          process.exit(1);
        }
      } catch (e) {
        console.error('❌ Failed to parse response:', e);
        child.kill();
        process.exit(1);
      }
    });
  });
  req.on('error', (err) => {
    console.error('❌ HTTP request failed:', err);
    child.kill();
    process.exit(1);
  });
}

run();
