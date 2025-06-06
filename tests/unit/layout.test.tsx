import { render, screen } from '@testing-library/react'
import Layout from '../../src/components/layout'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom/vitest';

describe('Layout component', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child-element">Hello, Layout!</div>
      </Layout>
    )

    const childElement = screen.getByTestId('child-element')
    expect(childElement).toBeInTheDocument()
    expect(childElement).toHaveTextContent('Hello, Layout!')
  })

  it('has the correct wrapper div with class "p-4"', () => {
    const { container } = render(
      <Layout>
        <span>Test content</span>
      </Layout>
    )

    const div = container.firstChild
    expect(div).toHaveClass('p-4')
  })
})
