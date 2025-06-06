import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ListUser, { IUserData } from "../../src/components/list-user";
import * as AppContextModule from "../../src/context/app-context";
import * as FetchUserReposModule from "../../src/api/github/repos"
import { beforeEach, describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom/vitest';

const mockUseAppContext = vi.spyOn(AppContextModule, "useAppContext");
const mockFetchUserRepos = vi.spyOn(FetchUserReposModule, "fetchUserRepos")

describe("ListUser Component", () => {
  beforeEach(() => {
    cleanup();
    mockUseAppContext.mockReset();
  });

  it("displays loading spinner and rotates arrow on click", () => {
    const repoData = undefined;

    mockUseAppContext.mockReturnValue({
      keyword: "testuser",
      repositoryData: repoData,
      setRepositoryData: vi.fn(),
      setUserData: vi.fn(),
      setKeyword: vi.fn()
    });

    const users: IUserData[] = [{ username: "user1" }];

    const { container } = render(<ListUser users={users} />);

    const arrow = container.querySelector("svg");
    const spinner = container.querySelector(".animate-spin");

    expect(spinner).toBeNull();

    mockUseAppContext.mockReturnValue({
      keyword: "testuser",
      repositoryData: repoData,
      setRepositoryData: vi.fn(),
      setUserData: vi.fn(),
      setKeyword: vi.fn()
    });

    fireEvent.click(screen.getByText("user1"));

    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(arrow).toBeInTheDocument();
  });

  it("renders SnackBar with error message when errorStatus.error is true", async () => {
    mockUseAppContext.mockReturnValue({
      keyword: "user",
      repositoryData: undefined,
      setRepositoryData: vi.fn(),
      setUserData: vi.fn(),
      setKeyword: vi.fn()
    });

    mockFetchUserRepos.mockResolvedValue({
      error: true, message: "Some error", data: []
    })

    const users: IUserData[] = [{ username: "userWithError" }];

    render(<ListUser users={users} />);

    const cardUser = screen.getByText("userWithError");
    fireEvent.click(cardUser)
    const errorMessage = await screen.findByText("Some error");

    expect(errorMessage).toBeInTheDocument();
  });
});
