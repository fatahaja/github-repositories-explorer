import { render, screen, cleanup } from "@testing-library/react";
import ListUser, { IUserData } from "../../src/components/list-user";
import * as AppContextModule from "../../src/context/app-context";
import { beforeEach, describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom/vitest';

const mockUseAppContext = vi.spyOn(AppContextModule, "useAppContext");

describe("ListUser Component", () => {
  beforeEach(() => {
    cleanup();
    mockUseAppContext.mockReset();
  });

  it("shows 'not found' message when keyword exists but users are empty", () => {
    mockUseAppContext.mockReturnValue({
      keyword: "testuser",
      repositoryData: undefined,
      setRepositoryData: vi.fn(),
      setUserData: vi.fn(),
      setKeyword: vi.fn()
    });

    render(<ListUser users={[]} />);
    expect(screen.getByText('Username "testuser" not found')).toBeInTheDocument();
  });

  it("shows 'Showing users for' message when keyword and users are present", () => {
    mockUseAppContext.mockReturnValue({
      keyword: "testuser",
      repositoryData: undefined,
      setRepositoryData: vi.fn(),
      setUserData: vi.fn(),
      setKeyword: vi.fn()
    });

    const users: IUserData[] = [{ username: "user1" }, { username: "user2" }];
    render(<ListUser users={users} />);

    expect(screen.getByText('Showing users for "testuser"')).toBeInTheDocument();
    users.forEach((user) => {
      expect(screen.getByText(user.username)).toBeInTheDocument();
    });
  });

  it("shows 'User repository not found' when repositoryData is empty", () => {
    mockUseAppContext.mockReturnValue({
      keyword: "testuser",
      repositoryData: [],
      setRepositoryData: vi.fn(),
      setUserData: vi.fn(),
      setKeyword: vi.fn()
    });

    const users: IUserData[] = [{ username: "user1" }];

    render(<ListUser users={users} />);

    expect(screen.getByText("User repository not found")).toBeInTheDocument();
  });
});
