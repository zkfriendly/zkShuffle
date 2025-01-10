import { webcrypto } from 'node:crypto';

declare global {
  interface Window {
    crypto: typeof webcrypto;
  }
  var crypto: typeof webcrypto;
}

// Override the global crypto object with Node's webcrypto implementation
if (typeof global.crypto === 'undefined') {
  global.crypto = webcrypto;
}

// Patch getRandomValues to handle large buffers
const originalGetRandomValues = global.crypto.getRandomValues.bind(global.crypto);
global.crypto.getRandomValues = function<T extends Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | BigUint64Array | BigInt64Array>(buffer: T): T {
  if (buffer.byteLength > 65536) {
    const chunks = Math.ceil(buffer.byteLength / 65536);
    for (let i = 0; i < chunks; i++) {
      const start = i * 65536;
      const end = Math.min(start + 65536, buffer.byteLength);
      const chunk = buffer.slice(start, end) as T;
      originalGetRandomValues(chunk);
    }
    return buffer;
  }
  return originalGetRandomValues(buffer);
};