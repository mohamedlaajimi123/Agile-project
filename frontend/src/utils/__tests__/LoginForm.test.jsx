import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '../LoginForm';
import { BrowserRouter } from 'react-router-dom';

// Mocking dependencies so the test runs in isolation
vi.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({ login: vi.fn() })
}));

describe('LoginForm Unit Tests', () => {
  it('should render email and password inputs', () => {
    render(<BrowserRouter><LoginForm /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/email/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/password/i)).toBeDefined();
  });

  it('should show "Signing in..." when submitted', async () => {
    render(<BrowserRouter><LoginForm /></BrowserRouter>);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/signing in.../i)).toBeDefined();
  });
});