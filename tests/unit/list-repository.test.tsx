import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ListRepository, { IRepositoryData } from '../../src/components/list-repository'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom/vitest';

const repoData: IRepositoryData[] = [
  {
    id: 1,
    name: 'Repo One',
    desc: 'Description for repo one',
    star_count: 5,
    url: 'https://github.com/repoone',
  },
  {
    id: 2,
    name: 'Repo Two',
    desc: 'Description for repo two',
    star_count: 10,
    url: 'https://github.com/repotwo',
  },
]

vi.mock('../assets/icons/star-fill', () => () => <svg data-testid="star-icon" />)

describe('ListRepository component', () => {
  beforeEach(() => {
    window.open = vi.fn();
    vi.restoreAllMocks();
    cleanup();
  })

  it('renders repository data correctly', () => {
    render(<ListRepository repoData={repoData} />)

    repoData.forEach(repo => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
      expect(screen.getByText(repo.desc)).toBeInTheDocument()
      expect(screen.getByText(repo.star_count.toString())).toBeInTheDocument()
    })
  })

  it('calls window.open with correct URL when a repo is clicked', () => {
    render(<ListRepository repoData={repoData} />)

    const firstRepoElement = screen.getByText('Repo One').closest('div')!
    fireEvent.click(firstRepoElement)
    expect(window.open).toHaveBeenCalledWith('https://github.com/repoone', '_blank', 'noopener,noreferrer')

    const secondRepoElement = screen.getByText('Repo Two').closest('div')!
    fireEvent.click(secondRepoElement)
    expect(window.open).toHaveBeenCalledWith('https://github.com/repotwo', '_blank', 'noopener,noreferrer')
  })

  it('renders nothing when no repoData or empty array is passed', () => {
    const { container } = render(<ListRepository repoData={[]} />)
    expect(container).toBeEmptyDOMElement()

    const { container: noDataContainer } = render(<ListRepository />)
    expect(noDataContainer).toBeEmptyDOMElement()
  })
})
