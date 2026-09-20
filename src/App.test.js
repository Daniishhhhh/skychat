import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@aws-amplify/auth', () => ({
  getCurrentUser: jest.fn().mockRejectedValue(new Error('No authenticated user')),
  signOut: jest.fn(),
}));

test('renders authentication screen for signed-out users', async () => {
  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /skychat/i })).toBeInTheDocument();
});
