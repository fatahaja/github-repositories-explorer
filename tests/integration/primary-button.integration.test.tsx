import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '../../src/components/primary-button';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('PrimaryButton Component', () => {
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <PrimaryButton isLoading={false} onClick={handleClick}>
        Try Click Me
      </PrimaryButton>
    );

    fireEvent.click(screen.getByRole('button', { name: /try click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
