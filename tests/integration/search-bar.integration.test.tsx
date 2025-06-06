import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import SearchBar from '../../src/components/search-bar';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as AppContextModule from '../../src/context/app-context';
import '@testing-library/jest-dom/vitest';

const mockUseAppContext = vi.spyOn(AppContextModule, "useAppContext");

describe('SearchBar Component', () => {
  beforeEach(() => {
    cleanup();
    mockUseAppContext.mockReset();
  });

  it('updates input value on change', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(input).toHaveValue('testuser');
  });

  it('enables the button when input value differs from context keyword', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: 'newuser' } });
    const button = screen.getByRole('button', { name: /search/i });

    expect(button).toBeEnabled();
  });

  it('displays error message and changes input style when there is an error and input is empty', async () => {
    mockUseAppContext.mockImplementation(() => {
      return {
        keyword: 'existing keyword',
        setKeyword: vi.fn(),
        setRepositoryData: vi.fn(),
        setUserData: vi.fn()
      }
    })

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.click(button);
    const errorMessage = await screen.findByText(/username cannot be empty/i);

    expect(errorMessage).toBeInTheDocument();
    expect(input).toHaveClass('bg-red-100');
    expect(input).toHaveClass('border-red-500');
  });

  it('displays loading state on button when searching', async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: 'user' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    await waitFor(() => expect(button).not.toBeDisabled(), { timeout: 3000 });
  });
});
