import { parseRepos } from '../../helpers/data-parser';

export const fetchUserRepos = async (
  username: string,
  per_page: number = 30
) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(
        username
      )}/repos?per_page=${per_page}`
    );

    if (!response.ok) {
      return {
        error: true,
        message: 'Failed to fetch user repositories',
        data: [],
      };
    }
    const data = await response.json();
    return { error: false, data: parseRepos(data) };
  } catch (error) {
    console.info('Error fetching repositories:', error);
    return { error: true, message: (error as Error).message, data: [] };
  }
};
