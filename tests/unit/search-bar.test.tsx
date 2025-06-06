import { render, screen, cleanup } from '@testing-library/react';
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

  it('renders input and button correctly', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
