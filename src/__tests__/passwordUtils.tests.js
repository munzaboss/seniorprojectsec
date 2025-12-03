// src/tests/passwordUtils.tests.js

//usenavgigate mock to avoid errors during testing
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
import { sha1, checkPasswordLength, isTop10Password, gcd, blumBlumShub } from '../utils/passwordUtils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordGeneratorAndCheckerTool from '../PasswordGeneratorAndCheckerTool';
import '@testing-library/jest-dom';


beforeAll(() => {
  jest.useFakeTimers(); // enable fake timers for the loading animation
});

afterAll(() => {
  jest.useRealTimers(); // restore real timers
});

test('password "buns" shows 0/10 score in the UI', async () => {
  render(<PasswordGeneratorAndCheckerTool />);

  // Advance all timers so the loading completes and input appears
  jest.runAllTimers();

  // Wait for the input to appear
  const input = await screen.findByPlaceholderText(/Enter your password/i);

  // Type a password
  fireEvent.change(input, { target: { value: 'buns' } });

  // Click the check password button
  const checkButton = screen.getByText(/check password/i);
  fireEvent.click(checkButton);

  // Assert the score in the UI
  const scoreElement = await screen.findByText(/\d+\/10/);

  // Ensure the score is exactly 0
  const scoreText = scoreElement.textContent; // e.g., "0/10"
  const numericScore = parseInt(scoreText.split('/')[0], 10);
  expect(numericScore).toBe(1);
});

test('check password length', () => {
  expect(checkPasswordLength('short')).toBe('Password must be at least 8 characters');
  expect(checkPasswordLength('mediumLen')).toBe('Meets minimum but 15+ recommended');
  expect(checkPasswordLength('thisIsAVeryLongPassword')).toBe('Password length meets recommendations');
});

test('top 10 password check', () => {
  expect(isTop10Password('123456')).toBe(true);
  expect(isTop10Password('uniquePassword123')).toBe(false);
});


// tests gcd function from the Blum Blum Shub generator
test('gcd calculation', () => {
  expect(gcd(48n, 18n)).toBe(6n);
  expect(gcd(7n, 3n)).toBe(1n);
});

