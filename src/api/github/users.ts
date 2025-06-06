import { parseUsers } from '../../helpers/data-parser';

export const fetchUsers = async (keyword: string, per_page: number = 5) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(
        keyword
      )}&per_page=${per_page}`
    );

    if (!response.ok) {
      return { error: true, message: 'Failed to fetch users', data: [] };
    }
    const data = await response.json();
    return { error: false, data: parseUsers(data.items) };
  } catch (error) {
    console.info('Error fetching users:', error);
    return { error: true, message: (error as Error).message, data: [] };
  }
};
