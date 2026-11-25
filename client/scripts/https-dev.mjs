import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { networkInterfaces } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const clientDir = fileURLToPath(new URL('..', import.meta.url));
const sslDir = join(clientDir, '.ssl');
const cert = join(sslDir, 'dev-cert.pem');
const key = join(sslDir, 'dev-key.pem');

function lanAddress() {
  const addresses = Object.values(networkInterfaces())
    .flat()
    .filter((info) => info && info.family === 'IPv4' && !info.internal)
    .map((info) => info.address);
  return addresses.find((ip) => /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)) ?? addresses[0];
}

const ip = lanAddress();
if (!ip) {
  console.error('No LAN IPv4 address found; cannot create a certificate for your phone.');
  process.exit(1);
}

const extraArgs = process.argv.slice(2);
const portIndex = extraArgs.indexOf('--port');
const port = portIndex >= 0 ? extraArgs[portIndex + 1] : '4200';

mkdirSync(sslDir, { recursive: true });
execFileSync('openssl', [
  'req', '-x509', '-newkey', 'rsa:2048', '-nodes',
  '-keyout', key,
  '-out', cert,
  '-days', '365',
  '-subj', `/CN=${ip}`,
  '-addext', `subjectAltName=DNS:localhost,IP:127.0.0.1,IP:${ip}`,
], { stdio: 'ignore' });

console.log(`Serving the client over HTTPS at https://${ip}:${port}`);
console.log(`Certificate: ${cert}`);
console.log('On your phone, open that URL and trust/install the certificate so the camera is allowed.');

const ng = require.resolve('@angular/cli/bin/ng.js');
const child = spawn(process.execPath, [
  ng, 'serve', '--host', '0.0.0.0',
  '--ssl', '--ssl-cert', cert, '--ssl-key', key,
  ...extraArgs,
], { cwd: clientDir, stdio: 'inherit', shell: process.platform === 'win32' });

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('exit', (code) => process.exit(code ?? 0));
