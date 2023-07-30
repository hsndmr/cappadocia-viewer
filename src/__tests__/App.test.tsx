import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from '../renderer/App';

jest.mock('@orama/orama', () => ({
  create: jest.fn().mockResolvedValue(jest.fn()),
  insert: jest.fn().mockResolvedValue(jest.fn()),
}));

jest.mock('socket.io-client', () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
  })),
}));

describe('App', () => {
  it('should render', async () => {
    await waitFor(() => {
      expect(render(<App />)).toBeTruthy();
    });
  });
});
