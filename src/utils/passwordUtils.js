// src/utils/passwordUtils.js
//DONT EDIT THIS FILE
//copy pasted core functionality to test on to avoid using react navigator which has a lotta bugs
export const TOP_10_COMMON_PASSWORDS = [
  '123456',
  '123456789',
  '12345678',
  'password',
  'qwerty123',
  'qwerty1',
  '111111',
  '12345',
  'secret',
  '123123'
];

export const sha1 = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
};

export const checkPasswordLength = (pwd) => {
  if (pwd.length < 8) return 'Password must be at least 8 characters';
  if (pwd.length < 15) return 'Meets minimum but 15+ recommended';
  return 'Password length meets recommendations';
};

export const isTop10Password = (pwd) => {
  return TOP_10_COMMON_PASSWORDS.includes(pwd.toLowerCase());
};

// Blum Blum Shub generator
export const gcd = (a, b) => {
  a = BigInt(a);
  b = BigInt(b);
  if (b === 0n) return a < 0n ? -a : a;
  return gcd(b, a % b);
};

export const blumBlumShub = (p, q, bitLength) => {
  const n = p * q;
  let seed = 0n;
  let GCD = 0n;

  while (GCD !== 1n) {
    const randomArray = new Uint32Array(8);
    crypto.getRandomValues(randomArray);

    seed = 0n;
    for (let i = 0; i < randomArray.length; i++) {
      seed = (seed << 32n) | BigInt(randomArray[i]);
    }
    seed = seed % (n - 1n) + 1n;
    GCD = gcd(seed, n);
  }

  let x = seed;
  let bits = '';

  for (let i = 0; i < bitLength; i++) {
    x = (x * x) % n;
    bits += (x & 1n).toString();
  }

  return bits;
};
