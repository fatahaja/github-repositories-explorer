import { render, screen, act, cleanup } from '@testing-library/react';
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

  it('renders the message correctly', () => {
    render(<SnackBar message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('auto closes after default 3000ms', () => {
    const { container } = render(<SnackBar message="Auto close test" />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toBeVisible();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(outerDiv).toHaveClass('hidden');
  });

  it('auto closes after custom autoCloseMs', () => {
    const { container } = render(<SnackBar message="Auto close test" autoCloseMs={1000} />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toBeVisible();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(outerDiv).toHaveClass('hidden');
  });

  it('applies additional className prop', () => {
    const { container } = render(<SnackBar message="Auto close test" className='my-custom-class' />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toHaveClass('my-custom-class');
  });
});
