import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SnackBar from '../../src/components/snack-bar';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('SnackBar Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    cleanup();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('closes on Close button click', () => {
    const { container } = render(<SnackBar message="Auto close test" />);
    const outerDiv = container.firstChild as HTMLElement;
    const closeButton = screen.getByText('Close');

    fireEvent.click(closeButton);

    expect(outerDiv).toHaveClass('hidden');
  });
});
