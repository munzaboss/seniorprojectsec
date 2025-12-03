// src/tests/passwordUtils.tests.js
import { sha1, checkPasswordLength, isTop10Password, gcd, blumBlumShub } from '../utils/passwordUtils';

test('check password length', () => {
  expect(checkPasswordLength('short')).toBe('Password must be at least 8 characters');
  expect(checkPasswordLength('mediumLen')).toBe('Meets minimum but 15+ recommended');
  expect(checkPasswordLength('thisIsAVeryLongPassword')).toBe('Password length meets recommendations');
});

test('top 10 password check', () => {
  expect(isTop10Password('123456')).toBe(true);
  expect(isTop10Password('uniquePassword123')).toBe(false);
});



test('gcd calculation', () => {
  expect(gcd(48n, 18n)).toBe(6n);
  expect(gcd(7n, 3n)).toBe(1n);
});

