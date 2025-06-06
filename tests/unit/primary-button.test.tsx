import { render, screen } from '@testing-library/react';
import PrimaryButton from '../../src/components/primary-button';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('PrimaryButton Component', () => {
  it('renders the button with text', () => {
    render(
      <PrimaryButton isLoading={false} onClick={() => { }}>
        Click Me
      </PrimaryButton>
    );

    expect(screen.getByRole('button', { name: /click me/i })).toHaveTextContent(
      'Click Me'
    );
  });

  it('disables the button when disabled prop is true', () => {
    render(
      <PrimaryButton isLoading={false} onClick={() => { }} disabled>
        Cannot Click Me
      </PrimaryButton>
    );

    expect(
      screen.getByRole('button', { name: /cannot click me/i })
    ).toBeDisabled();
  });
});
